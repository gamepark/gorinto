import ElementTile from "./ElementTile"
import GoalCard from "./GoalCard"
import KeyElementCard from "./KeyElementCard"
import Player from "./Player"
import PlayerColor from "./PlayerColor"

type Game = {
    season: number;
    activePlayer? : PlayerColor;
    players : Player[];
    twoKeyElementCards : KeyElementCard[];
    twoGoalCards : GoalCard[];
    elementTilesDeck : ElementTile[];
    HorizontalPath : ElementTile[];
    VerticalPath : ElementTile[];
}

export default Game