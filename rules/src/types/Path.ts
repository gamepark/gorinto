import Element from './Element'

type Path = PathSlot[]

export default Path

type PathSlot = Element | null

export function takeElementFromPath(path: Path, index: number) {
  const element = path[index]
  path[index] = null
  return element
}