// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Initialize results page
window.addEventListener('DOMContentLoaded', () => {
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    console.log('Loaded test results:', testData);

    if (!testData) {
        window.location.href = '/dashboard.html';
        return;
    }

    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);
    const mainContent = document.querySelector('.main-content');

    // For psychometric tests
    if (testData.type && ['big-five', 'mbti', 'eq', 'sjt'].includes(testData.type)) {
        if (!testData.insights) {
            console.error('No insights found in test data');
            mainContent.innerHTML = `
                <div class="container">
                    <h1>Test Results Unavailable</h1>
                    <p>Unable to load test results. Please try taking the test again.</p>
                    <div class="actions">
                        <a href="/dashboard.html" class="dashboard-btn">
                            Return to Dashboard
                        </a>
                    </div>
                </div>
            `;
            return;
        }

        // For MBTI test
        if (testData.type === 'mbti') {
            console.log('MBTI insights:', testData.insights);

            // Extract personality type from insights
            const personalityTypeInfo = testData.insights.insights[0].split(' - ');
            const personalityType = personalityTypeInfo[0].split('is ')[1];
            const description = personalityTypeInfo[1];

            // Get all insights after the type description
            const allInsights = testData.insights.insights.slice(1);

            // Filter insights by category
            const characteristics = allInsights.filter(insight => 
                insight.startsWith('•') && 
                !insight.toLowerCase().includes('prefer') && 
                !insight.toLowerCase().includes('career')
            );

            const preferences = allInsights.filter(insight => 
                insight.startsWith('•') && 
                insight.toLowerCase().includes('prefer')
            );

            const careers = allInsights.filter(insight => 
                insight.startsWith('•') && 
                insight.toLowerCase().includes('career')
            );

            mainContent.innerHTML = `
                <div class="container">
                    <div class="mbti-results">
                        <div class="personality-type">
                            <h2>Your MBTI Type: ${personalityType}</h2>
                            <p>${description}</p>
                        </div>

                        <div class="characteristics-section">
                            <h3 class="section-title">Key Characteristics</h3>
                            ${characteristics.map(char => `
                                <div class="trait-card">
                                    <p>${char.replace('•', '').trim()}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="preferences-section">
                            <h3 class="section-title">Your Preferences</h3>
                            ${preferences.map(pref => `
                                <div class="trait-card">
                                    <p>${pref.replace('•', '').trim()}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="career-section">
                            <h3 class="section-title">Recommended Career Paths</h3>
                            <div class="career-grid">
                                ${careers.map(career => `
                                    <div class="career-item">
                                        <p>${career.replace('•', '').trim()}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="time-taken">
                            Time taken: ${formatTime(timeSpent)}
                        </div>

                        <div class="actions">
                            <a href="/dashboard.html" class="dashboard-btn">
                                <i class="fas fa-arrow-left"></i> Return to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Default display for other psychometric tests
            mainContent.innerHTML = `
                <div class="container">
                    <h1>${testData.insights.category || 'Personality Assessment'}</h1>
                    <div class="insights-section">
                        ${testData.insights.insights.map(insight => `
                            <div class="insight-item">
                                <p>${insight}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="time-taken">
                        Time taken: ${formatTime(timeSpent)}
                    </div>

                    <div class="actions">
                        <a href="/dashboard.html" class="dashboard-btn">
                            <i class="fas fa-arrow-left"></i> Return to Dashboard
                        </a>
                    </div>
                </div>
            `;
        }
    } else {
        // For non-psychometric tests
        const score = testData.score || 0;
        const correctAnswers = testData.questions.filter(q => q.isCorrect).length;
        const incorrectAnswers = testData.questions.length - correctAnswers;

        document.getElementById('scorePercentage').textContent = `${score}%`;
        document.getElementById('correctAnswers').textContent = correctAnswers;
        document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
        document.getElementById('timeTaken').textContent = formatTime(timeSpent);

        // Show questions review
        const reviewContent = document.getElementById('reviewContent');
        testData.questions.forEach((question, index) => {
            reviewContent.innerHTML += `
                <div class="review-item ${question.isCorrect ? 'correct' : 'incorrect'}">
                    <h3>Question ${index + 1}</h3>
                    <p>${question.question}</p>
                    ${question.code ? `<pre><code>${question.code}</code></pre>` : ''}
                    <div class="options">
                        ${question.options.map((option, i) => `
                            <div class="option ${i === question.correctAnswer ? 'correct' : ''} 
                                           ${i === question.userAnswer ? 'selected' : ''}">
                                ${option}
                                ${i === question.correctAnswer ? ' ✓' : ''}
                                ${i === question.userAnswer && i !== question.correctAnswer ? ' ✗' : ''}
                            </div>
                        `).join('')}
                    </div>
                    ${question.explanation ? `
                        <div class="explanation">
                            <h4>Explanation:</h4>
                            <p>${question.explanation}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        });
    }
});