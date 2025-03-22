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

    const score = Math.round((testData.score / testData.questions.length) * 100);
    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);
    const correctAnswers = testData.score;
    const incorrectAnswers = testData.questions.length - testData.score;

    // Update score display
    document.getElementById('scorePercentage').textContent = `${score}%`;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('timeTaken').textContent = formatTime(timeSpent);

    // Add performance feedback
    let feedback = '';
    if (score >= 90) {
        feedback = 'Excellent! Keep up the great work!';
    } else if (score >= 70) {
        feedback = 'Good job! Focus on the topics you missed to improve further.';
    } else if (score >= 50) {
        feedback = 'You\'re on the right track. Review the topics you struggled with.';
    } else {
        feedback = 'Keep practicing! Review the material and try again.';
    }
    document.getElementById('performanceFeedback').textContent = feedback;

    // Show questions review
    const reviewContent = document.getElementById('reviewContent');
    testData.questions.forEach((question, index) => {
        const userAnswer = testData.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        const reviewHtml = `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h3>Question ${index + 1}</h3>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <div class="option ${i === question.correctAnswer ? 'correct' : ''} ${i === userAnswer ? 'selected' : ''}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
                <div class="explanation">
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;
        reviewContent.innerHTML += reviewHtml;
    });
});