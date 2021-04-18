import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Goal from '../types/Goal'
import Player from '../types/Player'

export const Goal1: Goal = {
  text: 'goal1',
  conflictLetter: 'A',
  score: (player: Player) => {
    return player.understanding.reduce((sum, understanding, index) => {
      if (player.understanding.some((otherUnderstanding, otherIndex) => otherIndex !== index && otherUnderstanding === understanding)) {
        return sum + understanding
      } else {
        return sum
      }
    }, 0)
  }
}

export const Goal2: Goal = {
  text: 'goal2',
  conflictLetter: 'A',
  score: (player: Player) => {
    return player.understanding.reduce((sum, understanding, index) => {
      if (player.understanding.every((otherUnderstanding, otherIndex) => otherIndex === index || otherUnderstanding !== understanding)) {
        return sum + understanding
      } else {
        return sum
      }
    }, 0)
  }
}
export const Goal3: Goal = {
  text: 'goal3',
  conflictLetter: 'B',
  score: (player: Player) => player.understanding.reduce((sum, understanding) => understanding % 2 === 1 ? sum + understanding : sum, 0)
}

export const Goal4: Goal = {
  text: 'goal4',
  conflictLetter: 'B',
  score: (player: Player) => player.understanding.reduce((sum, understanding) => understanding % 2 === 0 ? sum + understanding : sum, 0)
}

export const Goal5: Goal = {
  text: 'goal5',
  hint: t => t('goal.c.hint'),
  conflictLetter: 'C',
  score: (player: Player, state: GameState | GameView) => player.understanding.reduce((sum, understanding, index) => {
    const otherPlayers = state.players.filter(({color}) => player.color !== color)
    if (understanding > 0 && otherPlayers.every(otherPlayer => otherPlayer.understanding[index] <= understanding)) {
      return sum + 3
    } else {
      return sum
    }
  }, 0)
}

export const Goal6: Goal = {
  text: 'goal6',
  hint: t => t('goal.c.hint'),
  conflictLetter: 'C',
  score: (player: Player, state: GameState | GameView) => player.understanding.reduce((sum, understanding, index) => {
    const otherPlayers = state.players.filter(({color, understanding}) => player.color !== color && understanding[index] > 0)
    if (understanding > 0 && otherPlayers.every(otherPlayer => otherPlayer.understanding[index] >= understanding)) {
      return sum + 3
    } else {
      return sum
    }
  }, 0)
}

export const Goal7: Goal = {
  text: 'goal7',
  hint: t => t('goal.d.hint'),
  conflictLetter: 'D',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted.reduce((sum, understanding) => understanding !== sorted[2] ? sum + understanding : sum, 0)
  }
}

export const Goal8: Goal = {
  text: 'goal8',
  hint: t => t('goal.d.hint'),
  conflictLetter: 'D',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 3 * sorted[2]
  }
}

export const Goal9: Goal = {
  text: 'goal9',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted.reduce((sum, understanding) => understanding === sorted[0] || understanding === sorted[4] ? sum + understanding : sum, 0)
  }
}

export const Goal10: Goal = {
  text: 'goal10',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted[4] + 2 * (sorted.find(understanding => understanding > 0) ?? 0)
  }
}

export const Goal11: Goal = {
  text: 'goal11',
  hint: t => t('goal.11.hint'),
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 2 * (sorted[4] - sorted[0])
  }
}

export const Goal12: Goal = {
  text: 'goal12',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 7 * sorted[0]
  }
}

export const Goals: Goal[] = [
  Goal1, Goal2, Goal3, Goal4, Goal5, Goal6, Goal7, Goal8, Goal9, Goal10, Goal11, Goal12
]