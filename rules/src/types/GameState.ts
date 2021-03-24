import AutomaticMovePhase from './AutomaticMovePhase'
import Element from './Element'
import Player from './Player'
import PlayerColor from './PlayerColor'
import TilesToTake from './TilesToTake'

type GameState = {
  season: number;
  activePlayer?: PlayerColor;
  players: Player[];
  firstPlayer: PlayerColor;
  twoKeyElementCards: [Element, Element];
  twoGoals: [number, number];
  elementTilesBag: Element[];
  horizontalPath: (Element | null)[];
  verticalPath: (Element | null)[];
  mountainBoard: Element[][][];
  tilesToTake?: TilesToTake;
  automaticMovePhase: AutomaticMovePhase | undefined;
}

export default GameState