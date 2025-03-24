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
    userElement.textContent = `${user.username} (${user.department} - Year ${user.year}, Batch ${user.batch})`;

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
                        <h3><i class="fas fa-user-graduate"></i> ${student.username}</h3>
                        <div class="student-details">
                            <p><i class="fas fa-clock"></i> Registered: ${formatDate(student.createdAt)}</p>
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
                    <div class="student-actions">
                        <button class="btn-secondary" onclick="viewProgress(${student.id})">
                            <i class="fas fa-chart-line"></i> View Progress
                        </button>
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


// Event listeners
document.addEventListener('DOMContentLoaded', initializeDashboard);
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

//Function to edit discussion slot (added based on context)
async function editSlot(slotId){
    //Implement edit functionality here.  This would likely involve fetching the slot data, populating a form, and submitting updates.
    showToast('Info', `Editing slot ${slotId} will be implemented soon.`)
}

//Function to cancel discussion slot (added based on context)
async function cancelSlot(slotId){
    //Implement cancel functionality here. This would likely involve sending a delete request to the server.
    showToast('Info', `Cancelling slot ${slotId} will be implemented soon.`)
}

//Function to view participants (added based on context)
async function viewParticipants(slotId){
    //Implement view participants functionality here. This would likely involve fetching the list of participants for the slot.
    showToast('Info', `Viewing participants for slot ${slotId} will be implemented soon.`)
}

async function createSlot(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

        const startTime = new Date(form.slotDateTime.value);
        const endTime = new Date(startTime.getTime() + parseInt(form.slotDuration.value) * 60000);

        const response = await fetch('/api/discussion-slots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic: form.slotTopic.value || 'Open Discussion',
                startTime,
                endTime,
                maxParticipants: parseInt(form.maxParticipants.value)
                // Note: department, year, and batch will be added by the server based on teacher's info
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        closeModal();
        loadDiscussionSlots();
        showToast('Success', 'Discussion slot created successfully');
    } catch (error) {
        console.error('Create slot error:', error);
        showToast('Error', 'Failed to create discussion slot');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Create Slot';
    }
}