type Coordinates = {
  x: number
  y: number
}

export default Coordinates

export function isValidCoordinates(coordinates: Coordinates) {
  return coordinates.x >=0 && coordinates.x < 5 && coordinates.y >= 0 && coordinates.y < 5
}