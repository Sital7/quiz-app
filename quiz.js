const questions = [
    {
        question: "What does CSS stand for?",
        answers:[
            {text:"Cascading Style Sheets", correct:true},
            {text:"Colorful Style Sheets", correct:false},
            {text:"Creative Style Sheets", correct:false},
            {text:"Computer Style Sheets", correct:false},
        ] 
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        answers:[
            {text:"getElementById()", correct:true},
            {text:"querySelector()", correct:false},
            {text:"getElementsByClassName()", correct:false},
            {text:"getElementByTagName()", correct:false},
        ] 
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        answers:[
            {text:"To define the main content of the webpage", correct:false},
            {text:"To contain metadata and links to resources", correct:true},
            {text:"To display the title of the webpage", correct:false},
            {text:"To create the footer section", correct:false},
        ] 
    },
    {
        question: "Which CSS property is used to change the text color?",
        answers:[
            {text:"text-color", correct:false},
            {text:"font-color", correct:false},
            {text:"color", correct:true},
            {text:"text-style", correct:false},
        ] 
    },
    {
        question: "What does DOM stand for in web development?",
        answers:[
            {text:"Document Object Model", correct:true},
            {text:"Data Object Manager", correct:false},
            {text:"Document Object Management", correct:false},
            {text:"Data Object Model", correct:false},
        ] 
    },

    {
        question: "What is the purpose of the flex-grow property in CSS Flexbox?",
        answers: [
            { "text": "Specifies how much a flex item will shrink", "correct": false },
            { "text": "Specifies how much a flex item will grow relative to others", "correct": true },
            { "text": "Specifies the default size of a flex item", "correct": false },
            { "text": "Specifies the order of a flex item", "correct": false }
        ]
        
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        answers:[
            {text:"only var", correct:false},
            {text:"only let", correct:false},
            {text:"only const", correct:false},
            {text:"All of the above", correct:true},
        ] 
    },
    {
        question: "Which of these is a JavaScript framework/library?",
        answers:[
            { "text": "Django", "correct": false },
            { "text": "Angular", "correct": true },
            { "text": "Laravel", "correct": false },
            { "text": "Spring", "correct": false }
        ]
        
    },
    {
        question: "Which HTTP method is used to submit data to a server?",
        answers:[
            {text:"GET", correct:false},
            {text:"POST", correct:true},
            {text:"PUT", correct:false},
            {text:"DELETE", correct:false},
        ] 
    },
    {
        question: "What is the default position value in CSS?",
        answers:[
            {text:"relative", correct:false},
            {text:"absolute", correct:false},
            {text:"static", correct:true},
            {text:"fixed", correct:false},
        ] 
    }
];




const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");  
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.ariaDisabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display  = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
