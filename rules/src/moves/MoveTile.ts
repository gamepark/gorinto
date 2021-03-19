import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type MoveTile = { 
    type : typeof MoveType.MoveTile 
    path : "horizontal" | "vertical"
    x : number
    y : number
                  
}

export default MoveTile

export function isMoveTile(move:Move|MoveView):move is MoveTile{
    return move.type === MoveType.MoveTile
}