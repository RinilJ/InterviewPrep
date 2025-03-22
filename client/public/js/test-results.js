// Function to format time duration
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

// Function to generate performance feedback
function generateFeedback(score, timeSpent) {
    let feedback = '';
    
    if (score >= 90) {
        feedback = `
            <p class="feedback-excellent">
                <i class="fas fa-star"></i> Excellent Performance! You've demonstrated outstanding knowledge in this topic.
                Keep up the great work!
            </p>
        `;
    } else if (score >= 70) {
        feedback = `
            <p class="feedback-good">
                <i class="fas fa-thumbs-up"></i> Good job! You have a solid understanding of the material.
                Focus on the topics you missed to improve further.
            </p>
        `;
    } else if (score >= 50) {
        feedback = `
            <p class="feedback-average">
                <i class="fas fa-arrow-right"></i> You're on the right track, but there's room for improvement.
                Review the topics you struggled with and try again.
            </p>
        `;
    } else {
        feedback = `
            <p class="feedback-needs-improvement">
                <i class="fas fa-books"></i> This topic needs more attention.
                Consider reviewing the material and practicing more before retaking the test.
            </p>
        `;
    }

    const timePerQuestion = Math.round(timeSpent / 10); // Assuming 10 questions
    if (timePerQuestion > 120) { // More than 2 minutes per question
        feedback += `
            <p class="feedback-time">
                <i class="fas fa-clock"></i> Try to improve your speed while maintaining accuracy.
                Aim to spend less time on each question.
            </p>
        `;
    }

    return feedback;
}

// Function to display test review
function reviewTest() {
    const reviewSection = document.getElementById('answersReview');
    const reviewContent = document.getElementById('reviewContent');
    const testData = JSON.parse(sessionStorage.getItem('testResults'));
    
    if (!testData) {
        reviewContent.innerHTML = '<p class="error">Test data not available.</p>';
        return;
    }

    reviewSection.classList.toggle('hidden');
    
    if (reviewSection.classList.contains('hidden')) {
        return;
    }

    let reviewHtml = '<div class="questions-review">';
    testData.questions.forEach((question, index) => {
        const userAnswer = testData.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        reviewHtml += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <span class="result-indicator">
                        <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
                        ${isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                <p class="question-text">${question.question}</p>
                <div class="options-review">
                    ${question.options.map((option, optIndex) => `
                        <div class="option ${optIndex === question.correctAnswer ? 'correct-answer' : ''} 
                                         ${optIndex === userAnswer ? 'user-answer' : ''}">
                            ${option}
                            ${optIndex === question.correctAnswer ? 
                                '<i class="fas fa-check"></i>' : 
                                (optIndex === userAnswer && userAnswer !== question.correctAnswer ? 
                                    '<i class="fas fa-times"></i>' : '')}
                        </div>
                    `).join('')}
                </div>
                <div class="explanation">
                    <i class="fas fa-info-circle"></i>
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;
    });
    reviewHtml += '</div>';
    
    reviewContent.innerHTML = reviewHtml;
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
    document.getElementById('performanceFeedback').innerHTML = generateFeedback(score, timeSpent);

    // Add score-based styling
    const scoreCircle = document.querySelector('.score-circle');
    if (score >= 90) {
        scoreCircle.classList.add('excellent');
    } else if (score >= 70) {
        scoreCircle.classList.add('good');
    } else if (score >= 50) {
        scoreCircle.classList.add('average');
    } else {
        scoreCircle.classList.add('needs-improvement');
    }
});
