let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

 // Press any key to start the game   
$(document).keypress(function() {
    if (started === false) {
        $("h2").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// Click button to start the game
$(".startbtn").click(function() {
    if (started === false) {
        $("h2").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
})

// When a button with class .btn is clicked
// Add button's id to userClickedPattern array and play sound 
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Check last userClickPatter matches last gamePatern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();}, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");} , 200);
            startOver();
            $("h2").html(`Game over. <br /> Press any key or <button class=startbtn id=startbtn>click</button> to restart.`);
            $(".btn").slideUp().slideDown();
        }
}

// Generate a random number from 0-3, to use as index through buttonColours array
// Save that random colour in variable
// Call playSound function using the saved colour in the mp3 name
// Flash the button visually
// Add that random colour to the gamePattern array
function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h2").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);   
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play mp3 with parameter as file name
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Add/remove "pressed" class, button appears grey when clicked
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100); 
    }