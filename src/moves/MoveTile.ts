import MoveType from '../types/MoveType'

type MoveTile = { 
    type : typeof MoveType.MoveTile 
    path : "horizontal" | "vertical"
    x : number
    y : number
                  
}

export default MoveTile