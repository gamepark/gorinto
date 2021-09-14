/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {getPlayerName} from '@gamepark/gorinto/GorintoOptions'
import Element from '@gamepark/gorinto/types/Element'
import MoveType from '@gamepark/gorinto/types/MoveType'
import Player from '@gamepark/gorinto/types/Player'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {Avatar, PlayerTimer, useAnimation, usePlay, usePlayer, useSound} from '@gamepark/react-client'
import {FC, HTMLAttributes, useEffect, useState} from 'react'
import {useDrop} from 'react-dnd'
import {useTranslation} from 'react-i18next'
import ElementInPile from './ElementInPile'
import ElementTileForPlayers from './ElementTileForPlayers'
import Button from './Button'
import TakeTile from '@gamepark/gorinto/moves/TakeTile'
import {isFirefox} from 'react-device-detect'
import moveTileSound from '../sounds/tic.mp3'
import {ResetSelectedTilesInPile, resetSelectedTilesInPileMove} from '../moves/SetSelectedTilesInPile'
import SwitchFirstPlayer, {isSwitchFirstPlayer} from '@gamepark/gorinto/moves/SwitchFirstPlayer'
import gamePointIcon from '../images/game-point.svg'
import {SpeechBubbleDirection} from '@gamepark/react-client/dist/Avatar'
import Images from '../images/Images'
import {Picture} from '@gamepark/react-components'

type Props = {
  player: Player
  position: number[],
  first: boolean,
  tilesToTake: { quantity: number, coordinates: { x: number, y: number }[], element?: Element } | undefined,
  mountainBoard: number[][][],
  activePlayer: PlayerColor | undefined,
  playersNumber: number,
  selectedTilesInMountain: ElementInPile[] | undefined,
  isRoundOrderCompassion: boolean,
} & HTMLAttributes<HTMLDivElement>

