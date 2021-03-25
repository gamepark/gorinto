import Coordinates, {isValidCoordinates} from './Coordinates'

enum Element {
  Void, Wind, Fire, Water, Earth
}

export default Element

export const elements = [Element.Void, Element.Wind, Element.Fire, Element.Water, Element.Earth]

export const numberOfEachElement = 20

export function getElementPattern(element: Element, {x, y}: Coordinates): Coordinates[] {
  switch (element) {
    case Element.Void:
      return [[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([deltaX, deltaY]) => ({x: x + deltaX, y: y + deltaY})).filter(isValidCoordinates)
    case Element.Wind:
      return [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([deltaX, deltaY]) => ({x: x + deltaX, y: y + deltaY})).filter(isValidCoordinates)
    case Element.Fire:
      return [0, 1, 2, 3, 4].filter(deltaY => deltaY !== y).map(y => ({x, y}))
    case Element.Water:
      return [0, 1, 2, 3, 4].filter(deltaX => deltaX !== x).map(x => ({x, y}))
    case Element.Earth:
      return [{x, y}]
  }
}