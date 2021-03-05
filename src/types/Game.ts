import Element from "./Element"
import ElementTile from "./ElementTile"
import Player from "./Player"
import PlayerColor from "./PlayerColor"

type Game = {
    season: number;
    activePlayer? : PlayerColor;
    players : Player[];
    twoKeyElementCards : number[];
    twoGoals : number[];
    elementTilesDeck : ElementTile[];       // Make a number Array
    horizontalPath : (ElementTile | null)[];         // Make a number Array
    verticalPath : (ElementTile | null)[];           // Make a number Array
    mountainBoard : ElementTile[][][];      // Make a number Array
    tilesToTake? : {quantity : number, coordinates:{x:number,y:number}[], element?:Element};
}

export default Game