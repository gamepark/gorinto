import Coordinates from './Coordinates'
import Element from './Element'

type TilesToTake = {
  quantity: number
  coordinates: Coordinates[]
  element?: Element
}

export default TilesToTake