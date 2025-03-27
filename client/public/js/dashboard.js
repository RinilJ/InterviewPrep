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
        console.log('User data:', user); // Debug log
        return user;
    } catch (error) {
        console.error('Auth error:', error);
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

    // Debug log to check user data
    console.log('Initializing dashboard with user:', {
        username: user.username,
        year: user.year,
        batch: user.batch,
        department: user.department
    });

    // Update user info with year and batch
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `${user.username} - Year ${user.year}, Batch ${user.batch}`;
        console.log('Updated username display:', userNameElement.textContent);
    } else {
        console.error('userName element not found');
    }

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

        // Load discussion slots
        await loadDiscussionSlots();

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

// Add function to load discussion slots for students
async function loadDiscussionSlots(filter = 'all') {
    try {
        const slots = await fetch('/api/discussion-slots').then(res => {
            if (!res.ok) throw new Error('Failed to fetch discussion slots');
            return res.json();
        });

        // First, update the filter buttons
        const filtersContainer = document.getElementById('discussionSlotFilters');
        filtersContainer.innerHTML = `
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
        `;

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

        const discussionsTab = document.getElementById('discussionsTab');
        // Insert the category header and filters first
        const categoryHeader = `
            <div class="category-header">
                <i class="fas fa-users"></i>
                <h2>Upcoming Group Discussions</h2>
            </div>
        `;
        document.getElementById('discussionsTab').innerHTML = categoryHeader;
        
        // Update filters container
        filtersContainer.innerHTML = `
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
        `;
            
        if (filteredSlots.length === 0) {
            document.getElementById('discussionSlots').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No discussion slots available for your batch at the moment</p>
                    <p class="subtitle">Check back later for new slots</p>
                </div>`;
        } else {
            // Just populate the slots container, not the entire tab
            document.getElementById('discussionSlots').innerHTML = `
                <div class="discussion-grid">
                    ${filteredSlots.map(slot => `
                        <div class="discussion-card">
                            <div class="discussion-info">
                                <h3><i class="fas fa-comments"></i> ${slot.topic}</h3>
                                <div class="slot-details">
                                    <p><i class="far fa-clock"></i> ${formatDate(slot.startTime)} - ${new Date(slot.endTime).toLocaleTimeString()}</p>
                                    <p><i class="fas fa-users"></i> Available Seats: ${slot.maxParticipants}</p>
                                    <p><i class="fas fa-graduation-cap"></i> ${slot.department} - Year ${slot.year}, Batch ${slot.batch}</p>
                                </div>
                            </div>
                            <div class="slot-actions">
                                <button class="btn-primary" onclick="bookSlot(${slot.id})">
                                    <i class="fas fa-check"></i> Book Slot
                                </button>
                            </div>
                        </div>
                    `).join('')}
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
        document.getElementById('discussionsTab').innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load discussion slots</p>
                <button class="btn-secondary" onclick="loadDiscussionSlots()">
                    <i class="fas fa-sync"></i> Try Again
                </button>
            </div>`;
    }
}

// Book discussion slot
async function bookSlot(slotId) {
    try {
        const button = event.target;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';

        const response = await fetch('/api/slot-bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                slotId: slotId 
            })
        });

        if (response.ok) {
            showToast('Success', 'You have successfully booked this discussion slot!');
            loadDiscussionSlots(); // Refresh the slots list
        } else {
            const error = await response.text();
            showToast('Error', error || 'Unable to book slot. Please try again.');
        }
    } catch (error) {
        console.error('Booking error:', error);
        showToast('Error', 'Failed to book slot. Please try again later.');
    } finally {
        const button = event.target;
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-check"></i> Book Slot';
    }
}

// Add toast notification function
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
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
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
    console.log('DOM loaded, initializing dashboard');
    initializeDashboard();
    initializeTechnicalTest();
});