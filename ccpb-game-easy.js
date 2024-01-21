document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable');
    const droppables = document.querySelectorAll('.droppable');
    const timerElement = document.getElementById('timer');
    const introTimerElement = document.getElementById('intro-timer');
    const finishButton = document.getElementById('finishButton');
    const endgamePopup = document.getElementById('endgame-popup');
    const exitButton = document.getElementById('exitButton');
    const introPopup = document.getElementById('overlay');
    const overlay = document.getElementById('intro-popup');
    const startGameButton = document.getElementById('startGameButton');

    let secondsLeft = 90;
    let introSecondsLeft = 20; // Set the intro timer value to 20 seconds
    let timer;
    let introTimer;
    let correctRounds = 0;
    let gameActive = false;

    function startGame() {
        introPopup.style.display = 'none';
        overlay.style.display = 'none';
        randomizeItems();
        startTimer();
        gameActive = true;

        const clickSound3 = document.getElementById('clickSound');
        clickSound3.play();
    }

    function startTimer() {
        timer = setInterval(function () {
            secondsLeft--;
            updateTimer();
            if (secondsLeft <= 0) {
                clearInterval(timer);
                endRound(false);
            }
        }, 1000);
    }

    function startIntroTimer() {
        introTimer = setInterval(function () {
            introSecondsLeft--;
            updateIntroTimer();
            if (introSecondsLeft <= 0) {
                clearInterval(introTimer);
                startGame();
            }
        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerElement.textContent = `Time Left: ${formattedTime}`;
    }

    function updateIntroTimer() {
        introTimerElement.textContent = `Time Left: ${introSecondsLeft}`;
    }

    function randomizeItems() {
        const draggableContainer = document.getElementById('draggable-container');
        const itemsArray = Array.from(draggableContainer.children);
        itemsArray.sort(() => Math.random() - 0.5);
        draggableContainer.innerHTML = '';
        itemsArray.forEach((item) => {
            draggableContainer.appendChild(item);
        });
    }

    function showEndgamePopup(message) {
        endgamePopup.innerHTML = `<p>${message}</p>
          <button id="exitButtonPopup" onclick="exitGame()">Exit</button>`;
        endgamePopup.style.display = 'block';
        document.getElementById('exitButtonPopup').addEventListener('click', exitGame);
    }

    function endRound(isCorrect) {
        clearInterval(timer);
        gameActive = false;
        if (isCorrect) {
            correctRounds++;
            showEndgamePopup(`Congratulations! You completed the round.`);
        } else {
            showEndgamePopup(`Oops! Time's up or some items are not in the correct positions.`);
        }
        draggables.forEach((draggable) => {
            draggable.draggable = false;
        });
    }

    function resetGame() {
        draggables.forEach((draggable) => {
            draggable.draggable = true;
            document.getElementById('draggable-container').appendChild(draggable);
        });

        droppables.forEach((droppable) => {
            droppable.innerHTML = '';
        });

        secondsLeft = 90;
        updateTimer();
    }

    function exitGame() {
        alert('Thank you for playing!');
        window.location.href = 'ccpb-start.html';
    }

    finishButton.addEventListener('click', function () {
        if (gameActive) {
            endRound(false);
        } else {
            showEndgamePopup(`Oops! Time's up or some items are not in the correct positions.`);
        }
    });

    startGameButton.addEventListener('click', startGame);

    randomizeItems();

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
    });

    droppables.forEach((droppable) => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragenter', dragEnter);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('drop', dragDrop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }

    function dragLeave() {
        this.classList.remove('drag-over');
    }

    function dragDrop(e) {
        if (gameActive) {
            const draggedItemId = e.dataTransfer.getData('text/plain');
            const draggedItem = document.getElementById(draggedItemId);
            const droppable = this;

            if (droppable.children.length === 0) {
                droppable.appendChild(draggedItem);
                checkWin();
            }

            const clickSound3 = document.getElementById('clickSound3');
            clickSound3.play();
        }
    }

    function checkWin() {
        let correctCount = 0;
        droppables.forEach((droppable) => {
            if (droppable.children.length > 0) {
                const itemId = droppable.children[0].id;
                if (itemId === droppable.id.replace('drop', 'item')) {
                    correctCount++;
                }
            }
        });

        if (correctCount === droppables.length) {
            endRound(true);
        }
    }

    introPopup.style.display = 'block';
    startIntroTimer(); // Start intro timer
});
