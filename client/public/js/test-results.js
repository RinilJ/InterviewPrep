// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Function to get performance feedback based on score
function getPerformanceFeedback(score) {
    if (score >= 90) {
        return {
            message: "Excellent performance! You've demonstrated a strong understanding of the concepts.",
            suggestions: [
                "Consider exploring more advanced topics",
                "Try solving problems with additional constraints",
                "Help others learn these concepts"
            ]
        };
    } else if (score >= 70) {
        return {
            message: "Good job! You have a solid grasp of the fundamentals.",
            suggestions: [
                "Review the questions you missed",
                "Practice similar problems to reinforce concepts",
                "Focus on understanding the explanations for incorrect answers"
            ]
        };
    } else if (score >= 50) {
        return {
            message: "You're making progress! Keep practicing to improve your understanding.",
            suggestions: [
                "Review the core concepts covered in the test",
                "Take notes on the explanations for questions you missed",
                "Consider revisiting the learning materials"
            ]
        };
    } else {
        return {
            message: "Keep practicing! Everyone starts somewhere, and with dedication, you'll improve.",
            suggestions: [
                "Focus on understanding the basic concepts first",
                "Take your time with each question and understand the explanations",
                "Consider seeking additional learning resources or help"
            ]
        };
    }
}

// Initialize results page
window.addEventListener('DOMContentLoaded', () => {
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    if (!testData) {
        window.location.href = '/dashboard.html';
        return;
    }

    const timeSpent = Math.round((new Date(testData.endTime) - new Date(testData.startTime)) / 1000);
    const correctAnswers = testData.questions.filter(q => q.isCorrect).length;
    const incorrectAnswers = testData.questions.length - correctAnswers;

    // Update score display
    document.getElementById('scorePercentage').textContent = `${testData.score}%`;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('timeTaken').textContent = formatTime(timeSpent);

    // Add performance feedback
    const feedback = getPerformanceFeedback(testData.score);
    const feedbackHtml = `
        <h3 class="mb-2 font-semibold">${feedback.message}</h3>
        <ul class="list-disc ml-4">
            ${feedback.suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;
    document.getElementById('performanceFeedback').innerHTML = feedbackHtml;

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

    // Highlight code blocks if present
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});