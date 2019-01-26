//assigning variables
var qSeconds = 30;
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
var questionImages = document.getElementById("questionImages");
var resultImage = document.getElementById("resultImage");
var restartbutton = document.getElementById("restart");

resultImage.style.display = "none";
restartbutton.style.display = "none";

//questions and answers objects
var question1 = 
{
    question: "The Covenant is a factional military alien race in what game?",
    answer1: "Mass Effect",
    answer2: "XCOM",
    answer3: "Halo",
    answer4: "Half-Life",
    correct: "Halo",
    image: "assets/images/Halo_Covenant_soilder.png"

};

var question2 =
{
    question: "What does MOBA stand for?",
    answer1: "My Online Business  Attitude",
    answer2: "Mobile Online Buyers Association",
    answer3: "Madison's Online Boarding Academy",
    answer4: "Multiplayer Online Battle Arena",
    correct: "Multiplayer Online Battle Arena",
    image: "assets/images/Moba.jpg"
};

var question3 =
{
    question: "The gameing series called 'pocket monsters' in Japan is called what is the U.S.?",
    answer1: "Bakugan",
    answer2: "Pokemon",
    answer3: "Yu-Gi-Oh",
    answer4: "Digimon",
    correct: "Pokemon",
    image: "assets/images/pokemon-logo.png"
};

var question4 =
{
    question: "What game series takes place in a post apocalypic world where you survived a nuclear war?",
    answer1: "Metro 2033",
    answer2: "Gears of War",
    answer3: "Fallout",
    answer4: "The Last of Us",
    correct: "Fallout",
    image: "assets/images/Fallout.jpg"
};

var question5 =
{
    question: "Which of these games does NOT share characters with other Blizzard games?",
    answer1: "Overwatch",
    answer2: "HearthStone",
    answer3: "Starcraft",
    answer4: "Diablo",
    correct: "Overwatch",
    image: "assets/images/Overwatch.jpg"
};

var question6 =
{
    question: "'Fus Ro Dah' is a popular phrase that originated in what game?",
    answer1: "Dragon Age: Inquisition",
    answer2: "The Witcher",
    answer3: "Far Cry",
    answer4: "Skyrim",
    correct: "Skyrim",
    image: "assets/images/Fus_Ro_Dah.gif"
};

var question7 =
{
    question: "What country is the leader in e-sports?",
    answer1: "United States",
    answer2: "France",
    answer3: "South Korea",
    answer4: "Canada",
    correct: "South Korea",
    image: "assets/images/South-Korea-Team.jpg"
};

var question8 =
{
    question: "What is the main service people use to get games for pc?",
    answer1: "Uplay",
    answer2: "Steam",
    answer3: "Epic Games Store",
    answer4: "Origin",
    correct: "Steam",
    image: "assets/images/Steam-Logo.jpg"
};

var question9 =
{
    question: "Which is an Overwatch character?",
    answer1: "Jenos",
    answer2: "Zarya",
    answer3: "Adria",
    answer4: "Riven",
    correct: "Zarya",
    image: "assets/images/Zarya.png"
};

var question10 =
{
    question: "How many Final Fantasy Games are there?",
    answer1: "10",
    answer2: "5",
    answer3: "7",
    answer4: "15",
    correct: "15",
    image: "assets/images/Final-Fantasy.jpg"
};

//add objects to array
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];



//set questions elements to hidden
hideQandA();
hideImage();

//button click functions
$("#start").on("click", startgame);
$(answer1text).on("click", answerScreen);
$(answer2text).on("click", answerScreen);
$(answer3text).on("click", answerScreen);
$(answer4text).on("click", answerScreen);
$(restartbutton).on("click", restart);


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
            hideImage();
            next();
        }
        else
        {
            hideImage();
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
    qSeconds = 30;
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
    answerChosen = this.textContent;
    
    stop();
    aSeconds = 5;
    
    //removes question and answers from screen
    hideQandA();
    
    //check if no answer was selected
    if(qSeconds < 0)
    {
        $("#answerStatment").html("Times Up!");
        $("#corectAnswer").html("The correct answer was: " + questions[questionIndex].correct);
        showImage();
        unanswered++;
        
    }//check is correct answer was selected
    else if(answerChosen == questions[questionIndex].correct)
    
    {
        $("#answerStatment").html("Correct");
        showImage();
        correctAnswers++;
    }
    else//check if incorrect answer was slected
    {
        $("#answerStatment").html("Incorrect");
        $("#corectAnswer").html("The correct answer was: " + questions[questionIndex].correct);
        showImage();
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

//show images on answer screen
function showImage()
{
    $(questionImages).attr("src", questions[questionIndex].image);
    questionImages.style.display = "inline-block";
}

//hide images
function hideImage()
{
    questionImages.style.display = "none";
}


//display results function
function results()
{
    $("#time").html(" ");
    $("#answerStatment").html(" ");
    $("#corectAnswer").html(" ");
    $("#resultMessage").html("Results: ");
    $("#answeredCorrect").html("Correct Answers: " + correctAnswers);
    $("#answeredIncorrect").html("Incorrect Answers: " + incorrectAnswers);
    $("#unanswered").html("Unanswered: " + unanswered);
    $(resultImage).attr("src", "assets/images/Well-Done.gif");
    resultImage.style.display = "inline-block";
    restartbutton.style.display = "inline-block";

}

//restart the game
function restart()
{
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    questionIndex = 0;

    qSeconds = 30;
    aSeconds = 5;

    $("#resultMessage").html("");
    $("#answeredCorrect").html("");
    $("#answeredIncorrect").html("");
    $("#unanswered").html("");

    resultImage.style.display = "none";
    restartbutton.style.display = "none";
    startbutton.style.display = "inline-block";

}