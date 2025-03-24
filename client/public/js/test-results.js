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
        mainContent.innerHTML = `
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold mb-6">Test Insights</h1>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="text-sm text-gray-600 mb-4">
                        Time taken: ${formatTime(timeSpent)}
                    </div>

                    <div class="mt-6">
                        <p class="text-lg mb-4">
                            Keep practicing! Everyone starts somewhere, and with dedication, you'll improve.
                        </p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Focus on understanding the basic concepts first</li>
                            <li>Take your time to reflect on each response</li>
                            <li>Consider seeking additional guidance if needed</li>
                        </ul>
                    </div>
                </div>

                <div class="text-center mt-8">
                    <a href="/dashboard.html" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
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