document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable');
    const droppables = document.querySelectorAll('.droppable');
    const timerElement = document.getElementById('timer');
    const finishButton = document.getElementById('finishButton');
    const endgamePopup = document.getElementById('endgame-popup');
    const exitButton = document.getElementById('exitButton');
    const introPopup = document.getElementById('overlay');
    const overlay = document.getElementById('intro-popup');
    const startGameButton = document.getElementById('startGameButton');

    let secondsLeftIntro = 10; // Set the intro timer value to 10 seconds
    let secondsLeftGame = 15; // Set the initial game timer value to 15 seconds
    let timerIntro;
    let timerGame;
    let correctRounds = 0;
    let gameActive = false;

    function startGame() {
        randomizeItems();
        gameActive = true;

        const clickSound3 = document.getElementById('clickSound');
        clickSound3.play();

        // Update the game timer display
        updateTimer();
    }

    function startGameTimer() {
        timerGame = setInterval(function () {
            secondsLeftGame--;
            updateTimer();
            if (secondsLeftGame <= 0) {
                clearInterval(timerGame);
                endRound(false);
            }
        }, 1000);
    }

    function startIntroTimer() {
        timerIntro = setInterval(function () {
            secondsLeftIntro--;
            updateIntroTimer();
            if (secondsLeftIntro <= 0) {
                clearInterval(timerIntro);
                introPopup.style.display = 'none';
                overlay.style.display = 'none';
                startGameTimer(); // Start the game timer after the intro timer
                startGame();
            }
        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(secondsLeftGame / 60);
        const seconds = secondsLeftGame % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerElement.textContent = `Time Left: ${formattedTime}`;
    }

    function updateIntroTimer() {
        const introTimerElement = document.getElementById('intro-timer');
        introTimerElement.textContent = `Time Left: ${secondsLeftIntro}`;
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
        clearInterval(timerGame);
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

        secondsLeftGame = 15;
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

    startGameButton.addEventListener('click', function () {
        clearInterval(timerIntro); // Clear any existing intro timer
        introPopup.style.display = 'none';
        overlay.style.display = 'none';
        secondsLeftGame = 15; // Set the initial game timer value to 15 seconds
        startGameTimer(); // Start a new game timer
        startGame();
    });

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

            // Check if the droppable area already contains an item
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

    // Display intro pop-up when the page loads
    introPopup.style.display = 'block';
    startIntroTimer();
});
