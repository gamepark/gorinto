import Element from './Element'

type TilesToTake = {
  quantity: number
  coordinates: { x: number, y: number }[]
  element?: Element
}

export default TilesToTake