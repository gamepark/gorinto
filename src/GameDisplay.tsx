import { Letterbox } from '@gamepark/workshop'
import {FC} from 'react'
import Board from './board/Board';
import CardsList from './board/CardsList';
import PlayerList from './board/PlayerList';
import SeasonIndicator from './board/SeasonIndicator';
import Game from './types/Game'

const GameDisplay: FC<{game:Game}> = ({game}) => {
  
  console.log(game.season);

  return (
    <Letterbox top={0}>

      <SeasonIndicator season = {game.season} />
      <CardsList game = {game} />
      <Board game={game} />
      <PlayerList game = {game}/>
      

    </Letterbox>

  )
}

export default GameDisplay