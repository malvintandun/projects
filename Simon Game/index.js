let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    userClickedPattern = [];
    let randomNumber = Math.floor(4 * Math.random());
    let randombuttonColours = buttonColours[randomNumber];
    $("#" + randombuttonColours).fadeOut(100).fadeIn(100);
    playSound(randombuttonColours);
    gamePattern.push(randombuttonColours);
}


$(".btn").click(function () {
    if(level > 0){
        let userChosenColour = this.id;
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        checkAnswer();
    }

})

function playSound(name) {
    switch (name) {
        case "red":
            var sound = new Audio("sounds/red.mp3");
            sound.play();
            break;

        case "blue":
            var sound = new Audio("sounds/blue.mp3");
            sound.play();
            break;

        case "green":
            var sound = new Audio("sounds/green.mp3");
            sound.play();
            break;

        case "yellow":
            var sound = new Audio("sounds/yellow.mp3");
            sound.play();
            break;

        default:
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {


    if (started) {

    } else {
        started = true;
        nextSequence();
    }
})

function checkAnswer() {

    let answer = true;
    userClickedPattern.forEach(function (color, index) {
        if (color == gamePattern[index]) {
            
        } else {
            answer = false;
        }
    })

    if((userClickedPattern.length == gamePattern.length) && answer){
        setTimeout(nextSequence,1000);
    } else if(answer == false){
        startOver();
        return 0;
    }
}

function startOver() {
    console.log("false");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100)
    $("h1").text("Game over, press any key to restart");
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}