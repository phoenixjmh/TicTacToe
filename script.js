/* eslint-disable guard-for-in */

const introForm = (function () {
  let gameStart = false;
  function setGameStart() {
    gameStart = true;
    this.gameStart = gameStart;
    return gameStart;
  }
  const resetIcon='@UrL.Content("~/svg/reset.svg")';
  const introPanel = document.querySelector(".intro-panel");
  const playerOneField = document.querySelector("#player1-name");
  const playerTwoField = document.querySelector("#player2-name");
  const submitFormButton = document.querySelector("#submit-names");
  const resetButton = document.createElement("button");
  resetButton.className = "reset-button";
  let currentLoop;
  let playerOneName;
  let playerTwoName;
  submitFormButton.addEventListener("click", () => {
    playerOneName = playerOneField.value;
    playerTwoName = playerTwoField.value;
    introForm.setGameStart();
    introPanel.remove();
    currentLoop = gameLoop();

    document.body.appendChild(resetButton);
  });
  resetButton.addEventListener("click", () => getLoop().currentBoard.reset());
  const getLoop = () => currentLoop;
  const getPlayerOneName = () => playerOneName;
  const getPlayerTwoName = () => playerTwoName;

  return {
    resetButton,
    gameStart,
    setGameStart,
    currentLoop,
    getLoop,
    getPlayerOneName,
    getPlayerTwoName,
  };
})();

function Player(name, gamePiece, isTurn) {
  this.name = name;

  this.gamePiece = gamePiece;

  function getIsTurn() {
    return this.isTurn;
  }
  function setIsTurn() {
    this.isTurn = isTurn;
    return this.isTurn;
  }
  function switchTurn() {
    this.isTurn = !this.isTurn;
    return this.isTurn;
  }

  return { name, getIsTurn, setIsTurn, switchTurn, gamePiece };
}
function Tile(id, contents, isBlank = true) {
  this.id = id;
  this.contents = contents;

  // eslint-disable-next-line no-return-assign
  const setTile = (newContents) => (this.contents = newContents);
  this.getTile = () => this.contents;

  function setBlankFalse() {
    this.isBlank = false;
    return this.isBlank;
  }
  function setBlankTrue() {
    this.isBlank = true;
    return this.isBlank;
  }
  function getIsBlank() {
    this.isBlank = isBlank;
    return this.isBlank;
  }

  return {
    setTile,
    isBlank,
    getTile,
    id,
    contents,
    setBlankFalse,
    setBlankTrue,
    getIsBlank,
  };
}
const gameBoard = function () {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.className = "game-board";
  document.body.appendChild(gameBoardContainer);
  const tiles = [];
  const tile1 = Tile("tile1", "");
  const tile2 = Tile("tile2", "");
  const tile3 = Tile("tile3", "");
  const tile4 = Tile("tile4", "");
  const tile5 = Tile("tile5", "");
  const tile6 = Tile("tile6", "");
  const tile7 = Tile("tile7", "");
  const tile8 = Tile("tile8", "");
  const tile9 = Tile("tile9", "");
  tiles.push(tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9);

  const render = function () {
    // eslint-disable-next-line no-restricted-syntax
    for (const t in tiles) {
      const tileContainer = document.createElement("div");
      tileContainer.className = "tile";
      tileContainer.id = tiles[t].id;
      const tileContents = document.createElement("div");
      tileContents.className = "contents";
      tileContents.textContent = tiles[t].contents;
      tileContainer.appendChild(tileContents);
      this.gameBoardContainer.appendChild(tileContainer);
    }
    return gameBoard;
  };
  const rerender = function () {
    const tileContentsList = document.querySelectorAll(".contents");
    tileContentsList.forEach(
      (item, index) => {item.textContent = tiles[index].contents}
   
    );
  };

  const checkIfWin = (symbolToCheck) => {
    let winningPlayer;
    if (
      (tiles[0].contents === symbolToCheck &&
        tiles[1].contents === symbolToCheck &&
        tiles[2].contents === symbolToCheck) ||
      (tiles[3].contents === symbolToCheck &&
        tiles[4].contents === symbolToCheck &&
        tiles[5].contents === symbolToCheck) ||
      (tiles[6].contents === symbolToCheck &&
        tiles[7].contents === symbolToCheck &&
        tiles[8].contents === symbolToCheck) ||
      (tiles[0].contents === symbolToCheck &&
        tiles[3].contents === symbolToCheck &&
        tiles[6].contents === symbolToCheck) ||
      (tiles[1].contents === symbolToCheck &&
        tiles[4].contents === symbolToCheck &&
        tiles[7].contents === symbolToCheck) ||
      (tiles[2].contents === symbolToCheck &&
        tiles[5].contents === symbolToCheck &&
        tiles[8].contents === symbolToCheck) ||
      (tiles[0].contents === symbolToCheck &&
        tiles[4].contents === symbolToCheck &&
        tiles[8].contents === symbolToCheck) ||
      (tiles[2].contents === symbolToCheck &&
        tiles[4].contents === symbolToCheck &&
        tiles[6].contents === symbolToCheck)
    ) {
      if (introForm.getLoop().playerOne.gamePiece === symbolToCheck) {
        winningPlayer = introForm.getLoop().playerOne;
      } else {
        winningPlayer = introForm.getLoop().playerTwo;
      }
      introForm
        .getLoop()
        .endGame(winningPlayer.name, introForm.getLoop().currentBoard);
      introForm.getLoop().setGameOver();
    }
  };
  const reset = () => {
    
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].contents = "";
      tiles[i].setBlankTrue();
    }

    introForm.getLoop().currentBoard.rerender();
    if (introForm.getLoop().playerTwo.getIsTurn()) {
      introForm.getLoop().playerTwo.switchTurn();
      introForm.getLoop().playerOne.switchTurn();
    }
  };

  return { tiles, render, rerender, gameBoardContainer, checkIfWin, reset };
};



