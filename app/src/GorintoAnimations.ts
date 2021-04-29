import GameView from "@gamepark/gorinto/types/GameView";
import MoveType from "@gamepark/gorinto/types/MoveType";
import { MoveView } from "@gamepark/gorinto/types/MoveView";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import { Animations } from "@gamepark/react-client";

const gorintoAnimations : Animations<GameView, MoveView, PlayerColor> = {

    getAnimationDuration(move:MoveView,{action, state, playerId}){

        if(move.type === MoveType.MoveTile){
            return action.playerId === playerId ? 0 : 1.5            // In seconds
        } else if (move.type === MoveType.TakeTile){
            return action.playerId === playerId ? 0 : 2
        } else if (move.type === MoveType.MoveSeasonMarker){
            return 1
        } else if (move.type === MoveType.RemoveTileOnPath){
            return (state.isTacticalRemove === true ? action.playerId === playerId ? 0 : 2 : 2)
        } else if (move.type === MoveType.SwitchFirstPlayer){
            return 1
        } else if (move.type === MoveType.ScoreGoals){
            return 4
        }

        return 0              

    }

}

export default gorintoAnimations