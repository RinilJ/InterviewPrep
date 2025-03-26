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

    // Load discussion slots
    await loadDiscussionSlots();
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

        const studentsList = document.getElementById('studentsList');
        if (students.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No students found in your batch</p>
                    <p class="subtitle">Students will appear here once they register</p>
                </div>`;
        } else {
            studentsList.innerHTML = students.map(student => `
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
            switch(filter) {
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
            <div class="section-header">
                <div class="category-header">
                    <i class="fas fa-comments"></i>
                    <h2>Discussion Management</h2>
                </div>
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
                </div>
            </div>`;

        if (filteredSlots.length === 0) {
            discussionManagement.innerHTML = `
                ${headerHtml}
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No discussion slots found</p>
                    <p class="subtitle">Create a new slot to get started</p>
                    <button class="btn-primary" onclick="openModal()">
                        <i class="fas fa-plus"></i> Create New Slot
                    </button>
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
            maxParticipants: parseInt(form.maxParticipants.value)
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

        closeModal();
        loadDiscussionSlots();
        showToast('Success', `Discussion slot ${isEdit ? 'updated' : 'created'} successfully`);
    } catch (error) {
        console.error('Slot operation error:', error);
        showToast('Error', `Failed to ${isEdit ? 'update' : 'create'} discussion slot`);
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

// Load student test history when a student is selected
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

        historyContainer.innerHTML = history.map(test => `
            <div class="test-history-item ${test.type}">
                <div class="test-info">
                    <h4>
                        <i class="fas ${test.type === 'technical' ? 'fa-code' : 
                                     test.type === 'mbti' ? 'fa-user' : 
                                     test.type === 'aptitude' ? 'fa-brain' : 'fa-question-circle'}"></i>
                        ${test.testName}
                    </h4>
                    <span class="test-type">${test.type.charAt(0).toUpperCase() + test.type.slice(1)}</span>
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
        `).join('');
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

// Add to your existing initialization code
document.addEventListener('DOMContentLoaded', async () => {
    await initializeDashboard();
    await setupStudentHistory();
});

// Event listeners
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', () => loadDiscussionSlots(button.dataset.filter));
});
document.getElementById('createSlotBtn').addEventListener('click', openModal);
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.getElementById('createSlotForm').addEventListener('submit', createSlot);
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Error', 'Failed to logout');
    }
});