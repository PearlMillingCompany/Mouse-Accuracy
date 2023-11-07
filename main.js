
var gameStarted = false;
var totalTargets = 0;
var score = 0;
var gameDuration = 20;
var button = document.getElementById("start-button");

const gameContainer = document.getElementById("game-container");
const totalTargetsDisplay = document.getElementById("total-targets");
const clickedTargetsDisplay = document.getElementById("targets-hit");
const scoreDisplay = document.getElementById("score");

button.addEventListener("click", () => {
    var selectedColor = document.getElementById("color-menu").value;
    var selectedShape = document.getElementById("shape-menu").value;

    function startGame() {
        gameStarted = true;
        totalTargets = 0;
        score = 0;
        totalTargetsDisplay.textContent = totalTargets;
        clickedTargetsDisplay.textContent = score;
        scoreDisplay.textContent = "0%";

        // Game timer doesn't work yet
        const startTime = Date.now();
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;
            if (elapsedTime >= gameDuration) {
                clearInterval(interval);
                gameStarted = false;
                endGame();
            }
        }, 1000);

        // Create targets with the selected color at random positions one at a time
        function createTarget() {
            const target = document.createElement("div");
            target.className = "target";
            target.style.left = Math.random() * (gameContainer.clientWidth - 20) + "px";
            target.style.top = Math.random() * (gameContainer.clientHeight - 20) + "px";
            target.style.backgroundColor = selectedColor;
            target.addEventListener("click", () => {
                target.remove();
                score++;
                clickedTargetsDisplay.textContent = score;
                updateScore();
                if (totalTargets < gameDuration) {
                    createTarget();
                }
            });
            gameContainer.appendChild(target);
            totalTargets++;
            totalTargetsDisplay.textContent = totalTargets;
        }

        createTarget();
    }

    function updateScore() {
        const accuracy = (score / totalTargets) * 100;
        scoreDisplay.textContent = accuracy.toFixed(2) + "%";
    }

    function endGame() {
        // Remove all remaining targets
        const targets = document.querySelectorAll(".target");
        targets.forEach((target) => target.remove());
    }

    startGame();
})

      ///Scoreboard stuff is wonky, need to be able to see it work correctly 
      ///before setting it back to popping up after the user's game is finished
      ///I took he timer code from stack overflow and it doesn't work well yet
      ///No idea how to make the starting shape different

