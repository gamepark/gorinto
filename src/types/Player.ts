import Element from "./Element";
import PlayerColor from "./PlayerColor";

type Player = {
    color:PlayerColor;
    understanding : { [key in Element] :number};
    score: number;
    isFirst:boolean;
}

export default Player