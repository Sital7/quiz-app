const questions = [
    {
        question: "Which property in CSS is used to set the text alignment?",
        options: ["text-align", "align", "text-style", "alignment"],
        answer: 0
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: [
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');",
            "alertBox('Hello World');"
        ],
        answer: 1
    },
    
    {
        question: "Which CSS property is used to make the text bold?",
        options: ["font-style", "font-weight", "text-decoration", "text-style"],
        answer: 1
    },
    {
        question: "What does the `console.log()` function do in JavaScript?",
        options: [
            "Displays a dialog box",
            "Writes a message to the console",
            "Shows an alert",
            "Logs the user out"
        ],
        answer: 1
    },
    {
        question: "Which HTML attribute is used to specify a unique identifier for an element?",
        options: ["id", "class", "name", "unique"],
        answer: 0
    },
    {
        question: "What is the correct way to comment in CSS?",
        options: [
            "// This is a comment",
            "&lt;!-- This is a comment --&gt;",
            "/* This is a comment */",
            "# This is a comment"
        ],
        answer: 2
    },
    {
        question: "Which method is used to add a new element to an array in JavaScript?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: 0
    },
    {
        question: "Which CSS property is used to control the spacing between elements?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        answer: 0
    },
    {
        // in this options were inclosed in <>
        question: "Which HTML element is used to display a scalar measurement within a range?",
        options: ["&lt; progress &gt;", 
                  "&lt; meter &gt;", 
                  "&lt; input type='range'&gt;", 
                  "&lt; output &gt;"],
        answer: 1
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    }
    
];

let currentQuestionIndex = 0;
let userAnswers = [];

const startScreen = document.querySelector(".start-screen");
const quizContainer = document.querySelector(".quiz-container");
const questionContainer = document.getElementById("question-container");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const scoreContainer = document.getElementById("score-container");
const answersContainer = document.getElementById("answers-container");

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <ul class="options">
                ${questionData.options
                    .map(
                        (option, index) => `
                            <li data-index="${index}">
                                ${option}
                            </li>
                        `
                    )
                    .join("")}
            </ul>
        </div>
    `;

    document.querySelectorAll(".options li").forEach((option) => {
        option.addEventListener("click", () => selectOption(option));
    });
}

function selectOption(optionElement) {
    const options = document.querySelectorAll(".options li");
    options.forEach((option) => option.classList.remove("selected"));
    optionElement.classList.add("selected");
    userAnswers[currentQuestionIndex] = parseInt(optionElement.dataset.index);
}

function showResults() {
    let score = 0;
    scoreContainer.innerHTML = "";
    answersContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        if (isCorrect) score++;

        
        const optionsHtml = question.options
            .map((option, i) => {
                let className = "";
                if (i === question.answer) className = "correct";
                if (i === userAnswers[index] && i !== question.answer) className = "incorrect";

                return `<li class="${className}">${option}</li>`;
            })
            .join("");

        answersContainer.innerHTML += `
            <div class="result-item">
                <h4>${index + 1}. ${question.question}</h4>
                <ul class="options">${optionsHtml}</ul>
            </div>
        `;
    });

    scoreContainer.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;
}

submitBtn.addEventListener("click", () => {
    const selectedAnswer = userAnswers[currentQuestionIndex];
    if (selectedAnswer === undefined) {
        alert("Please select an answer before proceeding!");
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        document.querySelector(".quiz").style.display = "none";
        document.querySelector(".results").style.display = "block";
        answersContainer.style.overflowY = "auto";
        answersContainer.style.maxHeight = "300px";
        showResults();
    }
});

retryBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.querySelector(".quiz").style.display = "block";
    document.querySelector(".results").style.display = "none";
    loadQuestion();
});

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "flex";
    loadQuestion();
});


loadQuestion();



