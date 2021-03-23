import AutomaticMovePhase from './AutomaticMovePhase'
import Player from './Player'
import PlayerColor from './PlayerColor'
import TilesToTake from './TilesToTake'

type GameState = {
  season: number;
  activePlayer?: PlayerColor;
  players: Player[];
  twoKeyElementCards: number[];
  twoGoals: number[];
  elementTilesBag: number[];
  horizontalPath: (number | null)[];
  verticalPath: (number | null)[];
  mountainBoard: number[][][];
  tilesToTake?: TilesToTake;
  automaticMovePhase: AutomaticMovePhase | undefined;
}

export default GameState