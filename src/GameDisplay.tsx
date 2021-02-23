import { Letterbox } from '@gamepark/workshop'
import {FC} from 'react'
import Board from './board/Board';
import PlayerList from './board/PlayerList';
import SeasonIndicator from './board/SeasonIndicator';
import Game from './types/Game'

const GameDisplay: FC<{game:Game}> = ({game}) => {
  
  console.log(game.season);

  return (
    <Letterbox top={0}>

      <SeasonIndicator season = {game.season} />
      <Board game={game} />
      <PlayerList game = {game}/>

    </Letterbox>

  )
}

export default GameDisplay