/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {Goals} from '@gamepark/gorinto/cards/Goals'
import RemoveTileOnPath, {isRemoveTileOnPath} from '@gamepark/gorinto/moves/RemoveTileOnPath'
import GameView from '@gamepark/gorinto/types/GameView'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {useAnimation, usePlayerId} from '@gamepark/react-client'
import {Letterbox} from '@gamepark/react-components'
import {FC, Fragment, useMemo, useState} from 'react'
import Board from './board/Board'
import BurrowTile from './board/BurrowTile'
import GoalCard from './board/GoalCard'
import KeyElementCardPanel from './board/KeyElementCardPanel'
import PatternPopUp from './board/PatternPopUp'
import PatternReminder from './board/PatternReminder'
import PlayerPanel from './board/PlayerPanel'
import SeasonIndicator from './board/SeasonIndicator'
import WelcomePopUp from './board/WelcomePopUp'

const GameDisplay: FC<{game:GameView}> = ({game}) => {

  const burrowTileAnimation = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move) && game.endOfSeasonStep === undefined)
  const [welcomePopUpClosed, setWelcomePopUpClosed] = useState(false)
  const [patternPopUpClosed, setPatternPopUpClosed] = useState(true)
  const playerId = usePlayerId<PlayerColor>()
  const players = useMemo(() => getPlayersStartingWith(game, playerId), [game, playerId])  

  const showWelcomePopup = !welcomePopUpClosed
  const showPatternPopup = !patternPopUpClosed

  const player = game.players.find(player => player.color === playerId)


  return (

    <Fragment>

    <Letterbox top={0}>

      <div css={perspective}>

      <SeasonIndicator season = {game.season} />

      {game.keyElements.map((element, index) =>
            
        <KeyElementCardPanel  key = {index}
                              element = {element}
                              position = {index}
                              open={() => setWelcomePopUpClosed(false)}
        />
      )}
            
      {players.map((player, index) => 
           
        <PlayerPanel  key = {player.color}
                      player = {player}
                      first = {game.firstPlayer === player.color}
                      tilesToTake = {game.tilesToTake}
                      mountainBoard = {game.mountainBoard}
                      position={[Math.trunc(index/2),index%2]}
                      activePlayer = {game.activePlayer}
                      playersNumber = {game.players.length}
        />
           
      )}
      
      <Board game = {game}/>

      <PatternReminder open={() => setPatternPopUpClosed(false)} />

      {game.goals.map((goalNumber, index) =>
            
            <GoalCard   key = {index}
                        goal = {Goals[goalNumber]}
                        position = {index}
                        open={() => setWelcomePopUpClosed(false)}
                        players = {game.players}
            />
        
      )}
      
      <BurrowTile index={burrowTileAnimation && burrowTileAnimation.move.index} path = {burrowTileAnimation && burrowTileAnimation.move.path}/>
      
      </div>

      {showWelcomePopup && player && <WelcomePopUp player={player} game={game} close={() => setWelcomePopUpClosed(true)} />}
      {showPatternPopup && <PatternPopUp close={() => setPatternPopUpClosed(true)} />}

    </Letterbox>

    </Fragment>

  )
}

export const getPlayersStartingWith = (game: GameView, playerId?: PlayerColor) => {
  if (playerId) {
    const playerIndex = game.players.findIndex(player => player.color === playerId)
    return [...game.players.slice(playerIndex, game.players.length), ...game.players.slice(0, playerIndex)]
  } else {
    return game.players
  }
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