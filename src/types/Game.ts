import ElementTile from "./ElementTile"
import KeyElementCard from "./KeyElementCard"
import Player from "./Player"
import PlayerColor from "./PlayerColor"

type Game = {
    season: number;
    activePlayer? : PlayerColor;
    players : Player[];
    twoKeyElementCards : KeyElementCard[];
    twoGoals : number[];
    elementTilesDeck : ElementTile[];
    horizontalPath : ElementTile[];
    verticalPath : ElementTile[];
    mountainBoard : ElementTile[][][];
}

export default Game