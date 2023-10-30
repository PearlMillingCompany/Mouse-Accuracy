let gameStarted = false;
    let totalTargets = 0;
    let targetsHit = 0;
    let score = 0;
    let gameDuration = 30; // in seconds
    let timer;

    function startGame() {
      gameStarted = true;
      totalTargets = 0;
      targetsHit = 0;
      score = 0;
      document.getElementById('start-button').style.display = 'none';
      document.getElementById('scoreboard').style.display = 'none';
      document.getElementById('game-container').innerHTML = '';
      createTarget();
      startTimer();
    }

    function createTarget() {
      const target = document.createElement('div');
      target.className = 'target';
      target.style.left = `${Math.random() * 90 + 5}%`;
      target.style.top = `${Math.random() * 90 + 5}%`;
      target.style.transitionDuration = `${Math.random() * 1 + 1}s`;
      target.onclick = hitTarget;
      document.getElementById('game-container').appendChild(target);
      totalTargets++;
      setTimeout(() => {
        if (target.parentNode) {
          target.parentNode.removeChild(target);
        }
      }, (Math.random() * 500 + 500));
      if (gameStarted) {
        setTimeout(createTarget, Math.random() * 2000 + 500);
      }
    }

    function hitTarget() {
      targetsHit++;
      this.style.transform = 'scale(0)';
      setTimeout(() => {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      }, 200);
    }

    function startTimer() {
      let seconds = gameDuration;
      timer = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
          endGame();
        }
      }, 1000);
    }

    function endGame() {
      gameStarted = false;
      clearInterval(timer);
      score = (targetsHit / totalTargets) * 100;
      document.getElementById('score').textContent = score.toFixed(2);
      document.getElementById('total-targets').textContent = totalTargets;
      document.getElementById('targets-hit').textContent = targetsHit;
      document.getElementById('scoreboard').style.display = 'block';
      document.getElementById('start-button').style.display = 'block';
    }

    document.getElementById('start-button').addEventListener('click', startGame);
