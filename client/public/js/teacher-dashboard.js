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
        console.log('User data:', user);

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

    // Update user info with batch details
    const userInfo = `${user.username} (${user.department} - Year ${user.year}, Batch ${user.batch})`;
    document.getElementById('userName').textContent = userInfo;

    // Fetch students for the teacher's batch
    const students = await fetch('/api/teacher/students').then(res => res.json());
    console.log('Fetched students:', students);

    const studentsList = document.getElementById('studentsList');
    if (students.length === 0) {
        studentsList.innerHTML = '<div class="student-card"><p>No students found in your batch.</p></div>';
    } else {
        studentsList.innerHTML = students.map(student => `
            <div class="student-card">
                <div class="student-info">
                    <h3><i class="fas fa-user-graduate"></i> ${student.username}</h3>
                    <p><i class="fas fa-graduation-cap"></i> ${student.department} - Year ${student.year}, Batch ${student.batch}</p>
                    <p><i class="fas fa-clock"></i> Last Active: ${formatDate(student.lastActive)}</p>
                    <div class="test-progress">
                        <h4>Test Progress</h4>
                        <div class="progress-grid">
                            <div class="progress-item">
                                <span>Technical Tests:</span>
                                <span class="count">${student.technicalTestsCompleted || 0}</span>
                            </div>
                            <div class="progress-item">
                                <span>Aptitude Tests:</span>
                                <span class="count">${student.aptitudeTestsCompleted || 0}</span>
                            </div>
                            <div class="progress-item">
                                <span>Psychometric Tests:</span>
                                <span class="count">${student.psychometricTestsCompleted || 0}</span>
                            </div>
                        </div>
                        <p class="average-score">
                            <i class="fas fa-chart-line"></i> Average Score: ${student.averageScore || 0}%
                        </p>
                    </div>
                </div>
                <div class="student-actions">
                    <button class="btn-secondary" onclick="viewStudentProgress(${student.id})">
                        <i class="fas fa-chart-bar"></i> Detailed Progress
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Load discussion slots
    await loadDiscussionSlots();
}

// Load discussion slots
async function loadDiscussionSlots(filter = 'all') {
    const slots = await fetch('/api/discussion-slots').then(res => res.json());
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
                <button class="btn-secondary" onclick="cancelSlot(${slot.id})">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `).join('');
}

// Create new discussion slot
async function createSlot(e) {
    e.preventDefault();
    const form = e.target;

    try {
        const startTime = new Date(form.slotDateTime.value);
        const endTime = new Date(startTime.getTime() + parseInt(form.slotDuration.value) * 60000);

        const response = await fetch('/api/discussion-slots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mentorName: form.mentorName.value,
                topic: form.slotTopic.value || null,
                startTime,
                endTime,
                maxParticipants: parseInt(form.maxParticipants.value),
                // Add batch information from the teacher's data
                department: form.department.value,
                year: form.year.value,
                batch: form.batch.value
            })
        });

        if (response.ok) {
            closeModal();
            loadDiscussionSlots();
            showSuccessMessage('Slot created successfully!');
        } else {
            const error = await response.text();
            showErrorMessage(error || 'Failed to create slot');
        }
    } catch (error) {
        console.error('Create slot error:', error);
        showErrorMessage('Failed to create slot');
    }
}

// View detailed student progress
async function viewStudentProgress(studentId) {
    try {
        const response = await fetch(`/api/teacher/student-progress/${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch student progress');

        const progress = await response.json();
        // Implementation for showing detailed progress modal
        // This would be implemented based on your UI requirements
    } catch (error) {
        console.error('Error viewing student progress:', error);
        showErrorMessage('Failed to load student progress');
    }
}

// Utility functions for showing messages
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
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
document.getElementById('createSlotBtn').addEventListener('click', openModal);
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.getElementById('createSlotForm').addEventListener('submit', createSlot);
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showErrorMessage('Failed to logout');
    }
});

// Add event listeners for discussion filters
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', () => filterDiscussionSlots(button.dataset.filter));
});