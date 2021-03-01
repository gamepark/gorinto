import ElementTile from "./ElementTile"
import Player from "./Player"
import PlayerColor from "./PlayerColor"

type Game = {
    season: number;
    activePlayer? : PlayerColor;
    players : Player[];
    twoKeyElementCards : number[];
    twoGoals : number[];
    elementTilesDeck : ElementTile[];
    horizontalPath : ElementTile[];
    verticalPath : ElementTile[];
    mountainBoard : ElementTile[][][];
}

export default Game