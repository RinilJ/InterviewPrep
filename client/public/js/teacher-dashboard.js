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

// Initialize dashboard
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info with correct formatting
    const userElement = document.getElementById('userName');
    userElement.textContent = `${user.username} (${user.department})`;

    await refreshDashboard();
    await loadDiscussionSlots();

    // Set up periodic refresh every 30 seconds
    refreshInterval = setInterval(refreshDashboard, 30000);
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
                        </div>
                    </div>
                </div>
            `).join('');
        }
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
                    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
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

// Modal functions
function openModal() {
    document.getElementById('createSlotModal').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = 'Create Discussion Slot';
    document.getElementById('submitBtn').textContent = 'Create Slot';
}

function closeModal() {
    document.getElementById('createSlotModal').classList.add('hidden');
    document.getElementById('createSlotForm').reset();
    document.getElementById('createSlotForm').dataset.mode = '';
}

// Function to edit discussion slot
async function editSlot(slotId) {
    try {
        const response = await fetch(`/api/discussion-slots/${slotId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch slot details');
        }
        const slot = await response.json();

        // Format the date for the datetime-local input
        const startTime = new Date(slot.startTime);
        const formattedDateTime = startTime.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm

        // Calculate duration in minutes
        const endTime = new Date(slot.endTime);
        const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));

        // Show edit modal with current values
        const form = document.getElementById('createSlotForm');
        form.slotTopic.value = slot.topic || '';
        form.slotDateTime.value = formattedDateTime;
        form.maxParticipants.value = slot.maxParticipants;
        form.slotDuration.value = durationMinutes;

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

// Create/update discussion slot
async function createSlot(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const isEdit = form.dataset.mode === 'edit';

    try {
        submitButton.disabled = true;
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEdit ? 'Updating...' : 'Creating...'}`;

        // Create Date objects for start and end times
        const startTime = new Date(form.slotDateTime.value);
        const endTime = new Date(startTime.getTime() + parseInt(form.slotDuration.value) * 60000);

        const slotData = {
            topic: form.slotTopic.value || 'Open Discussion',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
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

// Function to view participants (placeholder)
async function viewParticipants(slotId) {
    showToast('Info', `Viewing participants for slot ${slotId} will be implemented soon.`);
}

// Clean up interval when leaving the page
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
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
        showToast('Error', 'Failed to logout');
    }
});