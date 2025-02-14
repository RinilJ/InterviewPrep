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
        if (user.role !== 'teacher') {
            window.location.href = '/dashboard.html';
            return null;
        }
        return user;
    } catch (error) {
        window.location.href = '/login.html';
        return null;
    }
}

// Initialize dashboard
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info
    document.getElementById('userName').textContent = `${user.username} (Teacher)`;

    // Fetch statistics
    const stats = await fetch('/api/teacher/stats').then(res => res.json());
    document.getElementById('totalStudents').textContent = stats.totalStudents;
    document.getElementById('activeSessions').textContent = stats.activeSessions;
    document.getElementById('discussionSlots').textContent = stats.totalSlots;

    // Fetch and display student progress
    const students = await fetch('/api/teacher/students').then(res => res.json());
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-info">
                <h3>${student.username}</h3>
                <p><i class="fas fa-clock"></i> Last Active: ${formatDate(student.lastActive)}</p>
                <p><i class="fas fa-tasks"></i> Tests Completed: ${student.testsCompleted}</p>
                <p><i class="fas fa-chart-line"></i> Average Score: ${student.averageScore}%</p>
            </div>
            <div class="student-actions">
                <button class="btn-secondary" onclick="viewProgress(${student.id})">
                    <i class="fas fa-chart-bar"></i> View Progress
                </button>
            </div>
        </div>
    `).join('');

    // Fetch and display discussion slots
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
                <p><i class="fas fa-users"></i> Participants: ${slot.maxParticipants}</p>
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
                maxParticipants: parseInt(form.maxParticipants.value)
            })
        });

        if (response.ok) {
            closeModal();
            loadDiscussionSlots();
            alert('Slot created successfully!');
        } else {
            const error = await response.text();
            alert(error || 'Failed to create slot');
        }
    } catch (error) {
        console.error('Create slot error:', error);
        alert('Failed to create slot');
    }
}

// Modal functions
function openModal() {
    document.getElementById('createSlotModal').classList.remove('hidden');
}

function openModal() {
    document.getElementById('createSlotModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('createSlotModal').classList.add('hidden');
    document.getElementById('createSlotForm').reset();
}

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
                maxParticipants: parseInt(form.maxParticipants.value)
            })
        });

        if (response.ok) {
            closeModal();
            loadDiscussionSlots();
            alert('Slot created successfully!');
        } else {
            const error = await response.text();
            alert(error || 'Failed to create slot');
        }
    } catch (error) {
        console.error('Create slot error:', error);
        alert('Failed to create slot');
    }
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

// Discussion filters
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadDiscussionSlots(button.dataset.filter);
    });
});

// Event listeners
document.getElementById('createSlotBtn').addEventListener('click', openModal);
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.getElementById('createSlotForm').addEventListener('submit', createSlot);
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to logout');
    }
});

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', initializeDashboard);