const PlayerPanel: FC<Props> = ({
                                  position,
                                  player: {color, understanding, score, compassionOrder},
                                  first,
                                  tilesToTake,
                                  mountainBoard,
                                  activePlayer,
                                  playersNumber,
                                  selectedTilesInMountain,
                                  isRoundOrderCompassion,
                                  ...props
                                }) => {

  const {t} = useTranslation()
  const playerInfo = usePlayer(color)
  const playTake = usePlay<TakeTile>()
  const playReset = usePlay<ResetSelectedTilesInPile>()
  const changeFirstPlayerAnimation = useAnimation<SwitchFirstPlayer>(animation => isSwitchFirstPlayer(animation.move))
  const [gamePoints] = useState(playerInfo?.gamePointsDelta)

  const moveSound = useSound(moveTileSound)

  const [{canDrop, isOver}, dropPlayerRef] = useDrop({
    accept: 'ElementInPile',
    canDrop: (item: ElementInPile) => {
      if (tilesToTake !== undefined && activePlayer === color) {

        if (tilesToTake.element !== Element.Earth) {
          return (
            (tilesToTake.coordinates.find(coord => (coord.x === item.x) && (coord.y === item.y)) !== undefined)
            &&
            (item.z === mountainBoard[item.x][item.y].length - 1)
          )
        } else {
          return (
            (tilesToTake.coordinates.find(coord => (coord.x === item.x) && (coord.y === item.y)) !== undefined)
            &&
            (item.z !== mountainBoard[item.x][item.y].length - 1)

          )
        }


      } else {
        return false
      }

    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    }),

    drop: (item: ElementInPile) => {

      if (tilesToTake!.element !== Element.Earth) {
        return {type: MoveType.TakeTile, coordinates: {x: item.x, y: item.y}}
      } else {
        return {type: MoveType.TakeTile, coordinates: {x: item.x, y: item.y, z: item.z}}
      }


    }
  })

  const [displayedScore, setDisplayedScore] = useState(score)
  const [scoreInterval, setScoreInterval] = useState<NodeJS.Timeout>()
  const [timingForEachTick, setTimingForEachTick] = useState(0)

  useEffect(() => {
    if (score - displayedScore !== 0) {
      setTimingForEachTick(4000 / (score - displayedScore))
    }
  }, [score])

  useEffect(() => {
    if (scoreInterval || displayedScore === score) {
      return
    }
    const interval = setInterval(() => {
      setDisplayedScore(currentScore => {
        if (currentScore === score) {
          clearInterval(interval)
          setScoreInterval(undefined)
          return currentScore
        }
        return currentScore + 1
      })
    }, timingForEachTick)

    setScoreInterval(interval)


  }, [timingForEachTick])

  function completeTakeMove(): void {
    moveSound.play()
    if (tilesToTake?.element !== Element.Earth) {
      selectedTilesInMountain!.forEach(element => playTake({
        type: MoveType.TakeTile,
        coordinates: {x: element.x, y: element.y}
      }))
    } else {
      Array.from(selectedTilesInMountain!).sort((a, b) => (-a.z + b.z)).forEach(element => playTake({
        type: MoveType.TakeTile,
        coordinates: {x: element.x, y: element.y, z: element.z}
      }))
    }
    playReset(resetSelectedTilesInPileMove(), {local: true})
  }

  return (

    <>

      <div
        css={[bgContouringStyle(position, playersNumber, color), color === activePlayer && animateGlowingActive(color), canDrop && canDropStyleBG, isOver && isOverStyle(color)]}>

      </div>

      <div {...props} ref={dropPlayerRef} css={[playerPanelStyle(position, color, activePlayer, playersNumber), canDrop && canDropStylePP, canDrop]}>

        <div
          css={[nameStyle, isFirefox ? nameStyleLetterSpacingFireFox : nameStyleLetterSpacingOther]}>{playerInfo?.name === undefined ? getPlayerName(color, t) : playerInfo?.name}</div>

        <div css={playerHeaderStyle}>

          <div css={avatarStyle}>

            {playerInfo?.avatar ?
              <Avatar css={avatarInnerStyle} playerId={color}
                      speechBubbleProps={{
                        parent: 'letterbox',
                        css: speechBubbleStyle(position),
                        direction: position[0] === 0 ? SpeechBubbleDirection.TOP_RIGHT : SpeechBubbleDirection.TOP_LEFT
                      }}/>
              : <Picture alt={t('Player avatar')} src={getKanji(color)} css={kanjiStyle}/>
            }


          </div>
          <div css={gPStyle}>
            {typeof gamePoints === 'number' &&
            <span css={css`flex-shrink: 0`}>
                        <Picture src={gamePointIcon} alt="Game point icon" css={gamePointIconStyle}/>
              {gamePoints > 0 && '+'}{playerInfo?.gamePointsDelta}
                    </span>
            }</div>

          <PlayerTimer playerId={color} css={[activePlayer !== undefined ? TimerStyle : DontDisplayStyle]}/>

        </div>

        <div css={playerFooterStyle}>


          <Button css={[(tilesToTake !== undefined && selectedTilesInMountain
            && selectedTilesInMountain.length === (tilesToTake.element !== Element.Earth
              ? Math.min(tilesToTake?.quantity, tilesToTake?.coordinates.length)
              : tilesToTake.coordinates.length === 0
                ? 0
                : Math.min(tilesToTake.quantity, mountainBoard[tilesToTake.coordinates[0].x][tilesToTake.coordinates[0].y].length - 1))
            && color === activePlayer) || hideValidationButton, validationButtonStyle
          ]}
                  onClick={() => {
                    completeTakeMove()
                  }}>
            {'✓'}
          </Button>


          {!isRoundOrderCompassion
            ? <div css={[coinPosition]}><Picture alt="Coin" src={Images.CoinHeads} css={coinStyle(first)}/></div>
            : <div css={[coinPosition, changeFirstPlayerAnimation && flipStyle]}>
              <Picture alt="Compassion" src={getCompassionTile(compassionOrder)} css={sizeKitsuneTileRecto}/>
              <Picture alt="VersoCompassion" src={Images.CompassionOrderTileVerso} css={sizeKitsuneTileVerso}/>
            </div>
          }


          <div css={scoreStyle(color)}>{displayedScore}</div>

        </div>

        <div css={playerElementStyle}>

          {elementArray(understanding[Element.Void], 0).length !== 0 ? elementArray(understanding[Element.Void], 0).map((tile, index) =>
            <div css={[voidStyle, elementSize, threeDStyle(index)]} key={index}>
              <ElementTileForPlayers element={Element.Void} position={index}/>
            </div>
          ) : <div css={[voidStyle, elementSize]}/>}

          {elementArray(understanding[Element.Wind], 20).length !== 0 ? elementArray(understanding[Element.Wind], 20).map((tile, index) =>
            <div css={[windStyle, elementSize, threeDStyle(index)]} key={index}>
              <ElementTileForPlayers element={Element.Wind} position={index}/>
            </div>
          ) : <div css={[windStyle, elementSize]}></div>}

          {elementArray(understanding[Element.Fire], 40).length !== 0 ? elementArray(understanding[Element.Fire], 40).map((tile, index) =>
            <div css={[fireStyle, elementSize, threeDStyle(index)]} key={index}>
              <ElementTileForPlayers element={Element.Fire} position={index}/>
            </div>
          ) : <div css={[fireStyle, elementSize]}></div>}

          {elementArray(understanding[Element.Water], 60).length !== 0 ? elementArray(understanding[Element.Water], 60).map((tile, index) =>
            <div css={[waterStyle, elementSize, threeDStyle(index)]} key={index}>
              <ElementTileForPlayers element={Element.Water} position={index}/>
            </div>
          ) : <div css={[waterStyle, elementSize]}></div>}

          {elementArray(understanding[Element.Earth], 80).length !== 0 ? elementArray(understanding[Element.Earth], 80).map((tile, index) =>
            <div css={[earthStyle, elementSize, threeDStyle(index)]} key={index}>
              <ElementTileForPlayers element={Element.Earth} position={index}/>
            </div>
          ) : <div css={[earthStyle, elementSize]}></div>}

        </div>

        <div css={playerCounterStyle}>

          {understanding[Element.Void] > 1 && <div css={countVoid}> {understanding[Element.Void]} </div>}
          {understanding[Element.Wind] > 1 && <div css={countWind}> {understanding[Element.Wind]} </div>}
          {understanding[Element.Fire] > 1 && <div css={countFire}> {understanding[Element.Fire]} </div>}
          {understanding[Element.Water] > 1 && <div css={countWater}> {understanding[Element.Water]} </div>}
          {understanding[Element.Earth] > 1 && <div css={countEarth}> {understanding[Element.Earth]} </div>}

        </div>

      </div>

    </>

  )

}

