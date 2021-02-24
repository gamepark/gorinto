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
}

export default Game