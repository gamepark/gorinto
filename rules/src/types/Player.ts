import PlayerColor from './PlayerColor'

type Player = {
  color: PlayerColor;
  understanding: number[];
  score: number;
  isFirst: boolean;
}

export default Player