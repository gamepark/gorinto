import Element from './Element'
import EndOfSeasonStep from './EndOfSeasonStep'
import Path from './Path'
import Player from './Player'
import PlayerColor from './PlayerColor'
import TilesToTake from './TilesToTake'

type GameState = {
  season: number;
  activePlayer?: PlayerColor;
  players: Player[];
  firstPlayer: PlayerColor;
  keyElements: [Element, Element];
  goals: [number, number];
  elementTilesBag: Element[];
  horizontalPath: Path;
  verticalPath: Path;
  mountainBoard: Element[][][];
  tilesToTake?: TilesToTake;
  endOfSeasonStep?: EndOfSeasonStep;
}

export default GameState