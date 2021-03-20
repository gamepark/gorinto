import Move from '../types/Move'
import MoveType from '../types/MoveType'
import { MoveView } from '../types/MoveView'

type TakeTile = { 
    type: typeof MoveType.TakeTile 
    coordinates : {x:number,y:number,z?:number}    

}

export default TakeTile

export function isTakeTile(move:Move|MoveView):move is TakeTile{
    return move.type === MoveType.TakeTile
}