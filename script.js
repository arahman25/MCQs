// Define an array to store the questions, choices, and answers
var questions = [
{
    question: "How are you?",
    choices: ["Ahmed", "Ali"],
    correctAnswer: "Ali"
},
{
    question: "Where are you?",
    choices: ["Cairo", "Alex"],
    correctAnswer: "Cairo"
}
];

// Define global variables
var currentQuestion = 0;
var selectedTeam;
var score = {
dash: 0,
hanafy: 0,
moustafa: 0,
essawy: 0
};
var timer;

// Function to start the quiz
function startQuiz() {
// Hide the team selection and show the quiz
var teamSelectionEl = document.getElementById("team-selection");
teamSelectionEl.style.display = "none";
var quizEl = document.getElementById("quiz");
quizEl.style.display = "block";

// Get the selected team
var teamDropdownEl = document.getElementById("team-dropdown");
selectedTeam = teamDropdownEl.value;

// Display the first question
displayQuestion();
}

// Function to display the current question
function displayQuestion() {
// Update the question number
var questionNumberEl = document.getElementById("question-number");
questionNumberEl.textContent = currentQuestion + 1;

// Get the current question and choices
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var question = questions[currentQuestion].question;
var choices = questions[currentQuestion].choices;

// Update the question and choices on the screen
questionEl.textContent = question;
choicesEl.innerHTML = "";
for (var i = 0; i < choices.length; i++) {
    var choiceEl = document.createElement("button");
    choiceEl.textContent = choices[i];
    choiceEl.setAttribute("value", choices[i]);
    choiceEl.onclick = selectAnswer;
    choicesEl.appendChild(choiceEl);
}

// Show the quiz and start the timer
var quizEl = document.getElementById("quiz");
quizEl.style.display = "block";
startTimer();
}

// Function to select an answer
function selectAnswer() {
// Stop the timer
clearInterval(timer);

// Check if the answer is correct
var selectedAnswer = this.value;
var correctAnswer = questions[currentQuestion].correctAnswer;
if (selectedAnswer === correctAnswer) {
    score[selectedTeam]++;
}

// Move on to the next question
currentQuestion++;
if (currentQuestion === questions.length) {
    displayResults();
} else {
    displayQuestion();
}
}

// Function to start the timer
function startTimer() {
var timerEl = document.getElementById("timer");
var secondsLeft = 10;
timerEl.textContent = secondsLeft;
timer = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if (secondsLeft === 0) {
    selectAnswer();
    }
}, 1000);
}

// Function to display the final results
function displayResults() {
// Hide the quiz and show the results
var quizEl = document.getElementById("quiz");
quizEl.style.display = "none";
var resultsEl = document.getElementById("results");
resultsEl.style.display = "block";

// Update the scores for each team in the results table
var dashScoreEl = document.getElementById("dash-score");
var hanafyScoreEl = document.getElementById("hanafy-score");
var moustafaScoreEl = document.getElementById("moustafa-score");
var essawyScoreEl = document.getElementById("essawy-score");
dashScoreEl.textContent = score.dash;
hanafyScoreEl.textContent = score.hanafy;
moustafaScoreEl.textContent = score.moustafa;
essawyScoreEl.textContent = score.essawy;
}

// Add an event listener to the "Start Quiz" button
var startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startQuiz);