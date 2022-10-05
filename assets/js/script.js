//variables created for dynamic html page
var startButton = document.querySelector("#start-button");
var frontPage = document.querySelector("#front-page");
var secondPage = document.querySelector("#second-page");
var finalPage = document.querySelector("#final-page");
var finalPage2 = document.querySelector("#final-page2");
var question = document.querySelector("#question");
var optionOne = document.querySelector("#option1");
var optionTwo = document.querySelector("#option2");
var optionThree = document.querySelector("#option3");
var optionFour = document.querySelector("#option4");
var timerEl = document.querySelector("#timer");
var nameStorage = document.querySelector("#Name");
var nameScore = document.querySelector("#names");
var score = document.querySelector("#score");
var submitButton = document.querySelector("#storage");
var timeRemain = 0;
var timeLeft = 75;
var endOfGame = false;

var arr = [{
    question: "Question1",
    option1: "Option1",
    option2: "Option2",
    option3: "Option3",
    option4: "Option4",
    answer: "Option1"
}, {
    question: "Question2",
    option1: "Option1.1",
    option2: "Option2.1",
    option3: "Option3.1",
    option4: "Option4.1",
    answer: "Option2.1"
}, {
    question: "Question3",
    option1: "Option1.2",
    option2: "Option2.2",
    option3: "Option3.2",
    option4: "Option4.2",
    answer: "Option3.2"
}, {
    question: "Question4",
    option1: "Option1.3",
    option2: "Option2.3",
    option3: "Option3.3",
    option4: "Option4.3",
    answer: "Option4.3"
}, {
    question: "Question5",
    option1: "Option1.4",
    option2: "Option2.4",
    option3: "Option3.4",
    option4: "Option4.4",
    answer: "Option1.4"
}, 0]

var currentIndex = 0;

startButton.addEventListener("click", function () {
    frontPage.style.display = "none";
    secondPage.style.display = "block";
    questionOption();
    //reinitializes timer
    timeLeft = 75;
    timer();
})

optionOne.addEventListener("click", checkAnswer);
optionTwo.addEventListener("click", checkAnswer);
optionThree.addEventListener("click", checkAnswer);
optionFour.addEventListener("click", checkAnswer);



function questionOption() {
    if (currentIndex < 5) {
        question.textContent = arr[currentIndex]["question"];
        optionOne.textContent = arr[currentIndex]["option1"];
        optionTwo.textContent = arr[currentIndex]["option2"];
        optionThree.textContent = arr[currentIndex]["option3"];
        optionFour.textContent = arr[currentIndex]["option4"];
    } else {
        endOfGame = true;
    }
}

function checkAnswer(e) {

    if (e.target.textContent === arr[currentIndex]["answer"]) {
        if (currentIndex < 4) {
            currentIndex++;
        } else {
            endOfGame = true;
        }
    } else {
        if (currentIndex < 4) {
            timeLeft -= 15;
            currentIndex++;
        } else {
            endOfGame = true;
        }
    }
    questionOption();

}

function timer() {


    var timeInterval = setInterval(function () {

        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft === 0 || endOfGame) {
            clearInterval(timeInterval);
            score.textContent = timeLeft;
            timeRemain = timeLeft;
            secondPage.style.display = "none";
            finalPage.style.display = "block";
        }

    }, 1000);
    return timeRemain;

}


submitButton.addEventListener("click", function () {
    nameScore.textContent = nameStorage.value;
    finalPage.style.display = "none";
    finalPage2.style.display = "block";
    if((JSON.parse(localStorage.getItem("collection")))===undefined){
        var scores = {};
    } else{
        scores = JSON.parse(localStorage.getItem("collection"));
    }
    scores[nameStorage.value] = timeRemain;
    localStorage.setItem("collection", JSON.stringify(scores));
});




