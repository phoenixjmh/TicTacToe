/* eslint-disable guard-for-in */

function Player(name,gamePiece,isTurn){
    this.name = name;
    
    this.gamePiece=gamePiece;

    function getIsTurn()
    {
        return this.isTurn;
    }
    function setIsTurn()
    {
        this.isTurn =isTurn;
        return this.isTurn;
    }
    function switchTurn()
    {
        this.isTurn=!this.isTurn;
        return this.isTurn;
    }

    return{name,getIsTurn,setIsTurn,switchTurn};
}
function Tile(id,contents){
    this.id = id;
    this.contents=contents;

    // eslint-disable-next-line no-return-assign
    const setTile = newContents=> this.contents=newContents;
    const getTile = ()=>this.contents;
    

    return {setTile,getTile,id,contents};
}
let gameBoard =(function()
{
    const gameBoardContainer = document.querySelector('.game-board');
    let tiles = [];
    let tile1 = Tile('tile1','');
    let tile2 = Tile('tile2','');
    let tile3 = Tile('tile3','');
    let tile4 = Tile('tile4','');
    let tile5 = Tile('tile5','');
    let tile6 = Tile('tile6','');
    let tile7 = Tile('tile7','');
    let tile8 = Tile('tile8','');
    let tile9 = Tile("tile9", '');
    tiles.push(tile1,tile2,tile3,tile4,tile5,tile6,tile7,tile8,tile9);

    let render=()=>{
        
       
        // eslint-disable-next-line no-restricted-syntax
        for(let t in tiles)
        {
            
            let tileContainer = document.createElement('div');
            tileContainer.className='tile';
            tileContainer.id = tiles[t].id;
            let tileContents = document.createElement('div')
            tileContents.className = 'contents';
            tileContents.textContent = tiles[t].contents;
            tileContainer.appendChild(tileContents);
            gameBoardContainer.appendChild(tileContainer);
        }
    };
    
    return{tiles,render,gameBoardContainer};

}());

// eslint-disable-next-line func-names, no-unused-vars
const gameLoop = (function(){
    const playerOne = Player('Player1','X',true);
   
    const playerTwo = Player("Player2", "O",false);
    playerOne.setIsTurn();
    playerTwo.setIsTurn();
    console.log(playerOne);
    console.log(playerTwo);
    gameBoard.render();
    const tileContainers = gameBoard.gameBoardContainer.querySelectorAll('.tile');

    tileContainers.forEach((item,index) =>{
        item.addEventListener('click', () =>{
            
            
            const thisTile = gameBoard.tiles[index];
            console.log(thisTile.getTile());
            if(playerOne.getIsTurn())
            {
                thisTile.setTile('X');
                item.textContent=thisTile.getTile();
                playerOne.switchTurn();
                playerTwo.switchTurn();
                
                
            }
           else 
            {
                thisTile.setTile('O');
                item.textContent = thisTile.getTile();
                playerOne.switchTurn();
                playerTwo.switchTurn();
            }

        })
    })
    
}());



