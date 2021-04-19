import Element from '@gamepark/gorinto/types/Element'
import PathType from '@gamepark/gorinto/types/PathType'

type ElementInPath = {
  path: PathType,
  position: number,
  element?:Element | null,
  hoverPile?: (pileHeight: number) => void
}

export default ElementInPath