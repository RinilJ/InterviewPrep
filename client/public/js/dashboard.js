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

// Technical test selection handling
let selectedCategory = null;
let selectedLanguage = null;

function initializeTechnicalTest() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const languageButtons = document.querySelectorAll('.language-btn');
    const languageSection = document.querySelector('.language-selection');
    const startTestBtn = document.getElementById('startTestBtn');

    // Category selection
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active state to clicked button
            button.classList.add('active');
            selectedCategory = button.dataset.category;
            // Show language selection
            languageSection.classList.remove('hidden');
            // Hide start button until language is selected
            startTestBtn.classList.add('hidden');
        });
    });

    // Language selection
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all language buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Add active state to clicked button
            button.classList.add('active');
            selectedLanguage = button.dataset.language;
            // Show start button
            startTestBtn.classList.remove('hidden');
        });
    });

    // Start test button
    startTestBtn.addEventListener('click', startTechnicalTest);
}

// Start technical test
async function startTechnicalTest() {
    try {
        const button = event.target;
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        const response = await fetch(`/api/technical-test/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: selectedCategory,
                language: selectedLanguage,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate test');
        }

        const test = await response.json();
        sessionStorage.setItem('currentTest', JSON.stringify({
            ...test,
            category: selectedCategory,
            language: selectedLanguage,
            currentQuestionIndex: 0,
            answers: [],
            startTime: new Date().toISOString(),
        }));

        window.location.href = '/test.html';
    } catch (error) {
        console.error('Error starting test:', error);
        alert('Failed to start test. Please try again.');
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
}

// Function to create test card
function createTestCard(test) {
    return `
        <div class="test-card">
            <div class="test-info">
                <h3>${test.title}</h3>
                <p>${test.description || test.range}</p>
            </div>
            <button class="btn-primary" onclick="startTest('${test.id}')">
                <i class="fas fa-play"></i> Start Test
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

    try {
        // Load topics for each category
        const topics = await fetch('/api/aptitude-topics').then(res => res.json());

        // Populate verbal reasoning topics
        const verbalContainer = document.getElementById('verbalTests');
        if (topics.verbal) {
            verbalContainer.innerHTML = topics.verbal
                .map(topic => createTestCard({
                    ...topic,
                    description: `Questions: ${topic.range}`
                }))
                .join('');
        }

        // Populate non-verbal reasoning topics
        const nonVerbalContainer = document.getElementById('nonVerbalTests');
        if (topics.nonVerbal) {
            nonVerbalContainer.innerHTML = topics.nonVerbal
                .map(topic => createTestCard({
                    ...topic,
                    description: `Questions: ${topic.range}`
                }))
                .join('');
        }

        // Populate mathematical topics
        const mathematicalContainer = document.getElementById('mathematicalTests');
        if (topics.mathematical) {
            mathematicalContainer.innerHTML = topics.mathematical
                .map(topic => createTestCard({
                    ...topic,
                    description: `Questions: ${topic.range}`
                }))
                .join('');
        }

        // Populate technical topics
        const technicalContainer = document.getElementById('technicalTests');
        if (topics.technical) {
            technicalContainer.innerHTML = topics.technical
                .map(topic => createTestCard({
                    ...topic,
                    description: topic.description || `Questions: ${topic.range}`
                }))
                .join('');
        }

        // Populate psychometric topics
        const psychometricContainer = document.getElementById('psychometricTests');
        if (topics.psychometric) {
            psychometricContainer.innerHTML = topics.psychometric
                .map(topic => createTestCard({
                    ...topic,
                    description: topic.description || `Questions: ${topic.range}`
                }))
                .join('');
        }

        // Load test results for statistics
        const results = await fetch('/api/test-results').then(res => res.json());

        // Update statistics
        const averageScore = results.length
            ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
            : 0;
        document.getElementById('averageScore').textContent = `${averageScore}%`;
        document.getElementById('testsCompleted').textContent = results.length;

        // Load and display test history
        const historyContainer = document.getElementById('testHistory');
        historyContainer.innerHTML = results
            .map(result => `
                <div class="history-card">
                    <div class="history-info">
                        <h3>${result.testId ? `Test ${result.testId}` : 'Practice Test'}</h3>
                        <p><i class="far fa-calendar-alt"></i> ${formatDate(result.completedAt)}</p>
                    </div>
                    <div class="score">${result.score}%</div>
                </div>
            `)
            .join('');

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Failed to load dashboard data. Please refresh the page.');
    }
}

// Start a test
async function startTest(topicId) {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        // Fetch questions for this topic
        const response = await fetch(`/api/generate-test?topicId=${topicId}`);
        if (!response.ok) {
            throw new Error(await response.text());
        }

        const test = await response.json();

        if (!test.questions || test.questions.length === 0) {
            throw new Error('No questions available for this topic');
        }

        // Store the current test in session storage
        sessionStorage.setItem('currentTest', JSON.stringify({
            topicId,
            title: test.title,
            questions: test.questions,
            currentQuestionIndex: 0,
            answers: [],
            startTime: new Date().toISOString()
        }));

        // Redirect to the test page
        window.location.href = '/test.html';
    } catch (error) {
        console.error('Error starting test:', error);
        alert('Failed to start test. Please try again.');
        // Reset button state
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
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
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    initializeTechnicalTest();
});

// Add event listeners for discussion filters
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', () => filterDiscussionSlots(button.dataset.filter));
});

// Filter discussion slots
function filterDiscussionSlots(filter) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    const slots = document.querySelectorAll('.discussion-card');
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);

    slots.forEach(slot => {
        const dateStr = slot.querySelector('.discussion-info p').textContent;
        const slotDate = new Date(dateStr.split('-')[0].trim());

        switch(filter) {
            case 'today':
                slot.style.display =
                    slotDate.toDateString() === now.toDateString() ? 'flex' : 'none';
                break;
            case 'week':
                slot.style.display =
                    slotDate >= now && slotDate <= weekEnd ? 'flex' : 'none';
                break;
            default:
                slot.style.display = 'flex';
        }
    });
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