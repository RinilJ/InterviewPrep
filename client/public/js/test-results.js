// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Initialize results page
window.addEventListener('DOMContentLoaded', () => {
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    console.log('Loaded test results:', testData); // Debug log

    if (!testData) {
        window.location.href = '/dashboard.html';
        return;
    }

    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);
    const mainContent = document.querySelector('.main-content');

    // For psychometric tests
    if (testData.type && ['big-five', 'mbti', 'eq', 'sjt'].includes(testData.type)) {
        console.log('Processing psychometric test:', testData.type); // Debug log

        if (!testData.insights) {
            console.error('No insights found in test data'); // Debug log
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h1 class="text-3xl font-bold mb-6">Test Results Unavailable</h1>
                    <p>Unable to load test results. Please try taking the test again.</p>
                    <div class="text-center mt-8">
                        <a href="/dashboard.html" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
                            Return to Dashboard
                        </a>
                    </div>
                </div>
            `;
            return;
        }

        // For MBTI test
        if (testData.type === 'mbti') {
            console.log('MBTI insights:', testData.insights); // Debug log

            // Extract personality type from insights
            const personalityType = testData.insights.insights[0].split(' - ')[0].split('is ')[1];
            const description = testData.insights.insights[0].split(' - ')[1];

            // Separate insights into categories
            const characteristics = testData.insights.insights.filter(insight => 
                insight.startsWith('•') && !insight.includes('prefer') && !insight.includes('career')
            );

            const preferences = testData.insights.insights.filter(insight => 
                insight.startsWith('•') && insight.includes('prefer')
            );

            const careers = testData.insights.insights.filter(insight => 
                insight.startsWith('•') && insight.includes('career')
            );

            mainContent.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <div class="mbti-results">
                        <div class="personality-type">
                            <h2>Your MBTI Type: ${personalityType}</h2>
                            <p>${description}</p>
                        </div>

                        <div class="characteristics-section">
                            <h3 class="section-title">Key Characteristics</h3>
                            ${characteristics.map(char => `
                                <div class="trait-card">
                                    <p>${char.replace('•', '')}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="preferences-section">
                            <h3 class="section-title">Your Preferences</h3>
                            ${preferences.map(pref => `
                                <div class="trait-card">
                                    <p>${pref.replace('•', '')}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="careers-section">
                            <h3 class="section-title">Recommended Career Paths</h3>
                            <div class="career-grid">
                                ${careers.map(career => `
                                    <div class="career-item">
                                        <p>${career.replace('•', '')}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="text-sm text-gray-600 mt-6">
                            Time taken: ${formatTime(timeSpent)}
                        </div>

                        <div class="text-center mt-8">
                            <a href="/dashboard.html" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
                                Return to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Default display for other psychometric tests
            mainContent.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h1 class="text-3xl font-bold mb-6">${testData.insights.category || 'Personality Assessment'}</h1>
                    <div class="bg-white rounded-lg shadow p-6">
                        ${testData.insights.insights.map(insight => `
                            <div class="insight-item mb-4 p-4 bg-gray-50 rounded-lg">
                                <p class="text-lg">${insight}</p>
                            </div>
                        `).join('')}

                        <div class="text-sm text-gray-600 mt-6">
                            Time taken: ${formatTime(timeSpent)}
                        </div>
                    </div>

                    <div class="text-center mt-8">
                        <a href="/dashboard.html" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
                            Return to Dashboard
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
            const reviewHtml = `
                <div class="review-item ${question.isCorrect ? 'correct' : 'incorrect'}">
                    <h3>Question ${index + 1}</h3>
                    <p>${question.question}</p>
                    ${question.code ? `<pre class="code-block"><code>${question.code}</code></pre>` : ''}
                    <div class="options">
                        ${question.options.map((option, i) => `
                            <div class="option 
                                ${i === question.correctAnswer ? 'correct' : ''} 
                                ${i === question.userAnswer ? 'selected' : ''}">
                                ${option}
                                ${i === question.correctAnswer ? ' ✓' : ''}
                                ${i === question.userAnswer && i !== question.correctAnswer ? ' ✗' : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="explanation">
                        <h4>Explanation:</h4>
                        <p>${question.explanation}</p>
                    </div>
                </div>
            `;
            reviewContent.innerHTML += reviewHtml;
        });
    }

    // Highlight code blocks if present
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});