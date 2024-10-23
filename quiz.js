const categories = {
    "General Knowledge": [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Jupiter", correct: false },
                { text: "Mars", correct: true },
                { text: "Venus", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: [
                { text: "Vincent van Gogh", correct: false },
                { text: "Pablo Picasso", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Michelangelo", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        {
            question: "Which country is home to the kangaroo?",
            answers: [
                { text: "New Zealand", correct: false },
                { text: "South Africa", correct: false },
                { text: "Australia", correct: true },
                { text: "Brazil", correct: false }
            ]
        }
    ],
    "Technology": [
        {
            question: "Which company created the iPhone?",
            answers: [
                { text: "Samsung", correct: false },
                { text: "Google", correct: false },
                { text: "Apple", correct: true },
                { text: "Microsoft", correct: false }
            ]
        },
        {
            question: "What does CPU stand for?",
            answers: [
                { text: "Central Processing Unit", correct: true },
                { text: "Computer Personal Unit", correct: false },
                { text: "Central Process Unit", correct: false },
                { text: "Central Processor Unit", correct: false }
            ]
        },
        {
            question: "Which programming language is known as the 'mother of all languages'?",
            answers: [
                { text: "Java", correct: false },
                { text: "C", correct: true },
                { text: "Python", correct: false },
                { text: "JavaScript", correct: false }
            ]
        },
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hypertext Markup Language", correct: true },
                { text: "Hypertext Markdown Language", correct: false },
                { text: "Hypertext Machine Language", correct: false },
                { text: "Hightext Markup Language", correct: false }
            ]
        },
        {
            question: "Which company owns Android?",
            answers: [
                { text: "Apple", correct: false },
                { text: "Microsoft", correct: false },
                { text: "Google", correct: true },
                { text: "Samsung", correct: false }
            ]
        }
    ],
    "Science": [
        {
            question: "What is the chemical symbol for gold?",
            answers: [
                { text: "Ag", correct: false },
                { text: "Au", correct: true },
                { text: "Fe", correct: false },
                { text: "Cu", correct: false }
            ]
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: [
                { text: "Diamond", correct: true },
                { text: "Titanium", correct: false },
                { text: "Quartz", correct: false },
                { text: "Platinum", correct: false }
            ]
        },
        {
            question: "Which planet has the most moons?",
            answers: [
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: true },
                { text: "Uranus", correct: false },
                { text: "Neptune", correct: false }
            ]
        },
        {
            question: "What is the main function of white blood cells?",
            answers: [
                { text: "Carry oxygen", correct: false },
                { text: "Fight infections", correct: true },
                { text: "Produce antibodies", correct: false },
                { text: "Clot blood", correct: false }
            ]
        },
        {
            question: "What is the speed of light?",
            answers: [
                { text: "299,792 kilometers per second", correct: true },
                { text: "300,000 kilometers per second", correct: false },
                { text: "199,792 kilometers per second", correct: false },
                { text: "250,000 kilometers per second", correct: false }
            ]
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = null;

const categorySelectionElement = document.getElementById("category-selection");
const categoryButtonsElement = document.getElementById("category-buttons");
const questionBoxElement = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBoxElement = document.getElementById("result-box");
const scoreDisplayElement = document.getElementById("score-display");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

function startQuiz() {
    categorySelectionElement.classList.remove("hide");
    questionBoxElement.classList.add("hide");
    resultBoxElement.classList.add("hide");
    nextButton.classList.add("hide");
    score = 0;
    currentQuestionIndex = 0;
    showCategories();
}

function showCategories() {
    Object.keys(categories).forEach(category => {
        const button = document.createElement("li");
        button.innerText = category;
        button.classList.add("btn", "category-btn");
        button.addEventListener("click", () => selectCategory(category));
        categoryButtonsElement.appendChild(button);
    });
}

function selectCategory(category) {
    selectedCategory = category;
    categorySelectionElement.classList.add("hide");
    questionBoxElement.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = categories[selectedCategory][currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("li");
        button.innerText = answer.text;
        button.classList.add("btn", "answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    updateProgressBar();
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(selectedButton, correct);
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function showResult() {
    questionBoxElement.classList.add("hide");
    resultBoxElement.classList.remove("hide");
    scoreDisplayElement.innerText = `Your score: ${score}/${categories[selectedCategory].length}`;
    nextButton.classList.add("hide");
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / categories[selectedCategory].length) * 100;
    progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < categories[selectedCategory].length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    categoryButtonsElement.innerHTML = '';
    startQuiz();
});

startQuiz();
