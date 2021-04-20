import Element from "@gamepark/gorinto/types/Element"
import ElementInPath from "@gamepark/gorinto/types/ElementInPath"
import GameView from "@gamepark/gorinto/types/GameView"
import PathType from "@gamepark/gorinto/types/PathType"

export default interface SetSelectedTileInPath {
    type: 'SetSelectedTileInPath'
    selectedTileInPath:ElementInPath|undefined
  }

  export const setSelectedTileInPathMove = (position:number, path:PathType): SetSelectedTileInPath => ({
    type: 'SetSelectedTileInPath', selectedTileInPath:{path, position}
  })
  
  export function setSelectedTileInPath(state: GameView, move: SetSelectedTileInPath) {
    if (state.selectedTileInPath?.path === move.selectedTileInPath?.path && state.selectedTileInPath?.position === move.selectedTileInPath?.position){
      state.selectedTileInPath = undefined
    } else {
      state.selectedTileInPath = move.selectedTileInPath
    }

  } 