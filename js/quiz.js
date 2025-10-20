import quizQuestions from './quiz-data.js';

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

const quizContainer = document.getElementById('quizContainer');
const scoreContainer = document.getElementById('scoreContainer');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
    answerSelected = false; 
    nextBtn.disabled = true; 

    if (currentQuestionIndex >= quizQuestions.length) {
        showScore();
        return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = `Vraag ${currentQuestionIndex + 1}/${quizQuestions.length}: ${currentQuestion.question}`;
    optionsContainer.innerHTML = ''; 

    if (currentQuestion.options && Array.isArray(currentQuestion.options)) {
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => handleAnswer(button, option, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    } else {
        optionsContainer.innerHTML = '<p style="color: red;">Fout: Antwoordopties ontbreken of zijn ongeldig.</p>';
    }
}

function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreText.textContent = `Je hebt ${score} van de ${quizQuestions.length} vragen correct!`;
}

function handleAnswer(selectedButton, selectedAnswer, correctAnswer) {
    if (answerSelected) return;
    answerSelected = true;
    nextBtn.disabled = false;
    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    Array.from(optionsContainer.children).forEach(button => {button.disabled = true;});
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);