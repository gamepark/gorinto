/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
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

      <div css={perspective}>

      <SeasonIndicator season = {game.season} />
      <CardsList keysArray = {game.twoKeyElementCards} goalsArray = {game.twoGoals} />
      <Board game = {game}/>
      <PlayerList players = {game.players} mountainBoard = {game.mountainBoard} tilesToTake = {game.tilesToTake} />
      
      </div>

    </Letterbox>

  )
}

const perspective = css`
position:absolute:
left:0%;
top:0%;
width:100%;
height:100%;

transform-style: preserve-3d;
transform: perspective(200em) rotateX(10deg) translateZ(10em) ;
transform-origin:23% 125% ;

`

export default GameDisplay