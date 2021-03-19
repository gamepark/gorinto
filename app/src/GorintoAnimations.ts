import GameView from "@gamepark/gorinto/types/GameView";
import MoveType from "@gamepark/gorinto/types/MoveType";
import { MoveView } from "@gamepark/gorinto/types/MoveView";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import { Animations } from "@gamepark/react-client";

const gorintoAnimations : Animations<GameView, MoveView, PlayerColor> = {

    getAnimationDuration(move:MoveView,{action,playerId}){

        if(move.type === MoveType.MoveTile){
            return action.playerId === playerId ? 0 : 1            // In seconds
        }

        return 0              

    }

}

export default gorintoAnimations