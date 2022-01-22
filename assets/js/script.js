let startButtonEl = document.querySelector("#start-button");
let mainEl = document.querySelector("#main");
let timerEl = document.querySelector("#timer");
let timeLeft = 0;
let questionIndex = 0;
let finalScore = 0;

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "_numbers"
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ___________.",
        answers: [
            "quotes",
            "curly brackets",
            "_parenthesis",
            "square brackets"
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "_all of the above"
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "_quotes",
            "parenthesis"
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "_console.log"
        ]
    },

];

const updateTimerEl = () => {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft === 0) {
        clearInterval(1);
    }
}

const startTimer = () => {
    timeLeft = 100;
    timerEl.innerHTML = timeLeft
    setInterval(updateTimerEl, 1000);
}

// Changes question
const changeQuestion = () => {
    if (!questions[questionIndex]) {
        console.log("Finised quuiz!!!!");
        return;
    }

    let questionObj = questions[questionIndex];
    let questionEl = document.querySelector(".question");
    
    questionEl.innerHTML = questionObj.question;

    for (let i = 0; i < 4; i++) {
        let buttonEl = document.querySelector("button[data-id='" + (i + 1) + "']");
        buttonEl.setAttribute("data-answer", "false");

        if (questionObj.answers[i][0] === "_") {
            buttonEl.setAttribute("data-answer", "true");
            let answer = questionObj.answers[i].substring(1);
            buttonEl.innerHTML = `${i + 1}. ${answer}`
        } else {
            buttonEl.innerHTML = `${i + 1}. ` + questionObj.answers[i];
        }
    }
    
    questionIndex++;
}

// Start game populate w/ elements
const populateQuestion = () => {
    // Clear everything in main
    mainEl.innerHTML = "";

    startTimer();

    // Create the question elements
    let questionWrapperEl = document.createElement("div");
    questionWrapperEl.className = "question-wrapper";

    let questionEl = document.createElement("div");
    questionEl.className = "question";
    questionWrapperEl.appendChild(questionEl);

    let answersEl = document.createElement("div");
    answersEl.className = "answers";
    for (let i = 0; i < 4; i++) {
        let button = document.createElement("button");
        button.id = "answer";
        button.setAttribute("data-id", `${i + 1}`);
        button.setAttribute("data-answer", "false");
        button.innerHTML = `${i + 1}. `;
        answersEl.appendChild(button);
    }
    questionWrapperEl.appendChild(answersEl);

    let resultEl = document.createElement("div");
    resultEl.className = "result";
    resultEl.innerHTML = "";
    resultEl.style.display = "none";
    questionWrapperEl.appendChild(resultEl);

    // Append entire wrapper to main
    mainEl.appendChild(questionWrapperEl);

    // Add question data to the elements
    changeQuestion();
}

let hideResult = () => {
    let resultEl = document.querySelector(".result");
    resultEl.style.display = "none";
}

// Displays result el for 3 seconds
let displayResult = result => {
    let resultEl = document.querySelector(".result");
    resultEl.style.display = "block";
    resultEl.innerHTML = "<em>" + result + "</em>"

    setTimeout(hideResult, 1000);
}

// Checks if answer is correct
let checkAnswer = event => {
    let targetAnswer = event.target;
    // Exit funtion if not an answer button
    if (targetAnswer.id !== "answer") {
        return;
    }

    if (targetAnswer.getAttribute("data-answer") === "true") {
        displayResult("Correct!");
        changeQuestion();
    } else if (targetAnswer.getAttribute("data-answer") === "false") {
        displayResult("Wrong!");
        timeLeft = Math.max(0, timeLeft - 10);
        timerEl.innerHTML = timeLeft;
        changeQuestion();
    }
}

startButtonEl.addEventListener("click", populateQuestion);
mainEl.addEventListener("click", checkAnswer);