var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Start Game

var started = false;

$("body").keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    animateClick(userChosenColour);

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // * (max - min + 1) + min
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(gamePattern);

    animateClick(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        startOver();
    }
}

function animateClick(click) {
    $("#" + click)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100)
        .addClass("pressed");

    var audio = new Audio("sounds/" + click + ".mp3");
    audio.play();

    setTimeout(function () {
        $("#" + click).removeClass("pressed"), 300;
    });
}

function startOver() {
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
        $("body").removeClass("game-over"), 200;
    });
    $("h1").text("Game Over :(");
    $("h3").html("Refresh (F5) to Start Over!");

    level = 0;
    randomChosenColour = [];
    userClickedPattern = [];
    started = false;
}
