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
        return await response.json();
    } catch (error) {
        window.location.href = '/login.html';
        return null;
    }
}

// Function to create topic card
function createTopicCard(topic) {
    return `
        <div class="test-card">
            <div class="test-info">
                <h3>${topic.title}</h3>
                <p>Questions: ${topic.range}</p>
            </div>
            <button class="btn-primary" onclick="startTest('${topic.id}')">
                <i class="fas fa-play"></i> Start
            </button>
        </div>
    `;
}

// Load user data and initialize dashboard
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info
    document.getElementById('userName').textContent = `${user.username} (${user.role})`;

    // Load tests
    const tests = await fetch('/api/tests').then(res => res.json());

    // Load test results
    const results = await fetch('/api/test-results').then(res => res.json());

    // Load discussion slots
    const slots = await fetch('/api/discussion-slots').then(res => res.json());

    // Load aptitude topics
    const topics = await fetch('/api/aptitude-topics').then(res => res.json());

    // Update statistics
    const averageScore = results.length 
        ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
        : 0;
    document.getElementById('averageScore').textContent = `${averageScore}%`;
    document.getElementById('testsCompleted').textContent = results.length;

    const upcomingSlots = slots.filter(slot => new Date(slot.startTime) > new Date());
    document.getElementById('upcomingDiscussions').textContent = upcomingSlots.length;

    // Populate verbal reasoning topics
    const verbalContainer = document.getElementById('verbalTests');
    verbalContainer.innerHTML = topics.verbal.map(createTopicCard).join('');

    // Populate non-verbal reasoning topics
    const nonVerbalContainer = document.getElementById('nonVerbalTests');
    nonVerbalContainer.innerHTML = topics.nonVerbal.map(createTopicCard).join('');

    // Populate mathematical topics
    const mathematicalContainer = document.getElementById('mathematicalTests');
    mathematicalContainer.innerHTML = topics.mathematical.map(createTopicCard).join('');

    // Populate discussion slots
    const slotsContainer = document.getElementById('discussionSlots');
    slotsContainer.innerHTML = upcomingSlots
        .map(slot => `
            <div class="discussion-card">
                <div class="discussion-info">
                    <h3><i class="fas fa-comments"></i> ${slot.topic}</h3>
                    <p><i class="far fa-clock"></i> ${formatDate(slot.startTime)} - ${new Date(slot.endTime).toLocaleTimeString()}</p>
                    <p><i class="fas fa-chalkboard-teacher"></i> Mentor: ${slot.mentor?.username || 'TBA'}</p>
                    <p><i class="fas fa-users"></i> Available Spots: ${slot.maxParticipants}</p>
                </div>
                ${user.role === 'student' 
                    ? `<button class="btn-primary" onclick="bookSlot(${slot.id})">
                         <i class="fas fa-bookmark"></i> Book Slot
                       </button>`
                    : ''}
            </div>
        `).join('');

    // Populate test history
    const historyContainer = document.getElementById('testHistory');
    historyContainer.innerHTML = results
        .map(result => {
            const test = tests.find(t => t.id === result.testId);
            return `
                <div class="history-card">
                    <div class="history-info">
                        <h3>${test?.title || 'Unknown Test'}</h3>
                        <p><i class="far fa-calendar-alt"></i> ${formatDate(result.completedAt)}</p>
                    </div>
                    <div class="score">${result.score}%</div>
                </div>
            `;
        })
        .join('');
}

// Book discussion slot
async function bookSlot(slotId) {
    try {
        const response = await fetch('/api/slot-bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slotId })
        });

        if (response.ok) {
            alert('Slot booked successfully!');
            initializeDashboard(); // Refresh the dashboard
        } else {
            const error = await response.text();
            alert(error || 'Failed to book slot');
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('Failed to book slot');
    }
}

// Start a test
async function startTest(topicId) {
    // TODO: Implement test starting functionality
    alert('Starting test for topic: ' + topicId);
}

// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show/hide content
        const targetId = `${tab.dataset.tab}Tab`;
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('hidden', content.id !== targetId);
        });
    });
});

// Handle logout
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