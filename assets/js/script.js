let startButtonEl = document.querySelector("#start-button");
let mainEl = document.querySelector("#main");
let headerEl = document.querySelector("#header");
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
    if (timeLeft <= 0) {
        timeLeft = 0;
        timerEl.innerHTML = timeLeft;
        clearInterval(1);
        populateFinishQuiz();
    }
}

const startTimer = () => {
    timeLeft = 10;
    timerEl.innerHTML = timeLeft
    setInterval(updateTimerEl, 1000);
}

const populateFinishQuiz = () => {
    let resultEl = document.querySelector(".result");
    
    // Clear everything in main
    mainEl.innerHTML = "";

    let finWrapperEl = document.createElement("div");
    finWrapperEl.className = "fin-wrapper";

    let finTitleEl = document.createElement("div");
    finTitleEl.className = "fin-title title";
    finTitleEl.innerHTML = "All done!";
    finWrapperEl.appendChild(finTitleEl);

    let finScoreEl = document.createElement("div");
    finScoreEl.className = "fin-score";
    finScoreEl.innerHTML = `Your final score is ${timeLeft}.`;
    finWrapperEl.appendChild(finScoreEl);

    // Beginning form creation
    let formWrapperEl = document.createElement("div");
    let formEl = document.createElement("div");
    formEl.className = "form";

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.innerHTML = "Enter initials:";
    formEl.appendChild(labelEl);

    let inputEl = document.createElement("input");
    inputEl.className = "form-input";
    inputEl.id = "initials";
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("placeholder", "Your initials");
    inputEl.setAttribute("name", "initials");
    formEl.appendChild(inputEl);

    let buttonEl = document.createElement("button");
    buttonEl.className = "submit";
    buttonEl.id = "submit"
    buttonEl.innerHTML = "submit";
    formEl.appendChild(buttonEl);

    formWrapperEl.appendChild(formEl);
    finWrapperEl.appendChild(formWrapperEl);
    // End form creation
    finWrapperEl.appendChild(resultEl);

    mainEl.appendChild(finWrapperEl);
}

// Changes question
const changeQuestion = () => {
    if (!questions[questionIndex]) {
        clearInterval(1);
        populateFinishQuiz();
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
let checkAnswer = targetAnswer => {
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

const populateScoreTable = () => {
    let scoreData = JSON.parse(localStorage.getItem("scores"));

    // Clear main
    mainEl.innerHTML = "";

    let scoreWrapperEl = document.createElement("div");
    scoreWrapperEl.className = "high-scores-wrapper";
    
    let titleEl = document.createElement("div");
    titleEl.className = "fin-title title";
    titleEl.innerHTML = "High scores";
    scoreWrapperEl.appendChild(titleEl);

    let highScoreEl = document.createElement("div");
    highScoreEl.className = "high-scores";
    if (scoreData) {
        for (let i = 0; i < scoreData.length; i++) {
            let scoreEl = document.createElement("div");
            scoreEl.className = "fin-score";
            scoreEl.innerHTML = `${i + 1}. ${scoreData[i].initials} ${scoreData[i].score}`;
            highScoreEl.appendChild(scoreEl);
        }
    };
    scoreWrapperEl.appendChild(highScoreEl);

    let buttonWrapperEl = document.createElement("div");
    buttonWrapperEl.className = "high-buttons";
    let backButtonEl = document.createElement("button");
    backButtonEl.innerHTML = "Go back";
    backButtonEl.id = "back-button";
    buttonWrapperEl.appendChild(backButtonEl);
    let clearButtonEl = document.createElement("button");
    clearButtonEl.innerHTML = "Clear high scores";
    clearButtonEl.id = "clear-button";
    buttonWrapperEl.appendChild(clearButtonEl);
    scoreWrapperEl.appendChild(buttonWrapperEl);

    mainEl.appendChild(scoreWrapperEl);
}

const submitScore = name => {
    // Pull existing data
    let scoreDataUnparsed = localStorage.getItem("scores");
    let scoreData = null;
    if (scoreDataUnparsed) {
        scoreData = JSON.parse(scoreDataUnparsed);
    }

    // Create data arr
    let scoreDataArr = [];
    
    // Make obj for current session
    let scoreObj = {
        initials: name,
        score: timeLeft
    }

    if (scoreData) { // If there already was data stored, sort
        let placed = false;
        for (let i = 0; i < scoreData.length; i++) {
            if ((i + 1) === scoreData.length && !placed) {
                scoreDataArr.push(scoreData[i]);
                scoreDataArr.push(scoreObj);
            } else if (scoreData[i].score > scoreObj.score || placed) {
                scoreDataArr.push(scoreData[i]);
            } else if (scoreData[i].score <= scoreObj.score && !placed) {
                scoreDataArr.push(scoreObj);
                scoreDataArr.push(scoreData[i]);
                placed = true;
            }
        }
        console.log(scoreDataArr);
    } else { // If there was no data stored
        scoreDataArr.push(scoreObj);
    }
    
    localStorage.setItem("scores", JSON.stringify(scoreDataArr));

    populateScoreTable();
}

const buttonHandler = event => {
    
    const targetAnswer = event.target;
    if (targetAnswer.id === "answer") {
        checkAnswer(targetAnswer);
    } else if (targetAnswer.id === "submit") {
        let name = document.querySelector(".form-input").value;
        while (name) {
            submitScore(name);
            break;
        }
    } else if (targetAnswer.id === "view-scores") {
        populateScoreTable();
    } else if (targetAnswer.id === "back-button") {
        location.reload();
    } else if (targetAnswer.id === "clear-button") {
        localStorage.clear();
        populateScoreTable();
    }
}

startButtonEl.addEventListener("click", populateQuestion);
mainEl.addEventListener("click", buttonHandler);
headerEl.addEventListener("click", buttonHandler);