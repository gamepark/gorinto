enum Landscape {
  Peak, Waves, Mesa, Lake, Hill
}

export default Landscape

export const landscapes = Object.values(Landscape).filter(isLandscape)

function isLandscape(arg: string | Landscape): arg is Landscape {
  return typeof arg === 'number'
}

export function getLandscapeDiagram(landscape: Landscape) {
  switch (landscape) {
    case Landscape.Peak:
      return [
        [2, 2, 2, 2, 2],
        [2, 3, 3, 3, 2],
        [2, 3, 4, 3, 2],
        [2, 3, 3, 3, 2],
        [2, 2, 2, 2, 2]
      ]
    case Landscape.Waves:
      return [
        [2, 3, 2, 3, 2],
        [2, 3, 2, 3, 2],
        [2, 3, 2, 3, 2],
        [2, 3, 2, 3, 2],
        [2, 3, 2, 3, 2]
      ]
    case Landscape.Mesa:
      return [
        [1, 2, 1, 2, 1],
        [2, 4, 4, 4, 2],
        [1, 4, 4, 4, 1],
        [2, 4, 4, 4, 2],
        [1, 2, 1, 2, 1]
      ]
    case Landscape.Lake:
      return [
        [3, 3, 3, 3, 3],
        [3, 2, 1, 2, 3],
        [3, 1, 0, 1, 3],
        [3, 2, 1, 2, 3],
        [3, 3, 3, 3, 3]
      ]
    case Landscape.Hill:
      return [
        [1, 3, 4, 3, 1],
        [1, 3, 4, 3, 1],
        [1, 3, 4, 3, 1],
        [1, 3, 4, 3, 1],
        [1, 3, 4, 3, 1]
      ]
  }
}