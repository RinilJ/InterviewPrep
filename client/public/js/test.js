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

function calculateMBTIScores(answers, questions) {
    // Initialize dichotomy scores
    const scores = {
        EI: 0, // Extraversion vs Introversion
        SN: 0, // Sensing vs Intuition
        TF: 0, // Thinking vs Feeling
        JP: 0  // Judging vs Perceiving
    };

    // Process each answer based on its subcategory
    questions.forEach((question, index) => {
        const answer = answers[index];
        if (answer === null) return; // Skip unanswered questions

        switch(question.subcategory) {
            case 'IE':
                scores.EI += answer;
                break;
            case 'SN':
                scores.SN += answer;
                break;
            case 'TF':
                scores.TF += answer;
                break;
            case 'JP':
                scores.JP += answer;
                break;
        }
    });

    // Return array of scores in the order expected by the server
    return [
        scores.EI / 3, // Average score for E/I
        scores.SN / 3, // Average score for S/N
        scores.TF / 3, // Average score for T/F
        scores.JP / 3  // Average score for J/P
    ];
}

async function submitTest() {
    clearInterval(timer);
    saveCurrentAnswer();

    try {
        // Format test results based on test type
        let testResults = {};

        // For psychometric tests (MBTI, Big Five), don't calculate score
        if (['mbti', 'big-five', 'eq'].includes(currentTest.type)) {
            testResults = {
                testId: currentTest.id || `${currentTest.type}-assessment`,
                type: currentTest.type,
                answers: currentTest.answers,
                score: -1, // Special value to indicate psychometric test
                testData: { score: -1 }
            };
        } else {
            // For technical and aptitude tests, calculate score normally
            let correctAnswers = 0;
            currentTest.questions.forEach((question, index) => {
                if (currentTest.answers[index] === question.correctAnswer) {
                    correctAnswers++;
                }
            });

            const score = Math.round((correctAnswers / currentTest.questions.length) * 100);
            testResults = {
                testId: currentTest.id,
                type: currentTest.type,
                score: score,
                answers: currentTest.answers,
                testData: { score }
            };
        }

        console.log('Submitting test results:', testResults);

        // Submit test results
        const response = await fetch('/api/test-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testResults)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit test results: ${errorText}`);
        }

        // Get the response data which includes insights for psychometric tests
        const responseData = await response.json();
        console.log('Server response:', responseData);

        // Prepare questions with isCorrect property for results display
        const questionsWithResults = currentTest.questions.map((question, index) => {
            return {
                ...question,
                isCorrect: currentTest.answers[index] === question.correctAnswer,
                userAnswer: currentTest.answers[index]
            };
        });
        
        // Store results for the results page
        const resultsData = {
            ...responseData,
            startTime: currentTest.startTime,
            endTime: new Date().toISOString(),
            questions: questionsWithResults,
            type: currentTest.type
        };

        console.log('Storing test results:', resultsData);
        sessionStorage.setItem('testResults', JSON.stringify(resultsData));

        // Clear current test data
        sessionStorage.removeItem('currentTest');

        // Redirect to results page
        window.location.href = '/test-results.html';
    } catch (error) {
        console.error('Error submitting test:', error);

        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = error.message || 'Failed to submit test results. Please try again.';

        const container = document.querySelector('.test-container');
        // Remove any existing error messages
        const existingError = container.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        container.prepend(errorDiv);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
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

function calculateMBTIScores(answers, questions) {
    // Initialize dichotomy scores
    const scores = {
        EI: 0, // Extraversion vs Introversion
        SN: 0, // Sensing vs Intuition
        TF: 0, // Thinking vs Feeling
        JP: 0  // Judging vs Perceiving
    };

    // Process each answer based on its subcategory
    questions.forEach((question, index) => {
        const answer = answers[index];
        if (answer === null) return; // Skip unanswered questions

        switch(question.subcategory) {
            case 'IE':
                scores.EI += answer;
                break;
            case 'SN':
                scores.SN += answer;
                break;
            case 'TF':
                scores.TF += answer;
                break;
            case 'JP':
                scores.JP += answer;
                break;
        }
    });

    // Return array of scores in the order expected by the server
    return [
        scores.EI / 3, // Average score for E/I
        scores.SN / 3, // Average score for S/N
        scores.TF / 3, // Average score for T/F
        scores.JP / 3  // Average score for J/P
    ];
}