/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Goals } from '@gamepark/gorinto/cards/Goals';
import { Keys } from '@gamepark/gorinto/cards/KeyElement';
import Game from '@gamepark/gorinto/types/Game'
import {Letterbox} from '@gamepark/react-components'
import {FC, Fragment} from 'react'
import Board from './board/Board';
import GoalCard from './board/GoalCard';
import Header from './board/Header';
import KeyElementCardPanel from './board/KeyElementCardPanel';
import PlayerPanel from './board/PlayerPanel';
import SeasonIndicator from './board/SeasonIndicator';
import PatternReminder from './board/PatternReminder'

const GameDisplay: FC<{game:Game}> = ({game}) => {
  
  console.log(game.season);

  return (

    <Fragment>

    <Header game = {game} />

    <Letterbox top={0}>

      <div css={perspective}>

      <SeasonIndicator season = {game.season} />

      {game.twoKeyElementCards.map((cardNumber, index) =>
            
        <KeyElementCardPanel  key = {index}
                              keyCard = {Keys[cardNumber]}
                              position = {index}
        />
      )}
            
      {game.players.map((player, index) => 
           
        <PlayerPanel  key = {player.color}
                      understanding = {player.understanding}
                      score = {player.score}
                      color = {player.color}
                      first = {player.isFirst}
                      tilesToTake = {game.tilesToTake}
                      mountainBoard = {game.mountainBoard}
                      position={[Math.trunc(index/2),index%2]}
        />
           
      )}
      
      <Board game = {game}/>

      <PatternReminder />

      {game.twoGoals.map((goalNumber, index) =>
            
            <GoalCard   key = {index}
                        goal = {Goals[goalNumber]}
                        position = {index}
            />
        
      )}
      
      </div>

    </Letterbox>

    </Fragment>

  )
}



const perspective = css`
position:absolute;
left:0%;
top:0%;
width:100%;
height:100%;

transform-style: preserve-3d;
transform: perspective(200em) rotateX(10deg) translate(1%, -4%) scale(1.02) ;
transform-origin:21% 125% ;

`

export default GameDisplay