function elementArray(understanding: number, element: number): number[] {

  const result: number[] = []
  for (let i = 0; i < understanding; i++) {
    result.push(element)
    if (result.length === 3) {
      break
    }
  }
  return result

}

const threeDStyle = (position: number) => css`
  transform-style: preserve-3d;
`

const playerCounterStyle = css`
  position: absolute;
  bottom: 7%;
  left: 10%;
  width: 15%;
  height: 92%;
  text-align: center;
  transform-style: preserve-3d;

  div {
    position: absolute;
    left: 5%;
    border-radius: 100%;
    background-color: rgba(7, 7, 7, 0.5);
    color: white;
    width: 70%;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    font-size: 2.5em;
    transform-style: preserve-3d;

  }

`
const countVoid = css`bottom: 80%;`
const countWind = css`bottom: 60%;`
const countFire = css`bottom: 40%;`
const countWater = css`bottom: 20%;`
const countEarth = css`bottom: 0%;`

const elementSize = css`
  position: absolute;
  width: 85%;
  height: 15%;
`

const voidStyle = css`bottom: 81%;`
const windStyle = css`bottom: 61%;`
const fireStyle = css`bottom: 41%;`
const waterStyle = css`bottom: 21%;`
const earthStyle = css`bottom: 1%;`

const canDropStylePP = css`
  transform: translateZ(4em);
  transition: transform linear 0.25s;
`

