import PlayerColor from './PlayerColor'

type Player = {
  color: PlayerColor;
  understanding: [number, number, number, number, number];
  score: number;
}

export default Player