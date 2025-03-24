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

    // Check if this is a psychometric test
    if (testData.type && ['big-five', 'mbti', 'eq', 'sjt'].includes(testData.type)) {
        // Hide all score-related elements
        document.getElementById('scorePercentage').style.display = 'none';
        document.getElementById('scoreSection').style.display = 'none';
        document.getElementById('reviewSection').style.display = 'none';

        // Show insights section with a different layout
        const mainContent = document.querySelector('.main-content');
        const insights = testData.insights || {};

        mainContent.innerHTML = `
            <div class="results-container">
                <h1 class="text-3xl font-bold mb-6">${insights.category || 'Personality Assessment'}</h1>

                <div class="insights-section bg-white p-6 rounded-lg shadow-sm">
                    <div class="insights-list space-y-4">
                        ${insights.insights ? insights.insights.map(insight => 
                            `<p class="insight-item">${insight}</p>`
                        ).join('') : ''}
                    </div>

                    ${insights.recommendations ? `
                        <div class="recommendations-list mt-8">
                            <h3 class="text-xl font-semibold mb-4">Career Recommendations</h3>
                            ${insights.recommendations.map(rec => 
                                `<p class="recommendation-item">${rec}</p>`
                            ).join('')}
                        </div>
                    ` : ''}

                    <div class="mt-6 text-sm text-gray-600">
                        Time taken: ${formatTime(timeSpent)}
                    </div>
                </div>

                <div class="mt-8 text-center">
                    <a href="/dashboard.html" class="btn-primary">
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