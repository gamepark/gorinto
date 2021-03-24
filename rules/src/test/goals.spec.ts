import {Goal1, Goal10, Goal11, Goal12, Goal2, Goal3, Goal4, Goal5, Goal6, Goal7, Goal8, Goal9} from '../cards/Goals'
import GameState from '../types/GameState'
import Player from '../types/Player'
import PlayerColor from '../types/PlayerColor'

describe('Test Goals.ts', () => {
  test('Goal1', () => {
    expect(Goal1.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(6)
    expect(Goal1.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(8)
    expect(Goal1.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(9)
    expect(Goal1.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(18)
    expect(Goal1.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(15)
    expect(Goal1.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(0)
  })

  test('Goal2', () => {
    expect(Goal2.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(0)
    expect(Goal2.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(8)
    expect(Goal2.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(0)
    expect(Goal2.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(6)
    expect(Goal2.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(0)
    expect(Goal2.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(10)
  })

  test('Goal3', () => {
    expect(Goal3.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(6)
    expect(Goal3.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(8)
    expect(Goal3.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(9)
    expect(Goal3.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(22)
    expect(Goal3.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(15)
    expect(Goal3.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(4)
  })

  test('Goal4', () => {
    expect(Goal4.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(0)
    expect(Goal4.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(8)
    expect(Goal4.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(0)
    expect(Goal4.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(2)
    expect(Goal4.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(0)
    expect(Goal4.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(6)
  })

  test('Goal5', () => {
    const test1 = createGameWithUnderstanding([0, 3, 0, 0, 3], [4, 2, 6, 0, 0])
    expect(Goal5.score(test1.players[0], test1)).toBe(6)
    const test2 = createGameWithUnderstanding([5, 3, 4, 4, 0], [4, 2, 6, 0, 0], [3, 7, 1, 4, 0])
    expect(Goal5.score(test2.players[0], test2)).toBe(6)
    const test3 = createGameWithUnderstanding([1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [2, 2, 2, 2, 2], [0, 3, 0, 3, 0])
    expect(Goal5.score(test3.players[0], test3)).toBe(9)
  })

  test('Goal6', () => {
    const test1 = createGameWithUnderstanding([0, 3, 0, 0, 3], [4, 2, 6, 0, 0])
    expect(Goal6.score(test1.players[0], test1)).toBe(3)
    const test2 = createGameWithUnderstanding([5, 3, 4, 4, 0], [4, 2, 6, 0, 0], [3, 7, 1, 4, 0])
    expect(Goal6.score(test2.players[0], test2)).toBe(3)
    const test3 = createGameWithUnderstanding([1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [2, 2, 2, 2, 2], [0, 3, 0, 3, 0])
    expect(Goal6.score(test3.players[0], test3)).toBe(6)
  })

  test('Goal7', () => {
    expect(Goal7.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(6)
    expect(Goal7.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(8)
    expect(Goal7.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(6)
    expect(Goal7.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(21)
    expect(Goal7.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(0)
    expect(Goal7.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(8)
  })

  test('Goal8', () => {
    expect(Goal8.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(0)
    expect(Goal8.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(12)
    expect(Goal8.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(3)
    expect(Goal8.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(9)
    expect(Goal8.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(9)
    expect(Goal8.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(6)
  })

  test('Goal9', () => {
    expect(Goal9.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(6)
    expect(Goal9.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(5)
    expect(Goal9.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(9)
    expect(Goal9.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(19)
    expect(Goal9.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(15)
    expect(Goal9.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(4)
  })

  test('Goal10', () => {
    expect(Goal10.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(9)
    expect(Goal10.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(11)
    expect(Goal10.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(5)
    expect(Goal10.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(11)
    expect(Goal10.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(9)
    expect(Goal10.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(6)
  })

  test('Goal11', () => {
    expect(Goal11.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(6)
    expect(Goal11.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(10)
    expect(Goal11.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(4)
    expect(Goal11.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(16)
    expect(Goal11.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(0)
    expect(Goal11.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(8)
  })

  test('Goal12', () => {
    expect(Goal12.score(withUnderStanding([0, 3, 0, 0, 3]), anyState)).toBe(0)
    expect(Goal12.score(withUnderStanding([5, 3, 4, 4, 0]), anyState)).toBe(0)
    expect(Goal12.score(withUnderStanding([1, 3, 1, 1, 3]), anyState)).toBe(7)
    expect(Goal12.score(withUnderStanding([3, 9, 9, 1, 2]), anyState)).toBe(7)
    expect(Goal12.score(withUnderStanding([3, 3, 3, 3, 3]), anyState)).toBe(21)
    expect(Goal12.score(withUnderStanding([0, 1, 2, 3, 4]), anyState)).toBe(0)
  })
})

function withUnderStanding(understanding: [number, number, number, number, number], color: PlayerColor = PlayerColor.white): Player {
  return {color, understanding, score: 0}
}

const anyState: GameState = {
  firstPlayer: PlayerColor.white,
  season: 1,
  players: [],
  elementTilesBag: [],
  twoKeyElementCards: [0, 1],
  horizontalPath: [],
  verticalPath: [],
  twoGoals: [0, 1],
  mountainBoard: [],
  automaticMovePhase: undefined
}

function createGameWithUnderstanding(...understandings: [number, number, number, number, number][]): GameState {
  const colors = Object.values(PlayerColor)
  return {
    firstPlayer: PlayerColor.white,
    season: 1,
    players: understandings.map((understanding, index) => withUnderStanding(understanding, colors[index])),
    elementTilesBag: [],
    twoKeyElementCards: [0, 1],
    horizontalPath: [],
    verticalPath: [],
    twoGoals: [0, 1],
    mountainBoard: [],
    automaticMovePhase: undefined
  }
}