import Gorinto from '../Gorinto'
import GameState from '../types/GameState'
import Player from '../types/Player'
import PlayerColor, {playerColors} from '../types/PlayerColor'

describe('Test ranking in Gorinto.ts', () => {
  test('First player with highest score', () => {
    const game = new Gorinto({...anyState, players: createPlayersWithScores(65, 42)})
    expect(game.rankPlayers(game.state.players[0].color, game.state.players[1].color)).toBeLessThan(0)
    expect(game.rankPlayers(game.state.players[1].color, game.state.players[0].color)).toBeGreaterThan(0)
  })
  test('Third player with highest score', () => {
    const game = new Gorinto({...anyState, players: createPlayersWithScores(31, 74, 75)})
    expect(game.rankPlayers(game.state.players[1].color, game.state.players[2].color)).toBeGreaterThan(0)
    expect(game.rankPlayers(game.state.players[2].color, game.state.players[0].color)).toBeLessThan(0)
    expect(game.rankPlayers(game.state.players[1].color, game.state.players[0].color)).toBeLessThan(0)
  })
  test('Tie breaker with lowest understanding', () => {
    const game = new Gorinto({
      ...anyState, players: [
        {color: PlayerColor.White, score: 53, understanding: [5, 4, 6, 1, 2]},
        {color: PlayerColor.Black, score: 53, understanding: [2, 3, 6, 8, 0]}
      ]
    })
    expect(game.rankPlayers(game.state.players[0].color, game.state.players[1].color)).toBeLessThan(0)
    expect(game.rankPlayers(game.state.players[1].color, game.state.players[0].color)).toBeGreaterThan(0)
  })
  test('Tied players', () => {
    const game = new Gorinto({
      ...anyState, players: [
        {color: PlayerColor.White, score: 36, understanding: [5, 4, 6, 1, 2]},
        {color: PlayerColor.Black, score: 36, understanding: [2, 3, 6, 7, 0]}
      ]
    })
    expect(game.rankPlayers(game.state.players[0].color, game.state.players[1].color)).toBe(0)
  })
})

function createPlayersWithScores(...scores: number[]): Player[] {
  return scores.map((score, index) => ({color: playerColors[index], understanding: [0, 0, 0, 0, 0], score}))
}

const anyState: GameState = {
  firstPlayer: PlayerColor.White,
  season: 1,
  players: [],
  elementTilesBag: [],
  keyElements: [0, 1],
  horizontalPath: [null, null, null, null, null],
  verticalPath: [null, null, null, null, null],
  goals: [0, 1],
  mountainBoard: [],
  endOfSeasonStep: undefined
}