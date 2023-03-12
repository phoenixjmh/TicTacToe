/* eslint-disable guard-for-in */

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

  return { name, getIsTurn, setIsTurn, switchTurn };
}
function Tile(id, contents, isBlank = true) {
  this.id = id;
  this.contents = contents;

  // eslint-disable-next-line no-return-assign
  const setTile = (newContents) => (this.contents = newContents);
  this.getTile = () => this.contents;

  function setBlankFalse() {
    isBlank = false;
    this.isBlank = isBlank;
    return this.isBlank;
  }
  function getIsBlank() {
    this.isBlank = isBlank;
    return this.isBlank;
  }

  return { setTile, getTile, id, contents, setBlankFalse, getIsBlank };
}
const gameBoard = (function () {
  const gameBoardContainer = document.querySelector(".game-board");
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

  const render = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const t in tiles) {
      const tileContainer = document.createElement("div");
      tileContainer.className = "tile";
      tileContainer.id = tiles[t].id;
      const tileContents = document.createElement("div");
      tileContents.className = "contents";
      tileContents.textContent = tiles[t].contents;
      tileContainer.appendChild(tileContents);
      gameBoardContainer.appendChild(tileContainer);
    }
  };

 
  const checkIfWin = (symbolToCheck) => {
    if (
      tiles[0].contents === symbolToCheck &&
      tiles[1].contents === symbolToCheck &&
      tiles[2].contents === symbolToCheck||
    
      tiles[3].contents === symbolToCheck &&
      tiles[4].contents === symbolToCheck &&
      tiles[5].contents === symbolToCheck||
     
      tiles[6].contents === symbolToCheck &&
      tiles[7].contents === symbolToCheck &&
      tiles[8].contents === symbolToCheck||
    
      tiles[0].contents === symbolToCheck &&
      tiles[3].contents === symbolToCheck &&
      tiles[6].contents === symbolToCheck||
    
      tiles[1].contents === symbolToCheck &&
      tiles[4].contents === symbolToCheck &&
      tiles[7].contents === symbolToCheck||
   
      tiles[2].contents === symbolToCheck &&
      tiles[5].contents === symbolToCheck &&
      tiles[8].contents === symbolToCheck||
    
      tiles[0].contents === symbolToCheck &&
      tiles[4].contents === symbolToCheck &&
      tiles[8].contents === symbolToCheck||
   
      tiles[2].contents === symbolToCheck &&
      tiles[4].contents === symbolToCheck &&
      tiles[6].contents === symbolToCheck
    ) {
      gameLoop.endGame(symbolToCheck);
      gameLoop.setGameOver();
    }
  };

  return { tiles, render, gameBoardContainer, checkIfWin };
})();

// eslint-disable-next-line func-names, no-unused-vars
const gameLoop = (function () {
  let gameOver = false;
  this.gameOver = gameOver;
  function setGameOver() {
    gameOver = true;
    return gameOver;
  }

  const playerOne = Player("Player1", "X", true);

  const playerTwo = Player("Player2", "O", false);
  playerOne.setIsTurn();          
  playerTwo.setIsTurn();
  
  gameBoard.render();
  const tileContainers = gameBoard.gameBoardContainer.querySelectorAll(".contents");

  tileContainers.forEach((item, index) => {
    const tileContainer = item;
    tileContainer.addEventListener("click", () => {
      const thisTile = gameBoard.tiles[index];
      if (thisTile.getIsBlank() && !gameOver) {
        if (playerOne.getIsTurn()) {
          // set current tile in array's content 
          thisTile.setTile("X");
          thisTile.setBlankFalse();
          // set corresponding HTML element's content to match
          tileContainer.textContent = thisTile.getTile();
          gameBoard.tiles[index].contents = thisTile.getTile();
          
          playerOne.switchTurn();
          playerTwo.switchTurn();

          gameBoard.checkIfWin("X");
        } else if (playerTwo.getIsTurn() && !gameOver) {
          thisTile.setTile("O");
          thisTile.setBlankFalse();

          tileContainer.textContent = thisTile.getTile();
          gameBoard.tiles[index].contents = thisTile.getTile();
          
          playerOne.switchTurn();
          playerTwo.switchTurn();
          
          gameBoard.checkIfWin("O");
        }
      }
    });
  });
  function endGame(winningSymbol) {
    
    const winPanel = document.createElement("div");
    winPanel.className = "win-panel";
    winPanel.textContent = `${winningSymbol} WINS!`;

    
    document.body.appendChild(winPanel);
  }
  return { endGame, setGameOver };
})();
