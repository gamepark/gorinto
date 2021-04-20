import Element from "@gamepark/gorinto/types/Element"
import ElementInPath from "../board/ElementInPath"
import GameView from "@gamepark/gorinto/types/GameView"
import PathType from "@gamepark/gorinto/types/PathType"

  export default interface SetSelectedTileInPath {
    type: 'SetSelectedTileInPath'
    selectedTileInPath:ElementInPath|undefined
  }

  export interface ResetSelectedTileInPath {
    type:'ResetSelectedTileInPath'
  }

  export const setSelectedTileInPathMove = (position:number, path:PathType, element:Element): SetSelectedTileInPath => ({
    type: 'SetSelectedTileInPath', selectedTileInPath:{path, position, element}
  })

  export const resetSelectedTileInPathMove = () : ResetSelectedTileInPath => ({
    type:'ResetSelectedTileInPath'
  })
  
  export function setSelectedTileInPath(state: GameView, move: SetSelectedTileInPath) {
    if (state.selectedTileInPath?.path === move.selectedTileInPath?.path && state.selectedTileInPath?.position === move.selectedTileInPath?.position){
      state.selectedTileInPath = undefined
    } else {
      state.selectedTileInPath = move.selectedTileInPath
    }

  } 

  export function resetSelectedTileInPath(state: GameView, move: ResetSelectedTileInPath){
    state.selectedTileInPath = undefined
  }