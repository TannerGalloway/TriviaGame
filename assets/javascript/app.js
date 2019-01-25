//assigning variables
var qSeconds = 10;
var aSeconds = 5;
var questionTimer;
var questionIndex = 0;
var answerChosen;
var answerTimer;
var resultsTimer;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

//get html elements
var startbutton = document.getElementById("start");
var questiontext = document.getElementById("question");
var answer1text = document.getElementById("answer1");
var answer2text = document.getElementById("answer2");
var answer3text = document.getElementById("answer3");
var answer4text = document.getElementById("answer4");

//questions and answers objects
var question1 = 
{
    question: "What shape is the earth?",
    answer1: "Cube",
    answer2: "Flat",
    answer3: "Triangle",
    answer4: "Round",
    correct: "answer4"
};

var question2 =
{
    question: "Which is NOT a desert?",
    answer1: "Sonoran",
    answer2: "Sahara",
    answer3: "Samus",
    answer4: "Gobi",
    correct: "answer3"
};

var questions = [question1, question2];


//set questions elements to hidden
hideQandA();

//button click functions
$("#start").on("click", startgame);
$(answer1text).on("click", answerScreen);
$(answer2text).on("click", answerScreen);
$(answer3text).on("click", answerScreen);
$(answer4text).on("click", answerScreen);


//start game function
function startgame()
{
    $(questiontext).html(questions[questionIndex].question);
    $(answer1text).html(questions[questionIndex].answer1);
    $(answer2text).html(questions[questionIndex].answer2);
    $(answer3text).html(questions[questionIndex].answer3);
    $(answer4text).html(questions[questionIndex].answer4);
    startbutton.style.display = "none";
    showQandA();
    questionTimer = setInterval(timerQuestion, 1000);
    $("#time").html("Time Remaining:" + " " + qSeconds + " seconds");
}  

//question timer function
function timerQuestion()
{
    if(qSeconds < 0)
    {
        stop();
        answerScreen();
    }
    else
    {
        $("#time").html("Time Remaining:" + " " + qSeconds + " seconds");
        qSeconds--;
    }
}
//answer timer function
function timerAnswer()
{
    if(aSeconds < 0)
    {
        stop();
        if(questionIndex < questions.length)
        {
            next();
        }
        else
        {
            results();
        }
    }
    else
    {
        aSeconds--;
    }
}

//timer stop function
function stop()
{
    clearInterval(questionTimer);
    clearInterval(answerTimer);
}

//next question function
function next()
{
    //change to next question with answers
    stop();
    qSeconds = 10;
    $("#time").html(" ");
    $("#corectAnswer").html(" ");
    $(questiontext).html(questions[questionIndex].question);
    $(answer1text).html(questions[questionIndex].answer1);
    $(answer2text).html(questions[questionIndex].answer2);
    $(answer3text).html(questions[questionIndex].answer3);
    $(answer4text).html(questions[questionIndex].answer4);

    
    //display answers
    $("#time").html("Time Remaining:" + " " + qSeconds + " seconds");
    $("#answerStatment").html(" ");
    showQandA();
    questionTimer = setInterval(timerQuestion, 1000);

}

//answer screen function
function answerScreen()
{   //get id of button clicked
    answerChosen = this.id;

    stop();
    aSeconds = 5;

    //removes question and answers from screen
    hideQandA();
    
    //check if no answer was selected
    if(qSeconds < 0)
    {
        $("#answerStatment").html("Times Up!");
        $("#corectAnswer").html("The correct answer was:");
        unanswered++;
        
    }//check is correct answer was selected
    else if(answerChosen == questions[questionIndex].correct)
    
    {
            $("#answerStatment").html("Correct");
            correctAnswers++;
    }
    else//check if incorrect answer was slected
    {
        $("#answerStatment").html("Incorrect");
        $("#corectAnswer").html("The correct answer was:");
        incorrectAnswers++;
    }

    questionIndex++;
    answerTimer = setInterval(timerAnswer, 1000);

}

//show questions and answers function
function showQandA()
{
    questiontext.style.display = "block";
    answer1.style.display = "block";
    answer2.style.display = "block";
    answer3.style.display = "block";
    answer4.style.display = "block";
}

//hide questions and answers function
function hideQandA()
{
    questiontext.style.display = "none";
    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";
    answer4.style.display = "none";
}

//display results function
function results()
{
    $("#time").html(" ");
    $("#answerStatment").html(" ");
    $("#corectAnswer").html(" ");
    $("#resultMessage").html("All done, heres how you did!");
    $("#answeredCorrect").html("Correct Answers: " + correctAnswers);
    $("#answeredIncorrect").html("Incorrect Answers: " + incorrectAnswers);
    $("#unanswered").html("Unanswered: " + unanswered);
    


}