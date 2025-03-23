// Test functionality implementation
let currentTest = null;
let timer = null;

// Initialize test when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTest();
});

function initializeTest() {
    // Load test from session storage
    const testData = sessionStorage.getItem('currentTest');
    if (!testData) {
        window.location.href = '/dashboard.html';
        return;
    }

    currentTest = JSON.parse(testData);
    if (!currentTest || !currentTest.questions || currentTest.questions.length === 0) {
        window.location.href = '/dashboard.html';
        return;
    }

    // Initialize answers array if not present
    if (!currentTest.answers) {
        currentTest.answers = new Array(currentTest.questions.length).fill(null);
    }

    // Set up timer
    startTimer(currentTest.timeLimit || 3600); // Default 1 hour if not specified

    // Set test title
    document.getElementById('testTitle').textContent = currentTest.title;

    // Display first question
    displayQuestion(currentTest.currentQuestionIndex || 0);

    // Set up navigation buttons
    setupNavigation();
}

function displayQuestion(index) {
    const question = currentTest.questions[index];
    const container = document.getElementById('questionContainer');

    container.innerHTML = `
        <div class="question-header">
            <h2>Question ${index + 1} of ${currentTest.questions.length}</h2>
            <div class="timer" id="timer"></div>
        </div>
        <div class="question-content">
            <p class="question-text">${question.question}</p>
            ${question.code ? `<pre class="code-block"><code>${question.code}</code></pre>` : ''}
            <div class="options-list">
                ${question.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" 
                            name="answer" 
                            id="option${i}" 
                            value="${i}"
                            ${currentTest.answers[index] === i ? 'checked' : ''}>
                        <label for="option${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update navigation button states
    updateNavigationButtons(index);

    // Update progress bar
    const progress = ((index + 1) / currentTest.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Save current index
    currentTest.currentQuestionIndex = index;
    sessionStorage.setItem('currentTest', JSON.stringify(currentTest));

    // Highlight code if present
    if (question.code) {
        hljs.highlightAll();
    }
}

function setupNavigation() {
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    const submitBtn = document.getElementById('submitButton');

    prevBtn.addEventListener('click', () => {
        saveCurrentAnswer();
        if (currentTest.currentQuestionIndex > 0) {
            displayQuestion(currentTest.currentQuestionIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        saveCurrentAnswer();
        if (currentTest.currentQuestionIndex < currentTest.questions.length - 1) {
            displayQuestion(currentTest.currentQuestionIndex + 1);
        }
    });

    submitBtn.addEventListener('click', submitTest);
}

function updateNavigationButtons(index) {
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    const submitBtn = document.getElementById('submitButton');

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === currentTest.questions.length - 1;
    submitBtn.style.display = index === currentTest.questions.length - 1 ? 'block' : 'none';
}

function saveCurrentAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        currentTest.answers[currentTest.currentQuestionIndex] = parseInt(selectedOption.value);
        sessionStorage.setItem('currentTest', JSON.stringify(currentTest));
    }
}

function startTimer(seconds) {
    const timerDisplay = document.getElementById('timer');
    let timeLeft = seconds;

    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            submitTest();
        }
        timeLeft--;
    }, 1000);
}

async function submitTest() {
    if (!confirm('Are you sure you want to submit the test?')) {
        return;
    }

    saveCurrentAnswer();
    clearInterval(timer);

    // Calculate score and store results
    let correctAnswers = 0;
    const results = {
        questions: currentTest.questions.map((question, index) => ({
            ...question,
            userAnswer: currentTest.answers[index],
            isCorrect: currentTest.answers[index] === question.correctAnswer
        })),
        startTime: currentTest.startTime,
        endTime: new Date().toISOString(),
        category: currentTest.category,
        language: currentTest.language
    };

    results.questions.forEach(question => {
        if (question.isCorrect) correctAnswers++;
    });

    const score = Math.round((correctAnswers / currentTest.questions.length) * 100);
    results.score = score;

    try {
        // Submit test result
        const response = await fetch('/api/test-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                testId: currentTest.id,
                score: score,
                answers: currentTest.answers
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit test results');
        }

        // Store results for the results page
        sessionStorage.setItem('testResults', JSON.stringify(results));

        // Clear current test data and redirect to results page
        sessionStorage.removeItem('currentTest');
        window.location.href = '/test-results.html';
    } catch (error) {
        console.error('Error submitting test:', error);
        // Show error in a less intrusive way
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Failed to submit test results. Please try again.';
        document.querySelector('.test-container').prepend(errorDiv);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}