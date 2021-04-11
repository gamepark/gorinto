import GameState from '../types/GameState'
import GameView from '../types/GameView'
import Goal from '../types/Goal'
import Player from '../types/Player'

export const Goal1: Goal = {
  text: t => t('Score each stack that is the same height as one or more of your other stacks.'),
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
  text: t => t('Score each stack that is a different height than all of your other stacks.'),
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
  text: t => t('Score each stack with an odd number of tiles.'),
  conflictLetter: 'B',
  score: (player: Player) => player.understanding.reduce((sum, understanding) => understanding % 2 === 1 ? sum + understanding : sum, 0)
}

export const Goal4: Goal = {
  text: t => t('Score each stack with an even number of tiles.'),
  conflictLetter: 'B',
  score: (player: Player) => player.understanding.reduce((sum, understanding) => understanding % 2 === 0 ? sum + understanding : sum, 0)
}

export const Goal5: Goal = {
  text: t => t('For each element, the player or players with the tallest stack (of at least 1 tile) scores 3.'),
  hint: t => t('Resolve the five elements separately'),
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
  text: t => t('For each element, the player or players with the shortest stack (of at least 1 tile) scores 3.'),
  hint: t => t('Resolve the five elements separately'),
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
  text: t => t('Score each stack that is a different height than the stack in the middle.'),
  hint: t => t('Imagine your stacks lined up from shortest to tallest (including stacks of zero).'),
  conflictLetter: 'D',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted.reduce((sum, understanding) => understanding !== sorted[2] ? sum + understanding : sum, 0)
  }
}

export const Goal8: Goal = {
  text: t => t('Score the stack in the middle three times.'),
  hint: t => t('Imagine your stacks lined up from shortest to tallest (including stacks of zero).'),
  conflictLetter: 'D',
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 3 * sorted[2]
  }
}

export const Goal9: Goal = {
  text: t => t('Score your tallest stack and also any stack tied with it. Score your shortest stack and also any stack tied with it.'),
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted.reduce((sum, understanding) => understanding === sorted[0] ? sum + understanding : sum, 0)
      + sorted.reduce((sum, understanding) => understanding === sorted[4] ? sum + understanding : sum, 0)
  }
}

export const Goal10: Goal = {
  text: t => t('Score your tallest stack. Score your shortest stack (of at least one tile) twice.'),
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return sorted[4] + 2 * (sorted.find(understanding => understanding > 0) ?? 0)
  }
}

export const Goal11: Goal = {
  text: t => t('Score twice the difference between your tallest stack and your shortest stack.'),
  hint: t => t('A stack of zero may be counted as your shortest stack.'),
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 2 * (sorted[4] - sorted[0])
  }
}

export const Goal12: Goal = {
  text: t => t('If you have any empty stacks, score zero. Otherwise, score your shortest stack seven times.'),
  score: (player: Player) => {
    const sorted: number[] = (Array.from(player.understanding)).sort((a, b) => a - b)
    return 7 * sorted[0]
  }
}

export const Goals: Goal[] = [
  Goal1, Goal2, Goal3, Goal4, Goal5, Goal6, Goal7, Goal8, Goal9, Goal10, Goal11, Goal12
]