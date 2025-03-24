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
function initializeTechnicalTest() {
    const testCards = document.querySelectorAll('.test-card');

    testCards.forEach(card => {
        const languageButtons = card.querySelectorAll('.language-btn');
        const category = card.dataset.category;

        languageButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const language = button.dataset.language;
                const originalText = button.innerHTML;

                try {
                    button.disabled = true;
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

                    const response = await fetch(`/api/technical-test/generate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            category,
                            language,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to generate test');
                    }

                    const test = await response.json();
                    sessionStorage.setItem('currentTest', JSON.stringify({
                        ...test,
                        category,
                        language,
                        currentQuestionIndex: 0,
                        answers: [],
                        startTime: new Date().toISOString(),
                    }));

                    window.location.href = '/test.html';
                } catch (error) {
                    console.error('Error starting test:', error);
                    alert('Failed to start test. Please try again.');
                    button.disabled = false;
                    button.innerHTML = originalText;
                }
            });
        });
    });
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

// Function to format test results based on type
function formatTestResult(result) {
    if (result.insights) {
        try {
            const insightData = typeof result.insights === 'string'
                ? JSON.parse(result.insights)
                : result.insights;

            return `
                <div class="history-card insight-card">
                    <div class="history-info">
                        <h3>${insightData.category}</h3>
                        <div class="insights-list">
                            ${insightData.insights.map(insight =>
                                `<p class="insight-item">${insight}</p>`
                            ).join('')}
                        </div>
                        ${insightData.recommendations ? `
                            <div class="recommendations-list">
                                <h4>Career Recommendations:</h4>
                                ${insightData.recommendations.map(rec =>
                                    `<p class="recommendation-item">${rec}</p>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error parsing insights:', error);
            return '';
        }
    } else {
        // Regular test result display (for non-psychometric tests)
        return `
            <div class="history-card">
                <div class="history-info">
                    <h3>${result.testId ? `Test ${result.testId}` : 'Practice Test'}</h3>
                    <p><i class="far fa-calendar-alt"></i> ${formatDate(result.completedAt)}</p>
                </div>
                <div class="score">${result.score}%</div>
            </div>
        `;
    }
}


// Update the user info section in initializeDashboard function
async function initializeDashboard() {
    const user = await checkAuth();
    if (!user) return;

    // Update user info with correct formatting - focus on year and batch
    document.getElementById('userName').textContent = `${user.username} - Year ${user.year}, Batch ${user.batch}`;

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
            .map(result => formatTestResult(result))
            .join('');

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Failed to load dashboard data. Please refresh the page.');
    }
}

// Start a test (for non-psychometric tests)
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

// Add handling for psychometric tests
async function startPsychometricTest(testType) {
    // Get the button that was clicked
    const button = event.currentTarget;
    const originalText = button.innerHTML;

    try {
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        // Fetch psychometric questions
        const response = await fetch(`/api/psychometric-test?type=${testType}`);
        if (!response.ok) {
            throw new Error(await response.text());
        }

        const test = await response.json();

        if (!test.questions || test.questions.length === 0) {
            throw new Error('No questions available for this test');
        }

        // Store the current test in session storage
        sessionStorage.setItem('currentTest', JSON.stringify({
            type: testType,
            title: test.title,
            questions: test.questions,
            timeLimit: test.timeLimit || 1800, // 30 minutes default
            currentQuestionIndex: 0,
            answers: new Array(test.questions.length).fill(null),
            startTime: new Date().toISOString()
        }));

        // Redirect to the test page
        window.location.href = '/test.html';
    } catch (error) {
        console.error('Error starting test:', error);

        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Failed to start test. Please try again.';
        document.body.appendChild(errorMsg);

        // Remove error message after 5 seconds
        setTimeout(() => errorMsg.remove(), 5000);

        // Reset button state
        button.disabled = false;
        button.innerHTML = originalText;
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

        switch (filter) {
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