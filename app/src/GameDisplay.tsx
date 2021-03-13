import Game from '@gamepark/gorinto/types/Game'
import {Letterbox} from '@gamepark/react-components'
import {FC} from 'react'
import Board from './board/Board';
import CardsList from './board/CardsList';
import Header from './board/Header';
import PlayerList from './board/PlayerList';
import SeasonIndicator from './board/SeasonIndicator';

const GameDisplay: FC<{game:Game}> = ({game}) => {
  
  console.log(game.season);

  return (
    <Letterbox top={0}>

      <Header game = {game} />
      <SeasonIndicator season = {game.season} />
      <CardsList game = {game} />
      <Board game = {game} />
      <PlayerList game = {game}/>
      

    </Letterbox>

  )
}

export default GameDisplay