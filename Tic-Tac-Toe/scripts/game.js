function resetGameStatus() {
  //   activePlayer = 0; //-> let second player of last round be first of this round
  currentRound = 1;
  gameOver.firstElementChild.innerHTML = "You Won, <span></span>!!";
  gameOver.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameBoard.children[gameBoardIndex].textContent = "";
      gameBoard.children[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }

  activePlayerNameOnBoard.textContent = players[activePlayer].name;
  gameIsOver = false;
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please give player names for both players!!");
    return;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
  resetGameStatus();
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  //   console.log(event.target.tagName);
  const selectedField = event.target;
  if (selectedField.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedRow = selectedField.dataset["row"] - 1; //-1 will automatically convert str to int
  const selectedColumn = selectedField.dataset["col"] - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Check rows and columns for victory condition
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Check Left to Right diagonal
  if (
    gameData[1][1] > 0 &&
    gameData[1][1] === gameData[0][0] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[1][1];
  }

  // Check Right to Left diagonal
  if (
    gameData[1][1] > 0 &&
    gameData[1][1] === gameData[0][2] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[1][1];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOver.style.display = "block";
  if (winnerId > 0) {
    winnerName = players[winnerId - 1].name;
    gameOver.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOver.firstElementChild.textContent = "It's a draw!!";
  }
}