const canDropStyleBG = css`
  transform: translateZ(4em);
  transition: transform linear 0.25s, background-color linear 0.25s;
`

const isOverStyle = (color: PlayerColor) => css`
  background-color: rgba(0, 0, 0, 0.95);
  transition: background-color linear 0.25s;
`

const bgContouringStyle = (position: number[], playersNumber: number, color: PlayerColor) => css`
  position: absolute;
  transform-style: preserve-3d;

  ${playersNumber !== 3 && `
bottom : ${Math.abs(position[0] - position[1]) * 37.5}%;
left : ${0.5 + position[0] * 79}%;
`}
  ${playersNumber === 3 && `
bottom : ${position[1] * 37.5}%;
left : ${0.5 + position[0] * 79}%;
`}
  z-index: -1;
  transform: translateZ(0em);
  width: 19.5%;
  height: 35.6%;

  border: 0.5em ${getHexaColor(color)} solid;
  border-radius: 6% 6% 6% 6%;
  background-color: rgba(0, 0, 0, 0.6);
  transition: transform linear 0.25s;
`

const playerPanelStyle = (position: number[], color: PlayerColor, activePlayer: PlayerColor | undefined, playersNumber: number) => css`
  position: absolute;
  transform-style: preserve-3d;

  ${playersNumber !== 3 && `
bottom : ${Math.abs(position[0] - position[1]) * 37.5}%;
left : ${position[0] * 79}%;
`}
  ${playersNumber === 3 && `
bottom : ${position[1] * 37.5}%;
left : ${position[0] * 79}%;
`}


  width: 20%;
  height: 37.5%;
  text-align: right;

  background: bottom left 5%/54% url(${getPlayerMat(color)}) no-repeat;
  transition: transform linear 0.25s;
`

const animateGlowingActive = (color: PlayerColor | undefined) => css`
  background-color: rgba(0, 0, 0, 0.15);;
`

function getPlayerMat(color: PlayerColor) {
  switch (color) {
    case PlayerColor.White:
      return Images.WhiteGor
    case PlayerColor.Black:
      return Images.BlackGor
    case PlayerColor.Red:
      return Images.RedGor
    case PlayerColor.Yellow:
      return Images.YellowGor
    default:
      return Images.BlueGor
  }
}

const playerHeaderStyle = css`
  position: absolute;
  top: 10%;
  right: 6%;
  width: 45%;
  height: 50%;
  transform-style: preserve-3d;
`

const nameStyle = css`
  position: absolute;
  right: 2.5%;
  top: 8%;
  height: 90%;

  writing-mode: vertical-rl;
  text-orientation: upright;

  font-family: 'Mulish', sans-serif;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 2.8em;
  text-align: left;
  padding-bottom: 0.5em;
`

const nameStyleLetterSpacingFireFox = css`
  letter-spacing: -0.4em;
`

const nameStyleLetterSpacingOther = css`
  letter-spacing: -0.4em;
`

const gPStyle = css`
  font-size: 2.5em;
  text-align: center;
  padding-top: 0.5em;
`

const gamePointIconStyle = css`
  height: 1em;
`

const TimerStyle = css`
  display: block;
  font-size: 2.5em;
  text-align: center;
  padding-top: 0.5em;
`

const DontDisplayStyle = css`
  display: none;
`

const avatarStyle = css`
  border-radius: 100%;

  margin-right: auto;
  margin-left: auto;

  height: 7em;
  width: 7em;

  transform-style: preserve-3d;
`

const avatarInnerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  color: black;
  transform-style: preserve-3d;
