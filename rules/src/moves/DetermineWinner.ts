import GameState from '../types/GameState'
import GameView from '../types/GameView'
import MoveType from '../types/MoveType'
import Player from '../types/Player'

type DetermineWinner = { type: typeof MoveType.DetermineWinner }

export default DetermineWinner

export function determineWinner(state: GameState | GameView) {
  let maxScore: number = 0
  let minTiles: number = 101
  let winners: Player[] = []

  for (let i = 0; i < state.players.length; i++) {
    if (state.players[i].score >= maxScore) {
      if (state.players[i].score > maxScore) {
        maxScore = state.players[i].score
        minTiles = tilesOwnedByAPlayer(state.players[i])
      } else {
        if (tilesOwnedByAPlayer(state.players[i]) < minTiles) {
          minTiles = tilesOwnedByAPlayer(state.players[i])
        }
      }
    }
  }

  console.log('MaxScore : ', maxScore, ', minTiles : ', minTiles)

  for (let i = 0; i < state.players.length; i++) {

    if (state.players[i].score === maxScore && tilesOwnedByAPlayer(state.players[i]) === minTiles) {
      winners.push(state.players[i])
    }

  }
  console.log(winners)

  if (winners.length === 1) {
    console.log(winners[0].color + ' remporte la partie avec ' + winners[0].score + ' points de sagesse !')
  } else {
    console.log('Les joueurs partagent une victoire harmonieuse !')
  }

  state.automaticMovePhase = undefined
}

function tilesOwnedByAPlayer(player: Player): number {
  return player.understanding.reduce((sum, element) => sum + element, 0)
}
