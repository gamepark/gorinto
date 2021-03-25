import Element from './Element'

type Path = [PathSlot, PathSlot, PathSlot, PathSlot, PathSlot]

export default Path

type PathSlot = Element | null
