// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Initialize results page
window.addEventListener('DOMContentLoaded', () => {
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    if (!testData) {
        window.location.href = '/dashboard.html';
        return;
    }

    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);

    // For psychometric tests, show a different layout
    if (testData.type && ['big-five', 'mbti', 'eq', 'sjt'].includes(testData.type)) {
        const mainContent = document.querySelector('.main-content');
        const insights = testData.insights || {};

        mainContent.innerHTML = `
            <div class="results-container p-6">
                <h1 class="text-3xl font-bold mb-6">${insights.category || 'Personality Assessment'}</h1>

                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div class="mb-4">
                        <p class="text-sm text-gray-600">Time taken: ${formatTime(timeSpent)}</p>
                    </div>

                    <div class="insights-section">
                        ${insights.insights ? insights.insights.map(insight => 
                            `<div class="insight-item mb-4 p-4 bg-gray-50 rounded-lg">
                                <p class="text-lg">${insight}</p>
                            </div>`
                        ).join('') : ''}
                    </div>

                    ${insights.recommendations ? `
                        <div class="recommendations-section mt-8">
                            <h3 class="text-xl font-semibold mb-4">Career Recommendations</h3>
                            ${insights.recommendations.map(rec => 
                                `<div class="recommendation-item mb-3 p-3 border-l-4 border-primary bg-gray-50 rounded-r-lg">
                                    <p>${rec}</p>
                                </div>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="text-center mt-8">
                    <a href="/dashboard.html" class="btn-primary px-6 py-2 rounded-lg">
                        Return to Dashboard
                    </a>
                </div>
            </div>
        `;
    } else {
        // For non-psychometric tests, show the regular score display
        const correctAnswers = testData.questions.filter(q => q.isCorrect).length;
        const incorrectAnswers = testData.questions.length - correctAnswers;

        document.getElementById('scorePercentage').textContent = `${testData.score}%`;
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