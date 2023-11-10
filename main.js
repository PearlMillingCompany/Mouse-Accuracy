//variables
var gameStarted = false;
var totalTargets = 0;
var score = 0;
var gameDuration = 60;
var button = document.getElementById("start-button");

const gameContainer = document.getElementById("game-container");
const totalTargetsDisplay = document.getElementById("total-targets");
const clickedTargetsDisplay = document.getElementById("targets-hit");
const scoreDisplay = document.getElementById("score");
var timer;

//starts the game when the start button is pressed
button.addEventListener("click", () => {
    if (!gameStarted) {
        startGame();
    }
});

function startGame() {
    const title = document.getElementById("title");
    title.style.visibility = "hidden";
    const startbutton = document.getElementById("start-button");
    startbutton.style.visibility = "hidden";
    gameStarted = true;
    totalTargets = 0;
    score = 0;
    totalTargetsDisplay.textContent = "Total Targets: " + totalTargets;
    clickedTargetsDisplay.textContent = "Targets Hit: " + score;
    scoreDisplay.textContent = "Accuracy: 0%";

    const startTime = Date.now();
    const updateTimerDisplay = () => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((gameDuration - (currentTime - startTime) / 1000));
        if (elapsedTime <= 0) {
            clearInterval(timer);
            gameStarted = false;
            endGame();
        }
        document.getElementById("timer").textContent = "Time Left: " + elapsedTime + "s";
    };

    updateTimerDisplay();
    timer = setInterval(updateTimerDisplay, 1000);

    //creates the target (adjust as needed for the triangle and square)
    function createTarget() {
        const target = document.createElement("div");
        target.className = "target";
        target.style.left = Math.random() * (gameContainer.clientWidth - 20) + "px";
        target.style.top = Math.random() * (gameContainer.clientHeight - 20) + "px";
        target.style.backgroundColor = document.getElementById("color-menu").value;

        target.addEventListener("click", () => {
            target.remove();
            score++;
            clickedTargetsDisplay.textContent = "Targets Hit: " + score;
            updateScore();
        });

        gameContainer.appendChild(target);
        totalTargets++;
        totalTargetsDisplay.textContent = "Total Targets: " + totalTargets;

    // Remove the target after 2 seconds (adjust this time as needed)
        setTimeout(() => {
            target.remove();
        }, 2000);
        // Create a new target after 2 sec
        if (totalTargets < gameDuration/2) {
            setTimeout(createTarget, 2000); 
        }
    }

    createTarget();
}

//changes the score after every target is spawned
function updateScore() {
    const accuracy = (score / totalTargets) * 100;
    scoreDisplay.textContent = "Accuracy: " + accuracy.toFixed(2) + "%";
}

//ends the game
function endGame() {
    clearInterval(timer);
    gameStarted = false;
    const targets = document.querySelectorAll(".target");
    targets.forEach((target) => target.remove());
}

//Need to disable the button so the game doesn't continuously stat if the user keeps playing, maybe add difficulty if we have time