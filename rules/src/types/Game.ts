import AutomaticMovePhase from "./AutomaticMovePhase"
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
    elementTilesBag : number[];       
    horizontalPath : (number | null)[];         
    verticalPath : (number | null)[];          
    mountainBoard : number[][][];      
    tilesToTake? : {quantity : number, coordinates:{x:number,y:number}[], element?:Element};
    automaticMovePhase : AutomaticMovePhase | undefined;
}

export default Game