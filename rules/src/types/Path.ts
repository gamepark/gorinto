import Element from './Element'

type Path = [PathSlot, PathSlot, PathSlot, PathSlot, PathSlot]

export default Path

type PathSlot = Element | null

export function takeElementFromPath(path: Path, index: number) {
  const element = path[index]
  path[index] = null
  return element
}