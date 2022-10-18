var introContainerBox = document.getElementById('introContainer');
var timerContainer = document.getElementById('timerContainer');
var quizContainer = document.getElementById('quizcontainer');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var questionEl = document.getElementById('question');
var start_btn = document.getElementById('start_btn');
var startQuizBtn = document.getElementById("start-quiz-button");
var questionContainer = document.getElementById('questionContainer');
var answerCorrect = document.getElementById('answerCorrect');
var questionsList = 0;
var arrayShuffledQuestions;
var myQuestionEl = document.getElementById("myQuestions");
var summaryEl = document.getElementById("summary")
;
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var finalScoreEl = document.getElementById("finalScore");
var highScoreSection = document.getElementById("highScoreSection");
var score = document.getElementById("score")
var answersCorrect = 0
var finalScore = 0
var submitScoreBtn = document.getElementById("submitScoreBtn")
var initials  = document.getElementById("initials")



const myQuestions = [
    {
        question: 'JavaScript has a file extension of?',
        correctAnswer: 'b: .js',
        answers: ['a: .java', 'b: .js', 'c: .javascript', 'd: .xml']
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        correctAnswer: 'c: javascript',
        answers: ['a: scripting', 'b: js', 'c: javascript', 'd: index']
    },
    {
        question: 'A Function Associated With An object is Called?',
        correctAnswer: 'b: Method',
        answers: ['a: Function', 'b: Method', 'c: Link', 'd: None']
    },
    {
        question: 'Event is Used To Check An Empty Text Box?',
        correctAnswer: 'c: OnBlur',
        answers: ['a: Onclick()', 'b: OnFocus()', 'c: OnBlur', 'd:PreventDefault()']
    },
    {
        question: 'Which Of The Dialog Box Display a Message And a Data Entry Field?',
        correctAnswer: 'b: Prompt()',
        answers: ['a: Alert()', 'b: Prompt()', 'c: Confirm()', 'd: MSG()'],
    },
]

var timeLimit = 60;
var quizBegin = function () {
    introContainerBox.classList.add('hide');
    questionContainer.classList.remove('hide');
    timerContainer.classList.remove('hide');
    timeLeft.textContent = timeLimit;
    arrayShuffledQuestions = myQuestions.sort(() => Math.random() - 0.5)
    displayQuestion();
    timer();

};

var timer = function () {
    var startTimer = setInterval(function () {
        if (timeLimit > 1) {
            timeLeft.textContent = timeLimit - 1;
            timeLimit--;
        } else {
            (timeLimit <= 0)
            clearInterval(startTimer);
            endGame();
        }
    }, 1000);
};


start_btn.addEventListener("click", quizBegin)

var displayQuestion = function () {
    var question = arrayShuffledQuestions[questionsList]
    questionEl.textContent = question.question
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("btn" + i).textContent = question.answers[i]

    };
};

function checkAnswer(event) {
    if (questionsList === arrayShuffledQuestions.length - 1) {
        endGame();
        timeLimit = 0;
    } else {
        var answerSelection = event.target.textContent
        console.log(event.target.textContent)
        var correctAnswer = arrayShuffledQuestions[questionsList].correctAnswer
        if (answerSelection === correctAnswer) {
            questionsList++;
            finalScore += 20;
            console.log(finalScore)
            finalScore.textContent = finalScore;
            displayQuestion()
        } else {
            //decrease time by x seconds when incorrect answer is chosen
            timeLimit -= 5;
            timeLeft.textContent = timeLimit;
            questionsList++
            displayQuestion()
        };
    };
};



var savedHighScores = localStorage.getItem("high scores");
var scoresArray;


submitScoreBtn.addEventListener("click", function(event){
    var initialsInput = document.querySelector('#initials').value;
// preventDefault();
//highscore functionality
var savedData = JSON.parse(localStorage.getItem("previousScore")) || []
var newScore = {
    finalScore: finalScore,
    initialsInput: initialsInput
}
savedData.push(newScore);
localStorage.setItem("previousScore", JSON.stringify(savedData));

})

myQuestionEl.addEventListener("click", checkAnswer);


function endGame() {
    summaryEl.classList.remove('hide');
    questionContainer.classList.add('hide');
    finalScoreEl.textContent = finalScore;

};

 

