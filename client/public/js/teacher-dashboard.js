// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Function to check authentication
async function checkAuth() {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) {
            window.location.href = '/login.html';
            return null;
        }
        const user = await response.json();
        if (!user || user.role !== 'teacher') {
            window.location.href = '/dashboard.html';
            return null;
        }
        return user;
    } catch (error) {
        console.error('Auth error:', error);
        window.location.href = '/login.html';
        return null;
    }
}

// Add periodic refresh of student list
let refreshInterval;

// Update initializeDashboard to include refresh mechanism
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info with correct formatting
    const userElement = document.getElementById('userName');
    userElement.textContent = `${user.username} (${user.department})`;

    await refreshDashboard();

    // Set up periodic refresh every 30 seconds
    refreshInterval = setInterval(refreshDashboard, 30000);
    
    // Set up student search functionality
    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterStudents(e.target.value);
        });
    }

    // Load discussion slots
    await loadDiscussionSlots();
}

// Store all students for filtering
let allStudents = [];

// Function to filter and display students
function filterStudents(searchText) {
    const studentsList = document.getElementById('studentsList');
    const filteredStudents = allStudents.filter(student => {
        const searchLower = searchText.toLowerCase();
        const usernameLower = student.username.toLowerCase();
        const departmentLower = student.department.toLowerCase();
        return usernameLower.includes(searchLower) ||
               departmentLower.includes(searchLower);
    });

    if (filteredStudents.length === 0) {
        studentsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No students found matching "${searchText}"</p>
                <p class="subtitle">Try a different search term</p>
            </div>`;
        return;
    }

    studentsList.innerHTML = filteredStudents.map(student => `
        <div class="student-card">
            <div class="student-info">
                <h3>
                    <i class="fas fa-user-graduate"></i>
                    ${student.username}
                </h3>
                <div class="student-details">
                    <p>
                        <i class="fas fa-clock"></i>
                        Registered: ${formatDate(student.createdAt)}
                    </p>
                    <div class="progress-section">
                        <h4>Test Progress</h4>
                        <div class="progress-stats">
                            <div class="stat">
                                <span class="label">Tests Completed</span>
                                <span class="value">${student.testsCompleted || 0}</span>
                            </div>
                            <div class="stat">
                                <span class="label">Average Score</span>
                                <span class="value">${student.averageScore || 0}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Separate refresh function for reusability
async function refreshDashboard() {
    try {
        // Fetch and display student progress
        const studentsResponse = await fetch('/api/teacher/students');
        if (!studentsResponse.ok) {
            throw new Error('Failed to fetch students');
        }
        const students = await studentsResponse.json();
        allStudents = students; // Store for filtering

        const studentsList = document.getElementById('studentsList');
        if (students.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No students found in your batch</p>
                    <p class="subtitle">Students will appear here once they register</p>
                </div>`;
        } else {
            // Use the same rendering logic as filterStudents
            filterStudents(''); // Show all students initially
        }

        // Update statistics
        const statsResponse = await fetch('/api/teacher/stats');
        if (!statsResponse.ok) {
            throw new Error('Failed to fetch stats');
        }
        const stats = await statsResponse.json();

        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('activeSessions').textContent = stats.activeSessions || 0;
        document.getElementById('discussionSlots').textContent = stats.discussionSlots || 0;

    } catch (error) {
        console.error('Error refreshing dashboard:', error);
        showToast('Error', 'Failed to refresh dashboard data');
    }
}

// Load discussion slots
async function loadDiscussionSlots(filter = 'all') {
    try {
        const slots = await fetch('/api/discussion-slots').then(res => {
            if (!res.ok) throw new Error('Failed to fetch discussion slots');
            return res.json();
        });

        const now = new Date();
        const filteredSlots = slots.filter(slot => {
            const slotDate = new Date(slot.startTime);
            switch (filter) {
                case 'upcoming':
                    return slotDate > now;
                case 'past':
                    return slotDate < now;
                default:
                    return true;
            }
        });

        const discussionManagement = document.getElementById('discussionManagement');

        // Render header section with filters
        const headerHtml = `
            <div class="discussion-filters">
                <button class="btn-filter ${filter === 'all' ? 'active' : ''}" data-filter="all">
                    <i class="fas fa-list"></i> All Slots
                </button>
                <button class="btn-filter ${filter === 'upcoming' ? 'active' : ''}" data-filter="upcoming">
                    <i class="fas fa-calendar-alt"></i> Upcoming
                </button>
                <button class="btn-filter ${filter === 'past' ? 'active' : ''}" data-filter="past">
                    <i class="fas fa-history"></i> Past
                </button>
            </div>`;

        if (filteredSlots.length === 0) {
            discussionManagement.innerHTML = `
                ${headerHtml}
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No discussion slots found</p>
                    <p class="subtitle">Create a new slot using the button above</p>
                </div>`;
        } else {
            discussionManagement.innerHTML = `
                ${headerHtml}
                <div class="discussion-grid">
                    ${filteredSlots.map(slot => {
                        const isPast = new Date(slot.startTime) < now;
                        const statusClass = isPast ? 'past' : 'upcoming';
                        const statusText = isPast ? 'Completed' : 'Upcoming';
                        const participantCount = slot.bookedCount || 0;
                        const participantStatus = participantCount >= slot.maxParticipants ? 'full' : 'available';

                        return `
                            <div class="discussion-card ${statusClass}">
                                <div class="discussion-info">
                                    <h3>
                                        <i class="fas fa-comments"></i>
                                        ${slot.topic || 'Open Discussion'}
                                        <span class="status ${statusClass}">${statusText}</span>
                                    </h3>
                                    <div class="slot-details">
                                        <p>
                                            <i class="far fa-clock"></i>
                                            ${formatDate(slot.startTime)} - ${new Date(slot.endTime).toLocaleTimeString()}
                                        </p>
                                        <p>
                                            <i class="fas fa-users"></i>
                                            Participants: <span class="participant-count ${participantStatus}">${participantCount}/${slot.maxParticipants}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="slot-actions">
                                    ${isPast ? `
                                        <button class="btn-secondary" onclick="viewParticipants(${slot.id})">
                                            <i class="fas fa-users"></i> View Participants
                                        </button>
                                    ` : `
                                        <button class="btn-secondary" onclick="editSlot(${slot.id})">
                                            <i class="fas fa-edit"></i> Edit
                                        </button>
                                        <button class="btn-danger" onclick="cancelSlot(${slot.id})">
                                            <i class="fas fa-times"></i> Cancel
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>`;

            // Add event listeners for filters
            document.querySelectorAll('.btn-filter').forEach(button => {
                button.addEventListener('click', () => {
                    loadDiscussionSlots(button.dataset.filter);
                });
            });
        }
    } catch (error) {
        console.error('Error loading discussion slots:', error);
        document.getElementById('discussionManagement').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load discussion slots</p>
                <button class="btn-secondary" onclick="loadDiscussionSlots()">
                    <i class="fas fa-sync"></i> Try Again
                </button>
            </div>`;
    }
}

// View student's detailed progress
async function viewProgress(studentId) {
    // TODO: Implement detailed progress view
    showToast('Info', 'Detailed progress view will be implemented soon');
}

// Clean up interval when leaving the page
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});

// Show toast notification
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${title.toLowerCase()}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${title === 'Success' ? 'check-circle' : title === 'Error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <strong>${title}</strong>
        </div>
        <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal functions
function openModal() {
    document.getElementById('createSlotModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('createSlotModal').classList.add('hidden');
    document.getElementById('createSlotForm').reset();
    document.getElementById('createSlotForm').dataset.mode = ''; //reset mode after closing
    document.getElementById('modalTitle').textContent = 'Create Discussion Slot';
    document.getElementById('submitBtn').textContent = 'Create Slot';
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = `${tab.dataset.tab}Tab`;
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('hidden', content.id !== targetId);
        });
    });
});


// Function to edit discussion slot
async function editSlot(slotId) {
    try {
        const response = await fetch(`/api/discussion-slots/${slotId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch slot details');
        }
        const slot = await response.json();

        // Show edit modal with current values
        const form = document.getElementById('createSlotForm');
        form.slotTopic.value = slot.topic;
        form.slotDateTime.value = new Date(slot.startTime).toISOString().slice(0, 16);
        form.maxParticipants.value = slot.maxParticipants;
        form.slotDuration.value = (new Date(slot.endTime) - new Date(slot.startTime)) / 60000; // Calculate duration in minutes


        // Update form for edit mode
        form.dataset.mode = 'edit';
        form.dataset.slotId = slotId;
        document.getElementById('modalTitle').textContent = 'Edit Discussion Slot';
        document.getElementById('submitBtn').textContent = 'Update Slot';

        openModal();
    } catch (error) {
        console.error('Error editing slot:', error);
        showToast('Error', 'Failed to load slot details');
    }
}

// Function to cancel discussion slot
async function cancelSlot(slotId) {
    if (!confirm('Are you sure you want to cancel this discussion slot?')) {
        return;
    }

    try {
        const response = await fetch(`/api/discussion-slots/${slotId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to cancel slot');
        }

        showToast('Success', 'Discussion slot cancelled successfully');
        loadDiscussionSlots(); // Refresh the list
    } catch (error) {
        console.error('Error cancelling slot:', error);
        showToast('Error', 'Failed to cancel discussion slot');
    }
}

// Update createSlot function to handle both create and edit
async function createSlot(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const isEdit = form.dataset.mode === 'edit';

    try {
        submitButton.disabled = true;
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEdit ? 'Updating...' : 'Creating...'}`;

        const startTime = new Date(form.slotDateTime.value);
        const endTime = new Date(startTime.getTime() + parseInt(form.slotDuration.value) * 60000);

        const slotData = {
            topic: form.slotTopic.value || 'Open Discussion',
            startTime,
            endTime,
            maxParticipants: parseInt(form.maxParticipants.value),
            mentorName: form.mentorName.value,
            mentorEmail: form.mentorEmail.value,
            status: 'pending' // Initial status is pending until mentor responds
        };

        const url = isEdit ? `/api/discussion-slots/${form.dataset.slotId}` : '/api/discussion-slots';
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slotData)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const slot = await response.json();
        
        // Always show success for the slot creation first
        closeModal();
        loadDiscussionSlots();
        showToast('Success', `Discussion slot ${isEdit ? 'updated' : 'created'} successfully!`);
        
        // Then try to send the email notification as a background task
        try {
            const emailResponse = await fetch('/api/send-mentor-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotId: slot.id,
                    mentorName: slotData.mentorName,
                    mentorEmail: slotData.mentorEmail,
                    topic: slotData.topic,
                    startTime: slotData.startTime,
                    endTime: slotData.endTime
                })
            });

            if (emailResponse.ok) {
                const emailResult = await emailResponse.text();
                console.log('Email response:', emailResult);
                // Optionally show a secondary success message about email
                // showToast('Success', `Mentor notification email sent successfully.`);
            } else {
                console.warn('Failed to send mentor request email, but slot was created');
                // Don't show error toast since the slot was created successfully
                // Just log the warning to console
            }
        } catch (emailError) {
            console.warn('Error sending mentor email, but slot was created:', emailError);
            // Don't show error toast since the slot was created successfully
            // Just log the warning to console
        }

        // Rest of the createSlot logic continues below in the catch/finally blocks
    } catch (error) {
        console.error('Slot operation error:', error);
        // If we reach this catch block, the slot creation/update must have failed
        // We shouldn't reload the discussion slots here since nothing was created/updated
        showToast('Error', `Failed to ${isEdit ? 'update' : 'create'} discussion slot: ${error.message}`);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = isEdit ? 'Update Slot' : 'Create Slot';
    }
}

//Function to view participants (added based on context)
async function viewParticipants(slotId){
    //Implement view participants functionality here. This would likely involve fetching the list of participants for the slot.
    showToast('Info', `Viewing participants for slot ${slotId} will be implemented soon.`)
}

// Function to format date nicely
function formatTestDate(dateString) {
    return new Date(dateString).toLocaleString();
}

// Updated loadStudentTestHistory function
async function loadStudentTestHistory(studentId) {
    try {
        const response = await fetch(`/api/teacher/student/${studentId}/test-history`);
        if (!response.ok) {
            throw new Error('Failed to fetch test history');
        }
        const history = await response.json();

        const historyContainer = document.getElementById('studentTestHistory');
        if (history.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>No test history available</p>
                    <p class="subtitle">Student hasn't completed any tests yet</p>
                </div>`;
            return;
        }

        historyContainer.innerHTML = history.map(test => {
            // Set icon based on test type
            let typeIcon;
            let typeLabel;

            if (test.testId && /^[LNQ]\d+/.test(test.testId)) {
                typeIcon = 'fa-brain';
                typeLabel = 'Aptitude';
            } else if (test.type === 'mbti') {
                typeIcon = 'fa-user';
                typeLabel = 'MBTI';
            } else {
                typeIcon = 'fa-pencil';
                typeLabel = 'Practice';
            }

            return `
                <div class="test-history-item">
                    <div class="test-info">
                        <h4>
                            <i class="fas ${typeIcon}"></i>
                            ${test.testName}
                        </h4>
                        <span class="test-type">${typeLabel}</span>
                    </div>
                    <div class="test-details">
                        <div class="detail">
                            <i class="fas fa-chart-line"></i>
                            <span>Score: ${test.score >= 0 ? `${test.score}%` : 'N/A'}</span>
                        </div>
                        <div class="detail">
                            <i class="far fa-calendar-alt"></i>
                            <span>Date: ${formatTestDate(test.date)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading test history:', error);
        showToast('Error', 'Failed to load student test history');
    }
}

// Setup student history section
async function setupStudentHistory() {
    try {
        const response = await fetch('/api/teacher/students');
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        const students = await response.json();

        const studentSelect = document.getElementById('studentSelect');
        if (!students.length) {
            studentSelect.innerHTML = '<option value="">No students found</option>';
            return;
        }

        studentSelect.innerHTML = `
            <option value="">Select a student...</option>
            ${students.map(student => `
                <option value="${student.id}">${student.username}</option>
            `).join('')}
        `;

        studentSelect.addEventListener('change', (e) => {
            const studentId = e.target.value;
            if (studentId) {
                loadStudentTestHistory(studentId);
            } else {
                document.getElementById('studentTestHistory').innerHTML = '';
            }
        });
    } catch (error) {
        console.error('Error setting up student history:', error);
        showToast('Error', 'Failed to load students');
    }
}

// Initialize the dashboard
// Mentor request functions
async function loadMentorRequests() {
    try {
        const response = await fetch('/api/mentor-responses/pending');
        if (!response.ok) {
            throw new Error('Failed to fetch mentor requests');
        }
        const pendingRequests = await response.json();
        
        const requestsList = document.getElementById('pendingRequestsList');
        const badge = document.getElementById('mentorRequestBadge');
        
        if (pendingRequests.length === 0) {
            requestsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>No pending mentor requests</p>
                </div>`;
            badge.classList.add('hidden');
        } else {
            // Show badge with count
            badge.textContent = pendingRequests.length;
            badge.classList.remove('hidden');
            
            // Create request cards
            requestsList.innerHTML = pendingRequests.map(item => {
                const { slot, response } = item;
                const slotDate = new Date(slot.startTime);
                const now = new Date();
                const isPast = slotDate < now;
                
                return `
                    <div class="request-card ${isPast ? 'past' : ''}">
                        <div class="request-info">
                            <h3>
                                <i class="fas fa-comments"></i> 
                                ${slot.topic || 'Open Discussion'}
                            </h3>
                            <div class="request-details">
                                <p>
                                    <i class="far fa-clock"></i> 
                                    ${formatDate(slot.startTime)} - ${new Date(slot.endTime).toLocaleTimeString()}
                                </p>
                                <p>
                                    <i class="fas fa-users"></i> 
                                    Maximum Participants: ${slot.maxParticipants}
                                </p>
                                <p>
                                    <i class="fas fa-user-plus"></i> 
                                    Created by: ${slot.createdBy === response.mentorId ? 'You' : 'Another teacher'}
                                </p>
                                <div class="request-status pending">
                                    <i class="fas fa-hourglass-half"></i> 
                                    Awaiting your response
                                </div>
                            </div>
                        </div>
                        ${!isPast ? `
                            <div class="request-actions">
                                <button class="btn-primary" onclick="respondToMentorRequest(${slot.id})">
                                    <i class="fas fa-reply"></i> Respond
                                </button>
                            </div>
                        ` : `
                            <div class="request-actions">
                                <span class="badge expired">Expired</span>
                            </div>
                        `}
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading mentor requests:', error);
        document.getElementById('pendingRequestsList').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load mentor requests</p>
                <button class="btn-secondary" onclick="loadMentorRequests()">
                    <i class="fas fa-sync"></i> Try Again
                </button>
            </div>`;
    }
}

async function respondToMentorRequest(slotId) {
    try {
        // Fetch slot details
        const response = await fetch(`/api/discussion-slots/${slotId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch slot details');
        }
        const slot = await response.json();
        
        // Populate slot details in modal
        const slotDetailsContainer = document.getElementById('slotDetailsContainer');
        slotDetailsContainer.innerHTML = `
            <div class="detail-item">
                <span class="label">Topic:</span>
                <span class="value">${slot.topic || 'Open Discussion'}</span>
            </div>
            <div class="detail-item">
                <span class="label">Date:</span>
                <span class="value">${new Date(slot.startTime).toLocaleDateString()}</span>
            </div>
            <div class="detail-item">
                <span class="label">Time:</span>
                <span class="value">${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}</span>
            </div>
            <div class="detail-item">
                <span class="label">Max Participants:</span>
                <span class="value">${slot.maxParticipants}</span>
            </div>
        `;
        
        // Set slot ID in hidden field
        document.getElementById('responseSlotId').value = slotId;
        
        // Reset form
        document.getElementById('responseStatus').value = 'accepted';
        document.getElementById('declineReason').value = '';
        document.getElementById('alternativeMentor').value = '';
        document.getElementById('declineReasonContainer').classList.add('hidden');
        document.getElementById('alternativeMentorContainer').classList.add('hidden');
        
        // Reset response buttons
        document.querySelectorAll('.response-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.response-btn[data-response="accepted"]').classList.add('active');
        
        // Show modal
        document.getElementById('mentorResponseModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error preparing mentor response:', error);
        showToast('Error', 'Failed to load slot details');
    }
}

function closeMentorResponseModal() {
    document.getElementById('mentorResponseModal').classList.add('hidden');
}

async function submitMentorResponse(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        const slotId = document.getElementById('responseSlotId').value;
        const status = document.getElementById('responseStatus').value;
        const reason = status === 'declined' ? document.getElementById('declineReason').value : null;
        
        // Submit response
        const response = await fetch(`/api/mentor-responses/${slotId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status,
                reason,
                alternativeMentorId: null // Future: Could implement teacher selection
            })
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        closeMentorResponseModal();
        showToast('Success', `You have ${status} the mentor request`);
        loadMentorRequests(); // Refresh list
        loadNotifications(); // Refresh notifications too
    } catch (error) {
        console.error('Error submitting mentor response:', error);
        showToast('Error', 'Failed to submit your response');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Response';
    }
}

// Mentor availability functions
async function loadMentorAvailability() {
    try {
        const response = await fetch('/api/mentor-availability');
        if (!response.ok) {
            throw new Error('Failed to fetch availability');
        }
        const availabilitySlots = await response.json();
        
        // Separate recurring and one-time availability
        const recurringSlots = availabilitySlots.filter(slot => slot.recurring);
        const onetimeSlots = availabilitySlots.filter(slot => !slot.recurring);
        
        // Update recurring availability list
        const recurringList = document.getElementById('recurringAvailability');
        if (recurringSlots.length === 0) {
            recurringList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-day"></i>
                    <p>No recurring availability set</p>
                </div>`;
        } else {
            recurringList.innerHTML = recurringSlots.map(slot => {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return `
                    <div class="availability-item">
                        <div class="availability-details">
                            <div class="day-badge">${days[slot.dayOfWeek].substring(0, 3)}</div>
                            <div class="time-range">
                                <i class="far fa-clock"></i>
                                ${slot.startTime} - ${slot.endTime}
                            </div>
                        </div>
                        <button class="btn-icon delete-btn" onclick="deleteAvailability(${slot.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');
        }
        
        // Update one-time availability list
        const onetimeList = document.getElementById('onetimeAvailability');
        if (onetimeSlots.length === 0) {
            onetimeList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-day"></i>
                    <p>No one-time slots set</p>
                </div>`;
        } else {
            onetimeList.innerHTML = onetimeSlots.map(slot => {
                const date = new Date(slot.specificDate);
                const isPast = date < new Date();
                return `
                    <div class="availability-item ${isPast ? 'past' : ''}">
                        <div class="availability-details">
                            <div class="date-badge">
                                <div class="month">${date.toLocaleString('default', { month: 'short' })}</div>
                                <div class="day">${date.getDate()}</div>
                            </div>
                            <div class="time-range">
                                <i class="far fa-clock"></i>
                                ${slot.startTime} - ${slot.endTime}
                            </div>
                            ${isPast ? '<span class="badge past">Past</span>' : ''}
                        </div>
                        ${!isPast ? `
                            <button class="btn-icon delete-btn" onclick="deleteAvailability(${slot.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading availability:', error);
        document.getElementById('recurringAvailability').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load availability</p>
                <button class="btn-secondary" onclick="loadMentorAvailability()">
                    <i class="fas fa-sync"></i> Try Again
                </button>
            </div>`;
        document.getElementById('onetimeAvailability').innerHTML = '';
    }
}

function openAvailabilityModal() {
    document.getElementById('createAvailabilityModal').classList.remove('hidden');
    // Default to recurring
    document.querySelector('input[name="scheduleType"][value="recurring"]').checked = true;
    toggleScheduleType('recurring');
}

function closeAvailabilityModal() {
    document.getElementById('createAvailabilityModal').classList.add('hidden');
    document.getElementById('createAvailabilityForm').reset();
}

function toggleScheduleType(type) {
    const recurringContainer = document.getElementById('recurringScheduleContainer');
    const onetimeContainer = document.getElementById('onetimeScheduleContainer');
    
    if (type === 'recurring') {
        recurringContainer.classList.remove('hidden');
        onetimeContainer.classList.add('hidden');
    } else {
        recurringContainer.classList.add('hidden');
        onetimeContainer.classList.remove('hidden');
    }
}

async function createAvailability(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        const scheduleType = form.querySelector('input[name="scheduleType"]:checked').value;
        let availabilityData;
        
        if (scheduleType === 'recurring') {
            availabilityData = {
                dayOfWeek: parseInt(form.dayOfWeek.value),
                startTime: form.startTime.value,
                endTime: form.endTime.value,
                recurring: true,
                specificDate: null
            };
        } else {
            const specificDate = new Date(form.specificDate.value);
            availabilityData = {
                dayOfWeek: specificDate.getDay(),
                startTime: form.onetimeStartTime.value,
                endTime: form.onetimeEndTime.value,
                recurring: false,
                specificDate: specificDate.toISOString()
            };
        }
        
        const response = await fetch('/api/mentor-availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(availabilityData)
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        closeAvailabilityModal();
        showToast('Success', 'Availability saved successfully');
        loadMentorAvailability();
    } catch (error) {
        console.error('Error saving availability:', error);
        showToast('Error', 'Failed to save availability');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-save"></i> Save Availability';
    }
}

async function deleteAvailability(id) {
    if (!confirm('Are you sure you want to delete this availability?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/mentor-availability/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete availability');
        }
        
        showToast('Success', 'Availability deleted successfully');
        loadMentorAvailability();
    } catch (error) {
        console.error('Error deleting availability:', error);
        showToast('Error', 'Failed to delete availability');
    }
}

// Notifications functions
async function loadNotifications() {
    try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        const notifications = await response.json();
        
        const notificationsList = document.getElementById('notificationsList');
        const badge = document.getElementById('notificationBadge');
        
        // Count unread notifications
        const unreadCount = notifications.filter(n => !n.isRead).length;
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
        
        if (notifications.length === 0) {
            notificationsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell-slash"></i>
                    <p>No notifications at this time</p>
                </div>`;
        } else {
            notificationsList.innerHTML = notifications.map(notification => {
                const date = new Date(notification.date);
                let iconClass = 'fas fa-bell';
                
                // Choose icon based on notification type
                switch (notification.type) {
                    case 'booking':
                        iconClass = 'fas fa-user-plus';
                        break;
                    case 'cancellation':
                        iconClass = 'fas fa-calendar-times';
                        break;
                    case 'update':
                        iconClass = 'fas fa-sync';
                        break;
                    case 'mentor_assignment':
                        iconClass = 'fas fa-user-tie';
                        break;
                    case 'mentor_response':
                        iconClass = 'fas fa-reply';
                        break;
                    case 'substitution':
                        iconClass = 'fas fa-exchange-alt';
                        break;
                }
                
                return `
                    <div class="notification-item ${notification.isRead ? 'read' : 'unread'}">
                        <div class="notification-icon">
                            <i class="${iconClass}"></i>
                        </div>
                        <div class="notification-content">
                            <p>${notification.message}</p>
                            <div class="notification-meta">
                                <span class="notification-time">${formatDate(notification.date)}</span>
                                ${!notification.isRead ? `
                                    <button class="btn-link mark-read" onclick="markNotificationAsRead(${notification.id})">
                                        Mark as read
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading notifications:', error);
        document.getElementById('notificationsList').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load notifications</p>
                <button class="btn-secondary" onclick="loadNotifications()">
                    <i class="fas fa-sync"></i> Try Again
                </button>
            </div>`;
    }
}

async function markNotificationAsRead(id) {
    try {
        const response = await fetch(`/api/notifications/${id}/read`, {
            method: 'PUT'
        });
        
        if (!response.ok) {
            throw new Error('Failed to mark notification as read');
        }
        
        // Re-load notifications
        loadNotifications();
    } catch (error) {
        console.error('Error marking notification as read:', error);
        showToast('Error', 'Failed to update notification');
    }
}

async function clearAllReadNotifications() {
    try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        const notifications = await response.json();
        
        // Filter for read notifications
        const readNotifications = notifications.filter(n => n.isRead);
        
        if (readNotifications.length === 0) {
            showToast('Info', 'No read notifications to clear');
            return;
        }
        
        const confirmClear = confirm(`Are you sure you want to delete ${readNotifications.length} read notification(s)?`);
        if (!confirmClear) return;
        
        // Delete each read notification
        const deletePromises = readNotifications.map(notification => 
            fetch(`/api/notifications/${notification.id}`, { method: 'DELETE' })
        );
        
        await Promise.all(deletePromises);
        
        showToast('Success', `Cleared ${readNotifications.length} read notification(s)`);
        loadNotifications();
    } catch (error) {
        console.error('Error clearing notifications:', error);
        showToast('Error', 'Failed to clear notifications');
    }
}

// Add event listeners for response buttons
function setupResponseButtons() {
    document.querySelectorAll('.response-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.response-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update hidden input
            const responseStatus = this.dataset.response;
            document.getElementById('responseStatus').value = responseStatus;
            
            // Show/hide reason field based on status
            if (responseStatus === 'declined') {
                document.getElementById('declineReasonContainer').classList.remove('hidden');
                document.getElementById('alternativeMentorContainer').classList.remove('hidden');
            } else {
                document.getElementById('declineReasonContainer').classList.add('hidden');
                document.getElementById('alternativeMentorContainer').classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await initializeDashboard();
    await setupStudentHistory();
    await loadMentorRequests();
    await loadNotifications();
    await loadMentorAvailability();
    setupResponseButtons();
    
    // Schedule periodic refresh of notifications and requests
    setInterval(loadMentorRequests, 60000); // Every minute
    setInterval(loadNotifications, 60000);
    
    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterStudents(e.target.value.trim());
        });
    }
    
    // Setup event listeners for schedule type toggle
    document.querySelectorAll('input[name="scheduleType"]').forEach(input => {
        input.addEventListener('change', function() {
            toggleScheduleType(this.value);
        });
    });
});

// Remove static event listeners for filter buttons as they're now added dynamically
document.getElementById('createSlotBtn').addEventListener('click', openModal);
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.getElementById('createSlotForm').addEventListener('submit', createSlot);
document.getElementById('addAvailabilityBtn').addEventListener('click', openAvailabilityModal);
document.querySelector('.close-availability-modal').addEventListener('click', closeAvailabilityModal);
document.getElementById('createAvailabilityForm').addEventListener('submit', createAvailability);
document.querySelector('.close-mentor-modal').addEventListener('click', closeMentorResponseModal);
document.getElementById('mentorResponseForm').addEventListener('submit', submitMentorResponse);
document.getElementById('clearAllNotificationsBtn').addEventListener('click', clearAllReadNotifications);
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Error', 'Failed to logout');
    }
});