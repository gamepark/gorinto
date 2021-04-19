/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Goals} from '@gamepark/gorinto/cards/Goals'
import MoveTile from '@gamepark/gorinto/moves/MoveTile'
import RemoveTileOnPath, {isRemoveTileOnPath} from '@gamepark/gorinto/moves/RemoveTileOnPath'
import GameView from '@gamepark/gorinto/types/GameView'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {useAnimation, usePlay, usePlayerId, useSound, useTutorial} from '@gamepark/react-client'
import {Letterbox} from '@gamepark/react-components'
import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import Board from './board/Board'
import BurrowTile from './board/BurrowTile'
import ElementInPile from './board/ElementInPile'
import GoalCard from './board/GoalCard'
import KeyElementCardPanel from './board/KeyElementCardPanel'
import PatternsReminder from './board/PatternsReminder'
import PlayerPanel from './board/PlayerPanel'
import SeasonIndicator from './board/SeasonIndicator'
import WarningNoElementPopUp from './board/WarningNoElementPopUp'
import WelcomePopUp from './board/WelcomePopUp'
import TutorialPopup from './tutorial/TutorialPopup'
import ActivePlayerSound from './sounds/gongv1.mp3'

const GameDisplay: FC<{game:GameView}> = ({game}) => {

  const burrowTileAnimation = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move) && game.endOfSeasonStep === undefined)
  
  const [welcomePopUpClosed, setWelcomePopUpClosed] = useState(true)
  const [warningNoElementPopUpClosed, setWarningNoElementPopUpClosed] = useState<MoveTile>()
  const showWelcomePopup = !welcomePopUpClosed
  const showWarningNoElementPopUp = warningNoElementPopUpClosed ? true : false 

  const playerId = usePlayerId<PlayerColor>()
  const players = useMemo(() => getPlayersStartingWith(game, playerId), [game, playerId])    
  const player = game.players.find(player => player.color === playerId)

  const tutorial = useTutorial()

  // Hooks for move clics

  const [selectedTilesInMountain, setSelectedTilesInMountain] = useState<ElementInPile[]>([])

  useEffect( () => {
      if (!game.tilesToTake && selectedTilesInMountain.length > 0){
          setSelectedTilesInMountain([])
      }
  }, [game, selectedTilesInMountain] )
  
  useEffect( () => {
    if (game.activePlayer !== playerId && warningNoElementPopUpClosed !== undefined){
        setWarningNoElementPopUpClosed(undefined)
    }
  }, [game, warningNoElementPopUpClosed] )

  const yourTurn = useSound(ActivePlayerSound) 

  useEffect(() => {
      if (playerId === game.activePlayer){
        yourTurn.volume = 0.7
        yourTurn.play().catch(e => console.warn('cannot play sound', e))
      }
    }, [game.activePlayer, game.season]
  )

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

                      selectedTilesInMountain = {selectedTilesInMountain}
        />
           
      )}
      
      <Board game = {game} 
             onSelection = {(x,y,position) => (selectedTilesInMountain.some(element => element.x === x && element.y === y && element.z === position)      // Déjà sélectionné ?
              ? setSelectedTilesInMountain(selectedTilesInMountain.filter(item => item.x !== x || item.y !==y || item.z !== position ))      // si oui, On le retire
              : game.tilesToTake && selectedTilesInMountain.length < game.tilesToTake?.quantity && game.activePlayer === playerId ? setSelectedTilesInMountain(current => [...current, {x,y, z:position}]) : console.log("Impossible de prendre plus de tuiles")) }      // Si non, on l'ajoute.
              selectedTilesInMountain = {selectedTilesInMountain}
              onWarning = {(path, x, y) => (setWarningNoElementPopUpClosed({type:MoveType.MoveTile,path,x,y}))}

            />

      <PatternsReminder/>

      {game.goals.map((goalNumber, index) =>

          <GoalCard key={index}
                    goal={Goals[goalNumber]}
                    onClick={() => setWelcomePopUpClosed(false)}
                    css={game.players.length === 4 ? goalCardPosition(index) : goalCardPositionBigger(index)}
          />
        
      )}
      
      <BurrowTile index={burrowTileAnimation && burrowTileAnimation.move.index} path = {burrowTileAnimation && burrowTileAnimation.move.path}/>
      
      </div>

      {showWelcomePopup && player && <WelcomePopUp player={player} game={game} close={() => setWelcomePopUpClosed(true)} />}
      {showWarningNoElementPopUp && playerId === game.activePlayer && <WarningNoElementPopUp close={() => setWarningNoElementPopUpClosed(undefined)} path={warningNoElementPopUpClosed!.path} x={warningNoElementPopUpClosed!.x} y={warningNoElementPopUpClosed!.y}/>}
      {tutorial && <TutorialPopup game={game} tutorial={tutorial}/>}

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

const perspective = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  transform: perspective(200em) rotateX(10deg) translate(1%, -4%) scale(1.02);
  transform-origin: 15% 125%;
`

const goalCardPosition = (position: number) => css`
  position: absolute;
  top: 10%;
  left: ${79 + position * 10}%;
  width: 10%;
  height: 13%;
  font-size: 0.85em;
  cursor: pointer;
`

const goalCardPositionBigger = (position: number) => css`
  position: absolute;
  top: ${10 + position * 25}%;
  left: 79%;
  width: 20%;
  height: 25%;
  font-size: 1.7em;
  cursor: pointer;
`

export default GameDisplay