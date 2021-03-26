enum PlayerColor {
  White, Black, Red, Yellow
}

export default PlayerColor

export const playerColors = Object.values(PlayerColor).filter(isPlayerColor)

function isPlayerColor(arg: string | PlayerColor): arg is PlayerColor {
  return typeof arg === 'number'
}