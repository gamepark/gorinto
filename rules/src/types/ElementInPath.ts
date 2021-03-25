import PathType from './PathType'

type ElementInPath = {
  type: 'ElementInPath',
  path: PathType,
  position: number,
  hoverPile: (pileHeight: number) => void
}

export default ElementInPath