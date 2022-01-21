let startButton = document.querySelector("#start-button");
let main = document.querySelector("#main");
let questionIndex = 0;

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

// Changes question
const changeQuestion = () => {
    let questionObj = questions[questionIndex];
    let questionEl = document.querySelector(".question");
    
    questionEl.innerHTML = questionObj.question;

    for (let i = 0; i < 4; i++) {
        let buttonEl = document.querySelector("button[data-id='" + (i + 1) + "']");

        console.log(buttonEl);

        if (questionObj.answers[i][0] === "_") {
            buttonEl.setAttribute("answer", "true");
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
    main.innerHTML = "";

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
        button.setAttribute("data-id", `${i + 1}`);
        button.setAttribute("answer", "false");
        button.innerHTML = `${i + 1}. `;
        answersEl.appendChild(button);
    }
    questionWrapperEl.appendChild(answersEl);

    let resultEl = document.createElement("div");
    resultEl.className = "result";
    resultEl.innerHTML = "<em id='result'>Correct!</em>";
    resultEl.style.display = "none";
    questionWrapperEl.appendChild(resultEl);

    // Append entire wrapper to main
    main.appendChild(questionWrapperEl);

    // Add question data to the elements
    changeQuestion();
}

startButton.addEventListener("click", function() {
    populateQuestion();
})