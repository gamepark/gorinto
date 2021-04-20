import Element from "./Element"
import PathType from "./PathType"

type ElementInPath = {
  path: PathType,
  position: number,
  element?:Element | null,
  hoverPile?: (pileHeight: number) => void
}

export default ElementInPath