const questions = [
    {
        question: "What is the proper way of returning the value of PI?",
        answers: [
                {text: "Math.java", correct: false},
                {text: "PI.java", correct: false},
                {text: "Math.PI", correct: true},
                {text: "verify PI", correct: false},
            
        ]
    },
    {
        question: "What is needed to create a java file?",
        answers: [
                {text: ".js", correct: true},
                {text: ".java", correct: false},
                {text: ".jv", correct: false},
                {text: ".ja", correct: false},
            
        ]
    },
    {
        question: "The proper way to write comments for a single line?",
        answers: [
                {text: "//", correct: true},
                {text: "/* */", correct: false},
                {text: "<!--", correct: false},
                {text: "#", correct: false},
            
        ]
    },
    {
        question: "The proper way to write comments for multiple lines?",
        answers: [
                {text: "//", correct: false},
                {text: "/* */", correct: true},
                {text: "<!--", correct: false},
                {text: "#", correct: false},
            
        ]
    },
    {
        question: "What keyword declares a block variable?",
        answers: [
                {text: "let", correct: true},
                {text: "var", correct: false},
                {text: "const", correct: false},
                {text: "for", correct: false},
            
        ]
    },
    {
        question: "What keyword exists a function?",
        answers: [
                {text: "var", correct: false},
                {text: "function", correct: false},
                {text: "for", correct: false},
                {text: "return", correct: true},
            
        ]
    },
    {
        question: "Which backslash escape character turns the string into a double quote?",
        answers: [
                {text: "\'", correct: false},
                {text: "\\", correct: false},
                {text: "\"", correct: true},
                {text: "\!", correct: false},
            
        ]
    },
    {
        question: "What type of number type does javascript use?",
        answers: [
                {text: "int (32-bit)", correct: false},
                {text: "double (64-bit floating point)", correct: true},
                {text: "float (32-bit)", correct: false},
                {text: "long (64-bit)", correct: false},
            
        ]
    },
    {
        question: "The correct characters to use for an array?",
        answers: [
                {text: "[]", correct: true},
                {text: "{}", correct: false},
                {text: "<>", correct: false},
                {text: "//", correct: false},
            
        ]
    },
    {
        question: "Which comparison is equal value and equal type?",
        answers: [
                {text: "==", correct: false},
                {text: "===", correct: true},
                {text: "!=", correct: false},
                {text: "!==", correct: false},
            
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("Ansbtn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();