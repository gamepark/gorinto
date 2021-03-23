/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import { Goals } from '@gamepark/gorinto/cards/Goals';
import { Keys } from '@gamepark/gorinto/cards/KeyElement';
import Game from '@gamepark/gorinto/types/Game'
import {Letterbox} from '@gamepark/react-components'
import {FC, Fragment, useState} from 'react'
import Board from './board/Board';
import GoalCard from './board/GoalCard';
import Header from './board/Header';
import KeyElementCardPanel from './board/KeyElementCardPanel';
import PlayerPanel from './board/PlayerPanel';
import SeasonIndicator from './board/SeasonIndicator';
import PatternReminder from './board/PatternReminder'
import { useAnimation, usePlayerId } from '@gamepark/react-client';
import RemoveTileOnPath, { isRemoveTileOnPath } from '@gamepark/gorinto/moves/RemoveTileOnPath';
import BurrowTile from './board/BurrowTile';
import WelcomePopUp from './board/WelcomePopUp';
import PlayerColor from '@gamepark/gorinto/types/PlayerColor';
import {getPlayer} from '@gamepark/gorinto/Rules'

const GameDisplay: FC<{game:Game}> = ({game}) => {

  const animationRemoveTile = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move))
  const [welcomePopUpClosed, setWelcomePopUpClosed] = useState(false)
  const playerId = usePlayerId<PlayerColor>()

  const showWelcomePopup = game.season === 1 && !welcomePopUpClosed
  

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
                      activePlayer = {game.activePlayer}
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
      
      <BurrowTile css = {[animationRemoveTile && burrowTileAnimation(animationRemoveTile.duration)]}
                    index={animationRemoveTile && animationRemoveTile.move.index} />
      
      </div>

      {showWelcomePopup && playerId && <WelcomePopUp player={getPlayer(game, playerId)} game={game} close={() => setWelcomePopUpClosed(true)} />}

    </Letterbox>

    </Fragment>

  )
}

const burrowTileAnimation = (duration:number) => css`
animation : ${burrowTileKeyFrames} ${duration}s ;
`

const burrowTileKeyFrames = keyframes`
from, to{}
30%, 70%{transform:translate3d(-100%,0,0);}
`

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