`

const speechBubbleStyle = (position: number[]) => {
  if (position[0] && position[1]) {
    return bottomRightPanelSpeechBubbleStyle
  } else if (position[0]) {
    return topRightPanelSpeechBubbleStyle
  } else if (position[1]) {
    return topLeftPanelSpeechBubbleStyle
  } else {
    return bottomLeftPanelSpeechBubbleStyle
  }
}

const topRightPanelSpeechBubbleStyle = css`
  color: black;
  bottom: 65% !important;
  left: 87.3% !important;
`

const topLeftPanelSpeechBubbleStyle = css`
  color: black;
  bottom: 65% !important;
  right: 82.7% !important;
`

const bottomRightPanelSpeechBubbleStyle = css`
  color: black;
  bottom: 32% !important;
  left: 89.6% !important;
`

const bottomLeftPanelSpeechBubbleStyle = css`
  color: black;
  bottom: 32% !important;
  right: 82.6% !important;
`

const kanjiStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 30%;
`

const playerElementStyle = css`
  position: absolute;
  bottom: 3%;
  left: 24%;
  font-size: 1.8em;
  width: 18%;
  height: 92%;

  transform-style: preserve-3d;
`

const playerFooterStyle = css`

  position: absolute;
  bottom: 8%;
  right: 6%;
  width: 37%;

  transform-style: preserve-3d;
`

const hideValidationButton = css`
  display: none;
`

const validationButtonStyle = css`

  position: absolute;
  right: 20%;
  transform: translateZ(0.01em);
  transform-style: preserve-3d;
  font-size: 5em;

`

const coinStyle = (isFirst: boolean) => css`
  width: 100%;
  ${isFirst && `filter: drop-shadow(0 0 0.2em black);`};
  ${!isFirst && `transform:translate3d(0,0,200em);`};
  transform-style: preserve-3d;
  transition: transform 2s;
`

const coinPosition = css`
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 1em;
  width: 50%;
  height: 7em;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
`

const flipStyle = css`
  transform: rotateY(180deg);
  transition: transform 1s ease-in-out;
`

const sizeKitsuneTileRecto = css`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  transform: rotateY(360deg);
`

const sizeKitsuneTileVerso = css`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  transform: rotateY(180deg);
`

const scoreStyle = (color: PlayerColor) => css`
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 2.9em;
  text-align: center;

  background: center / 60% url(${getWisdomMark(color)}) no-repeat;
  ${(color === PlayerColor.Black || color === PlayerColor.Red) && `color:white;`}
  ${(color === PlayerColor.White || color === PlayerColor.Yellow) && `color:black;`}

`

function getWisdomMark(color: PlayerColor) {
  switch (color) {
    case PlayerColor.White:
      return Images.WisdomMarkWhite
    case PlayerColor.Black:
      return Images.WisdomMarkBlack
    case PlayerColor.Red:
      return Images.WisdomMarkRed
    case PlayerColor.Yellow:
      return Images.WisdomMarkYellow
    default:
      return Images.WisdomMarkBlue
  }
}

function getKanji(color: PlayerColor) {
  switch (color) {
    case PlayerColor.White:
      return Images.KanjiWhite
    case PlayerColor.Black:
      return Images.KanjiBlack
    case PlayerColor.Red:
      return Images.KanjiRed
    case PlayerColor.Yellow:
      return Images.KanjiYellow
    default:
      return Images.KanjiBlue
  }
}

function getHexaColor(color: PlayerColor | undefined) {
  switch (color) {
    case PlayerColor.White:
      return '#FFFFFF'
    case PlayerColor.Black:
      return '#000000'
    case PlayerColor.Red:
      return '#d01f2f'
    case PlayerColor.Yellow:
      return '#ffc20e'
    default:
      return '#1E90FF'
  }
}

function getCompassionTile(turn: number | undefined): string {
  switch (turn) {
    case 1:
      return Images.CompassionOrderTile1
    case 2:
      return Images.CompassionOrderTile2
    case 3:
      return Images.CompassionOrderTile3
    case 4:
      return Images.CompassionOrderTile4
    default:
      return Images.CompassionOrderTile5
  }
}

export default PlayerPanel