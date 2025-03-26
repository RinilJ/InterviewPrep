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
            mainContent.innerHTML = `
                <div class="container">
                    <h1>Test Results Unavailable</h1>
                    <p>Unable to load test results. Please try taking the test again.</p>
                    <div class="actions">
                        <a href="/dashboard.html" class="dashboard-btn">Return to Dashboard</a>
                    </div>
                </div>
            `;
            return;
        }

        if (testData.type === 'mbti') {
            // Extract personality type from insights
            const personalityTypeInfo = testData.insights.insights[0].split(' - ');
            const personalityType = personalityTypeInfo[0].split('is ')[1];
            const description = personalityTypeInfo[1];
            const allInsights = testData.insights.insights.slice(1);

            // Filter insights by category
            const characteristics = allInsights.filter(insight => 
                insight.startsWith('•') && 
                !insight.toLowerCase().includes('career') && 
                !insight.toLowerCase().includes('prefer')
            );

            const preferences = allInsights.filter(insight => 
                insight.startsWith('•') && 
                insight.toLowerCase().includes('prefer') &&
                !insight.toLowerCase().includes('career')
            );

            const careerPaths = allInsights.filter(insight => 
                insight.startsWith('•') && 
                insight.toLowerCase().includes('career')
            );

            mainContent.innerHTML = `
                <div class="container">
                    <div class="results-header">
                        <h1>MBTI Personality Assessment Results</h1>
                        <div class="meta-info">
                            <span><i class="far fa-clock"></i> ${formatTime(timeSpent)}</span>
                            <span><i class="far fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="personality-type-card">
                        <div class="type-badge">${personalityType}</div>
                        <p class="type-description">${description}</p>
                    </div>

                    <div class="results-grid">
                        <div class="result-section characteristics-section">
                            <h2><i class="fas fa-fingerprint"></i> Key Characteristics</h2>
                            <div class="traits-container">
                                ${characteristics.map(char => `
                                    <div class="trait-card">
                                        <p>${char.replace('•', '').trim()}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="result-section preferences-section">
                            <h2><i class="fas fa-heart"></i> Your Preferences</h2>
                            <div class="traits-container">
                                ${preferences.map(pref => `
                                    <div class="trait-card">
                                        <p>${pref.replace('•', '').trim()}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="result-section career-section">
                            <h2><i class="fas fa-briefcase"></i> Recommended Career Paths</h2>
                            <div class="career-grid">
                                ${careerPaths.map(career => `
                                    <div class="career-card">
                                        <i class="fas fa-star"></i>
                                        <p>${career.replace('•', '').trim()}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="actions-footer">
                        <a href="/dashboard.html" class="dashboard-btn">
                            <i class="fas fa-arrow-left"></i> Return to Dashboard
                        </a>
                    </div>
                </div>
            `;
        } else {
            // Default display for other psychometric tests
            mainContent.innerHTML = `
                <div class="container">
                    <div class="results-header">
                        <h1>${testData.insights.category || 'Personality Assessment'}</h1>
                        <div class="meta-info">
                            <span><i class="far fa-clock"></i> ${formatTime(timeSpent)}</span>
                            <span><i class="far fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="insights-section">
                        ${testData.insights.insights.map(insight => `
                            <div class="insight-card">
                                <i class="fas fa-lightbulb"></i>
                                <p>${insight}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="actions-footer">
                        <a href="/dashboard.html" class="dashboard-btn">
                            <i class="fas fa-arrow-left"></i> Return to Dashboard
                        </a>
                    </div>
                </div>
            `;
        }
    } else {
        // For technical and aptitude tests
        const score = testData.score || 0;
        const correctAnswers = testData.questions.filter(q => q.isCorrect).length;
        const incorrectAnswers = testData.questions.length - correctAnswers;
        const accuracy = Math.round((correctAnswers / testData.questions.length) * 100);

        mainContent.innerHTML = `
            <div class="container">
                <div class="results-header">
                    <h1>Test Results</h1>
                    <div class="meta-info">
                        <span><i class="far fa-clock"></i> ${formatTime(timeSpent)}</span>
                        <span><i class="far fa-calendar"></i> ${new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <div class="score-overview">
                    <div class="score-circle">
                        <div class="score-number">${score}%</div>
                        <div class="score-label">Overall Score</div>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-card correct">
                            <div class="stat-icon"><i class="fas fa-check"></i></div>
                            <div class="stat-content">
                                <h3>Correct Answers</h3>
                                <p>${correctAnswers}</p>
                            </div>
                        </div>
                        <div class="stat-card incorrect">
                            <div class="stat-icon"><i class="fas fa-times"></i></div>
                            <div class="stat-content">
                                <h3>Incorrect Answers</h3>
                                <p>${incorrectAnswers}</p>
                            </div>
                        </div>
                        <div class="stat-card time">
                            <div class="stat-icon"><i class="fas fa-clock"></i></div>
                            <div class="stat-content">
                                <h3>Time Taken</h3>
                                <p>${formatTime(timeSpent)}</p>
                            </div>
                        </div>
                        <div class="stat-card accuracy">
                            <div class="stat-icon"><i class="fas fa-bullseye"></i></div>
                            <div class="stat-content">
                                <h3>Accuracy</h3>
                                <p>${accuracy}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="detailed-review">
                    <h2>Question Review</h2>
                    <div class="review-grid" id="reviewContent"></div>
                </div>

                <div class="actions-footer">
                    <a href="/dashboard.html" class="dashboard-btn">
                        <i class="fas fa-arrow-left"></i> Return to Dashboard
                    </a>
                </div>
            </div>
        `;

        // Show questions review
        const reviewContent = document.getElementById('reviewContent');
        testData.questions.forEach((question, index) => {
            reviewContent.innerHTML += `
                <div class="review-card ${question.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1}</span>
                        <span class="result-badge ${question.isCorrect ? 'correct' : 'incorrect'}">
                            ${question.isCorrect ? '<i class="fas fa-check"></i> Correct' : '<i class="fas fa-times"></i> Incorrect'}
                        </span>
                    </div>

                    <div class="question-content">
                        <p class="question-text">${question.question}</p>
                        ${question.code ? `<pre><code class="language-${question.language || 'plaintext'}">${question.code}</code></pre>` : ''}

                        <div class="options-grid">
                            ${question.options.map((option, i) => `
                                <div class="option 
                                    ${i === question.correctAnswer ? 'correct' : ''} 
                                    ${i === question.userAnswer ? 'selected' : ''}">
                                    ${option}
                                    ${i === question.correctAnswer ? ' <i class="fas fa-check"></i>' : ''}
                                    ${i === question.userAnswer && i !== question.correctAnswer ? ' <i class="fas fa-times"></i>' : ''}
                                </div>
                            `).join('')}
                        </div>

                        ${question.explanation ? `
                            <div class="explanation">
                                <h4><i class="fas fa-info-circle"></i> Explanation:</h4>
                                <p>${question.explanation}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
    }
});