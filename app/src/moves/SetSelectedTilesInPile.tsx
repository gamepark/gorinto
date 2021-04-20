import GameView from "@gamepark/gorinto/types/GameView"
import ElementInPile from "../board/ElementInPile"
import {canTakeTile} from "../board/MountainPile"

export default interface SetSelectedTilesInPile {
    type: 'SetSelectedTilesInPile'
    selectedTileInPile:ElementInPile
}

export interface ResetSelectedTilesInPile{
    type:'ResetSelectedTilesInPile'
}

export const setSelectedTilesInPileMove = (x:number,y:number,z:number): SetSelectedTilesInPile => ({
    type: 'SetSelectedTilesInPile', selectedTileInPile:{x, y, z}
})

export const resetSelectedTilesInPileMove = () : ResetSelectedTilesInPile => ({
    type:'ResetSelectedTilesInPile'
})
  
export function setSelectedTilesInPath(state: GameView, move: SetSelectedTilesInPile) {
    if(canTakeTile(move.selectedTileInPile.x, move.selectedTileInPile.y, move.selectedTileInPile.z, state.tilesToTake, state.mountainBoard)){
        if (state.selectedTilesInPile === undefined || state.selectedTilesInPile === []){
            state.selectedTilesInPile = [move.selectedTileInPile]
        } else {
            if (state.selectedTilesInPile.some(e => e.x === move.selectedTileInPile.x && e.y === move.selectedTileInPile.y && e.z === move.selectedTileInPile.z)){
                state.selectedTilesInPile = state.selectedTilesInPile.filter(e => e.x !== move.selectedTileInPile.x || e.y !== move.selectedTileInPile.y || e.z !== move.selectedTileInPile.z)
            } else {
                if (state.selectedTilesInPile.length < state.tilesToTake!.quantity)
                state.selectedTilesInPile.push(move.selectedTileInPile)
                
            }
        }
    }
    
} 

export function resetSelectedTilesInPile(state:GameView, move:ResetSelectedTilesInPile){
    state.selectedTilesInPile = undefined
}