const gameLoop = function () {
  let gameOver = false;
  this.gameOver = gameOver;
  function setGameOver() {
    gameOver = true;
    return gameOver;
  }

  const playerOne = Player(introForm.getPlayerOneName(), "X", true);

  const playerTwo = Player(introForm.getPlayerTwoName(), "O", false);
  playerOne.setIsTurn();
  playerTwo.setIsTurn();
  let currentBoard = gameBoard();
  currentBoard.render();
  const tileContainers =
    currentBoard.gameBoardContainer.querySelectorAll(".contents");

  tileContainers.forEach((item, index) => {
    const tileContainer = item;
    tileContainer.addEventListener("click", () => {
      const thisTile = currentBoard.tiles[index];
      if (thisTile.getIsBlank() && !gameOver) {
        if (playerOne.getIsTurn()) {
          // set current tile in array's content
          thisTile.setTile("X");
          thisTile.setBlankFalse();
          // set corresponding HTML element's content to match
          tileContainer.textContent = thisTile.getTile();
          tileContainer.style.color = "var(--gudorange)";
          currentBoard.tiles[index].contents = thisTile.getTile();

          playerOne.switchTurn();
          playerTwo.switchTurn();

          currentBoard.checkIfWin("X");
        } else if (playerTwo.getIsTurn() && !gameOver) {
          thisTile.setTile("O");
          thisTile.setBlankFalse();
          tileContainer.style.color = "var(--ocolor)";

          tileContainer.textContent = thisTile.getTile();
          currentBoard.tiles[index].contents = thisTile.getTile();

          playerOne.switchTurn();
          playerTwo.switchTurn();

          currentBoard.checkIfWin("O");
        }
      }
    });
  });
  function endGame(winningSymbol, gameBoard) {
    const winPanel = document.createElement("div");
    introForm.resetButton.remove();
    winPanel.className = "win-panel";
    winPanel.textContent = `${winningSymbol} WINS!`;
    console.log(introForm.getLoop().currentBoard.gameBoardContainer);
    introForm
      .getLoop()
      .currentBoard.gameBoardContainer.classList.add("animation"); 
    document.body.appendChild(winPanel);
  }
  return {
    endGame,
    setGameOver,
    currentBoard,
    playerOne,
    playerTwo,
    tileContainers,
  };
};
