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

// Initialize dashboard
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info with correct formatting
    const userElement = document.getElementById('userName');
    userElement.textContent = `${user.username} (${user.department} - Year ${user.year}, Batch ${user.batch})`;
    console.log('Teacher Info:', user); // Debug log

    try {
        // Show loading state
        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = '<div class="loading">Loading students data...</div>';

        // Fetch and display student progress
        const studentsResponse = await fetch('/api/teacher/students');
        if (!studentsResponse.ok) {
            throw new Error('Failed to fetch students');
        }
        const students = await studentsResponse.json();
        console.log('Fetched students:', students); // Debug log

        if (students.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No students found for ${user.department} - Year ${user.year}, Batch ${user.batch}</p>
                </div>`;
        } else {
            studentsList.innerHTML = students.map(student => `
                <div class="student-card">
                    <div class="student-info">
                        <h3><i class="fas fa-user-graduate"></i> ${student.username}</h3>
                        <p><i class="fas fa-graduation-cap"></i> ${student.department} - Year ${student.year}, Batch ${student.batch}</p>
                        <p><i class="fas fa-clock"></i> Last Active: ${formatDate(student.createdAt)}</p>
                        <div class="progress-section">
                            <h4>Test Progress</h4>
                            <div class="progress-stats">
                                <div class="stat">
                                    <span class="label">Aptitude Tests</span>
                                    <span class="value">${student.aptitudeProgress || 0}%</span>
                                </div>
                                <div class="stat">
                                    <span class="label">Technical Tests</span>
                                    <span class="value">${student.technicalProgress || 0}%</span>
                                </div>
                                <div class="stat">
                                    <span class="label">Psychometric Tests</span>
                                    <span class="value">${student.psychometricProgress || 0}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="student-actions">
                        <button class="btn-secondary" onclick="viewProgress(${student.id})">
                            <i class="fas fa-chart-bar"></i> View Details
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
        console.log('Teacher stats:', stats); // Debug log

        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('activeSessions').textContent = stats.activeSessions || 0;
        document.getElementById('discussionSlots').textContent = stats.discussionSlots || 0;

    } catch (error) {
        console.error('Error initializing dashboard:', error);
        document.getElementById('studentsList').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load student data. Please try refreshing the page.</p>
            </div>`;
    }

    // Load discussion slots
    await loadDiscussionSlots();
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
        if (filteredSlots.length === 0) {
            discussionManagement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No discussion slots found</p>
                </div>`;
        } else {
            discussionManagement.innerHTML = filteredSlots.map(slot => `
                <div class="discussion-card">
                    <div class="discussion-info">
                        <h3><i class="fas fa-comments"></i> ${slot.topic || 'Open Discussion'}</h3>
                        <p><i class="far fa-clock"></i> ${formatDate(slot.startTime)} - ${new Date(slot.endTime).toLocaleTimeString()}</p>
                        <p><i class="fas fa-users"></i> Maximum Participants: ${slot.maxParticipants}</p>
                        <p><i class="fas fa-graduation-cap"></i> For: ${slot.department} - Year ${slot.year}, Batch ${slot.batch}</p>
                    </div>
                    <div class="slot-actions">
                        <button class="btn-secondary" onclick="editSlot(${slot.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger" onclick="cancelSlot(${slot.id})">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading discussion slots:', error);
        document.getElementById('discussionManagement').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load discussion slots. Please try refreshing the page.</p>
            </div>`;
    }
}

// View student's detailed progress
async function viewProgress(studentId) {
    // TODO: Implement detailed progress view
    alert('Detailed progress view will be implemented soon');
}

// Filter discussion slots
function filterDiscussionSlots(filter) {
    loadDiscussionSlots(filter);
}

// Create new discussion slot
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
                topic: form.slotTopic.value || null,
                startTime,
                endTime,
                maxParticipants: parseInt(form.maxParticipants.value)
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

// Show toast notification
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${title.toLowerCase()}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${title === 'Success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <strong>${title}</strong>
        </div>
        <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
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
    button.addEventListener('click', () => filterDiscussionSlots(button.dataset.filter));
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