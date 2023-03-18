// Variable declarations
    var timer = document.getElementById("timer");
    var secondsLeft = 90;
    var questionCount = 1;

    // declare variables for the various 'pages'
    var totalScore = 0;
    var questionPage = document.getElementById("questionpage");
    var endingPage = document.getElementById("endingpage");
    var highScorePage = document.getElementById("highscorepage");
    var instructionPage = document.getElementById("instructionpage");
    var displayQuestionPage = document.getElementById("display_question");
    var endMessage = document.getElementById("end_message");

    // variables for inputs, outputs and stored totals
    var answerRightWrong = document.getElementById("check_answer");
    var finalScore = document.getElementById("finalscore");
    var playerScore = document.getElementById("player_score");
    var initials = document.getElementById("initials");

    // variables for various buttons
    var startBtn = document.getElementById("startButton");
    var answerBtn1 = document.getElementById("answerBtn1");
    var answerBtn2 = document.getElementById("answerBtn2");
    var answerBtn3 = document.getElementById("answerBtn3");
    var answerBtn4 = document.getElementById("answerBtn4");
    var submitBtn = document.getElementById("submitBtn");
    var goBackBtn = document.getElementById("goBackBtn");
    var clearHighScoresBtn = document.getElementById("clearHighScoresBtn");
    var highScoresBtn = document.getElementById("viewhighscoresbtn");
    var answerButtons = document.querySelectorAll(".answers");

//Question list variable and arrays
        var questionList = [
            {
                question: "Question 1 : Javascript is an ________ language.",
                choices: ["a. Object-oriented", "b. Object-based", "c. Procedural", "d. None of the above"],
                answer: "a"
            },
            {
                question: "Question 2 : Which of the following keywords is used to define a variable in Javascript?",
                choices: ["a. var", "b. let", "c. Both A and B", "d. None of the above"],
                answer: "c"
            },
            {
                question: "Question 3 : Which of the following methods is used to access HTML elements using Javascript?",
                choices: ["a. getElementbyId()", "b. getElementsByClassName()", "c. Both A and B", "d. None of the above"],
                answer: "c"
            },
            {
                question: "Question 4 : Which of the following methods can be used to display data in some form using Javascript?",
                choices: ["a. document.write()", "b. console.log()", "c. window.alert()", "d. All of the above"],
                answer: "d"
            },
            {
                question: "Question 5 : How can a datatype be declared to be a constant type?",
                choices: ["a. const", "b. var", "c. let", "d. constant"],
                answer: "a"
            },
            {
                question: "Question 6 : Which function is used to serialize an object into a JSON string?",
                choices: ["a. stringify()", "b. parse()", "c. convert()", "d. None of the above"],
                answer: "a"
            },
            {
                question: "Question 7 : Which of the following is not a Javascript framework?",
                choices: ["a. Node", "b. Vue", "c. React", "d. Cassandra"],
                answer: "a"
            },
            {
                question: "Question 8 : What keyword is used to check whether a given property is valid or not?",
                choices: ["a. in", "b. is in", "c. exists", "d. lies"],
                answer: "a"
            }
        ];

// function to countdown the timer 
function countdown() {
            
    var timerInterval = setInterval(function () {
    
        secondsLeft--;
        timer.textContent = "Time Left: " + secondsLeft + " s";
        
        if (secondsLeft <= 0){
                clearInterval(timerInterval);
            timer.textContent = "Time is up!"; 
            // if time is up, show on score board content instead of "all done!"
            endMessage.textContent = "Time is up!";
            gameEnd();
    
        } else  if(questionCount >= questionList.length +1) {
            clearInterval(timerInterval);
            gameEnd();
            } 
    }, 1000);
}

// function to start the quiz, only displaying questions
function startQuiz () {
    instructionPage.style.display = "none";
    questionPage.style.display = "block";
    answerRightWrong.style.display = "none";
    highScoresBtn.style.display = "none";
    questionNumber = 0
    countdown();
    displayQuestion(questionNumber);
}

// function to display each question and answer choices
function displayQuestion (n) {
    displayQuestionPage.textContent = questionList[n].question;
    answerBtn1.textContent = questionList[n].choices[0];
    answerBtn2.textContent = questionList[n].choices[1];
    answerBtn3.textContent = questionList[n].choices[2];
    answerBtn4.textContent = questionList[n].choices[3];
    questionNumber = n;
}

        //WHEN I answer a question,Show if answer is correct or incorrect 
        function checkAnswer(event) {
            event.preventDefault();
            //make it display
            answerRightWrong.style.display = "block";
            setTimeout(function () {
                answerRightWrong.style.display = 'none';
            }, 3000);
        
            // answer check
            if (questionList[questionNumber].answer == event.target.value) {
                answerRightWrong.textContent = "Correct!"; 
                totalScore = totalScore + 1;
        
            } else {
                secondsLeft = secondsLeft - 10;
                answerRightWrong.textContent = "Wrong! The correct answer is " + questionList[questionNumber].answer + " .";
            }
                 //THEN I am presented with another question
            if (questionNumber < questionList.length -1 ) {
            // call showQuestions to bring in next question when any reactBtn is clicked
                displayQuestion(questionNumber +1);
            } else {
            gameEnd();
        }
        questionCount++;
        }

//When times runs out or all questions are answered the game is over
    function gameEnd() {
    
        questionPage.style.display = "none";
        instructionPage.style.display = "none";
        endingPage.style.display = "block";
        // show final score
        finalScore.textContent = "Your final score is :" + totalScore ;
        // clearInterval(timerInterval);  
        // timer.style.display = "none"; 
};

    // get current score and initials from local storage
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            freshList = JSON.parse(currentList);
            return freshList;
        } else {
            freshList = [];
        }
        return freshList;
    };

//Display player score 
function displayScore() {
    var li = document.createElement("li");
    playerScore.innerHTML = "";
    // playerScore.style.display = "block";
    var highScores = sort();
    
    var topFiveScores = highScores.slice(0,5);
    console.log(topFiveScores);
    for (var i = 0; i < topFiveScores.length; i++) {
        var item = topFiveScores[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        playerScore.appendChild(li);
        }
};

    // sort score and ranking the highscore list
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else{
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }
};

    // push new score and initial to the local storage
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: initials.value,
            score: totalScore
        }
        addItem(scoreItem);
        displayScore();
    }

/* Add event listeners*/
    // startbtn to start the quiz
startBtn.addEventListener("click", startQuiz);

//check each answer and advance to next question
answerButtons.forEach(function(click) {
    click.addEventListener("click", checkAnswer);
});

    //save information and go to next page
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        endingPage.style.display = "none";
        instructionPage.style.display = "none";
        highScorePage.style.display = "block";
        displayQuestionPage.style.display ="none";
        saveScore();
    });

    // check highscore ranking list
    highScoresBtn.addEventListener("click", function(event) {
        event.preventDefault();
        endingPage.style.display = "none";
        instructionPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        displayScore();
    });

//go back to instruction screen
        goBackBtn.addEventListener("click", function(event) {
            event.preventDefault();
            endingPage.style.display = "none";
            instructionPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
        });

    //clear local storage and clear page shows
    clearHighScoresBtn.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        displayScore();
    });