import {SequentialGame} from '@gamepark/workshop'

type GameType = SequentialGame

// @ts-ignore
const GorintoRules: GameType = {
  setup(): any {
    return {}
  },
  getPlayerIds(game: any): any[] {
    console.log(game)
    return [];
  },
  getPlayerName(playerId: any, t: (name: string) => string): string {
    console.log(playerId)
    return t('');
  },
  getActivePlayer(game: any): any | undefined {
    console.log(game)
    return undefined;
  },
  getLegalMoves(game: any): any[] {
    console.log(game)
    return [];
  },
  play(move: any, game: any, playerId: any): void {
    console.log(move)
    console.log(game)
    console.log(playerId)
  }
}

export default GorintoRules