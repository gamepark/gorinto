import MoveType from '../types/MoveType'

type TakeTile = { 
    type: typeof MoveType.TakeTile 
    coordinates : {x:number,y:number,z?:number}    

}

export default TakeTile