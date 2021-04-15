/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {faMinusSquare, faPlusSquare, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GameView from "@gamepark/gorinto/types/GameView";
import Move from "@gamepark/gorinto/types/Move";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import { useActions, useAnimation, useFailures, usePlayerId, useTutorial } from "@gamepark/react-client";
import { TFunction } from "i18next";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Arrow from "../images/tutorial-arrow-grey.png"
import Button from "../board/Button";
import background from '../images/BG2.jpg'

declare type Tutorial = {
  playNextMoves: (quantity?: number) => void;
  playNextMove: () => void;
  setOpponentsPlayAutomatically: (value?: boolean) => void;
};

const TutorialPopup : FC<{game:GameView, tutorial:Tutorial}> = ({game}) => {

  const tutorial = useTutorial()
  useEffect(
    () => tutorial && tutorial.setOpponentsPlayAutomatically(true), []
  )

    const {t} = useTranslation()
    const playerId = usePlayerId<PlayerColor>()
    const actions = useActions<Move, PlayerColor>()
    const actionsNumber = actions !== undefined ? actions.filter(action => action.playerId === playerId).length : 0
    const previousActionNumber = useRef(actionsNumber)
    const animation = useAnimation<Move>()
    const [tutorialIndex, setTutorialIndex] = useState(0)
    const [tutorialDisplay, setTutorialDisplay] = useState(tutorialDescription.length > actionsNumber)
    const [failures] = useFailures()
    const [hideLastTurnInfo, setHideLastTurnInfo] = useState(false)
    const [hideThirdTurnInfo, setHideThirdTurnInfo] = useState(false)
    const [tutorialEnd, setTutorialEnd] = useState(true)

    const platformUri = process.env.REACT_APP_PLATFORM_URI || 'http://localhost:3000'
    const discordUri = 'https://discord.gg/nMSDRag'

    const toggleTutorialEnd = () => {
      setTutorialEnd(!tutorialEnd)
    }

    const moveTutorial = (deltaMessage: number) => {
      setTutorialIndex(tutorialIndex + deltaMessage)
      setTutorialDisplay(true)
    }
    
    const resetTutorialDisplay = () => {
      setTutorialIndex(0)
      setTutorialDisplay(true)
    }

    const tutorialMessage = (index: number) => {
        let currentStep = actionsNumber
        while (!tutorialDescription[currentStep]) {
          currentStep--
        }
        return tutorialDescription[currentStep][index]
      }

      useEffect(() => {
        if (previousActionNumber.current > actionsNumber) {
          setTutorialDisplay(false)
        } else if (tutorialDescription[actionsNumber]) {
          resetTutorialDisplay()
        }
        previousActionNumber.current = actionsNumber
      }, [actionsNumber])

    useEffect(() => {
      if (failures.length) {
        setTutorialIndex(tutorialDescription[actionsNumber].length - 1)  
        setTutorialDisplay(true)
        }
    }, [actionsNumber, failures])

    const currentMessage = tutorialMessage(tutorialIndex)
    const displayPopup = tutorialDisplay && currentMessage && !failures.length



    return (
        <>




        <div css={[popupOverlayStyle, displayPopup ? showPopupOverlayStyle : hidePopupOverlayStyle(85, 90), style]}
            onClick={() => setTutorialDisplay(false)}>

            <div css={[popupStyle, displayPopup ? popupPosition(currentMessage) : hidePopupStyle]}
                onClick={event => event.stopPropagation()}>

              <div css={closePopupStyle} onClick={() => setTutorialDisplay(false)}><FontAwesomeIcon icon={faTimes}/></div>

              {currentMessage && <h2>{currentMessage.title(t)}</h2>}
              {currentMessage && <p>{currentMessage.text(t)}</p>}
              {tutorialIndex > 0 && <Button css={buttonStyle} onClick={() => moveTutorial(-1)}>{'<<'}</Button>}
              <Button onClick={() => moveTutorial(1)}>{t('OK')}</Button>

            </div>

        </div>

        {
          currentMessage && currentMessage.arrow &&
          <img alt='Arrow pointing toward current tutorial interest' src={Arrow} draggable="false"
               css={[arrowStyle(currentMessage.arrow.angle), displayPopup ? showArrowStyle(currentMessage.arrow.top, currentMessage.arrow.left) : hideArrowStyle]}/>
        }

        {
          game.season === 3 && !hideThirdTurnInfo &&
          <div css={[popupStyle, popupPosition(thirdTurnInfo)]}>
            <div css={closePopupStyle} onClick={() => setHideThirdTurnInfo(true)}><FontAwesomeIcon icon={faTimes}/></div>
            <h2>{thirdTurnInfo.title(t)}</h2>
            <p>{thirdTurnInfo.text(t)}</p>
            <Button onClick={() => setHideThirdTurnInfo(true)}>{t('OK')}</Button>
          </div>
        }

        {
          game.season === 4 && !hideLastTurnInfo &&
          <div css={[popupStyle, popupPosition(lastTurnInfo)]}>
            <div css={closePopupStyle} onClick={() => setHideLastTurnInfo(true)}><FontAwesomeIcon icon={faTimes}/></div>
            <h2>{lastTurnInfo.title(t)}</h2>
            <p>{lastTurnInfo.text(t)}</p>
            <Button onClick={() => setHideLastTurnInfo(true)}>{t('OK')}</Button>
          </div>
        }

        {
          game.activePlayer === undefined &&
          <div css={[popupStyle, endStyle, popupPosition(tutorialEndGame), tutorialEnd && buttonsPosition]}>
            <div css={closePopupStyle} onClick={() => toggleTutorialEnd()}><FontAwesomeIcon icon={tutorialEnd ? faPlusSquare : faMinusSquare}/></div>
            {!tutorialEnd &&
            <>
              <h2 css={textEndStyle} >{tutorialEndGame.title(t)}</h2>
              <p css={textEndStyle} >{tutorialEndGame.text(t)}</p>
            </>
            }
            <Button css={buttonStyle} onClick={() => resetTutorial()}>{t('Restart the tutorial')}</Button>
            <Button css={buttonStyle} onClick={() => window.location.href = platformUri}>{t('Play with friends')}</Button>
            <Button onClick={() => window.location.href = discordUri}>{t('Find players')}</Button>
          </div>
        }

        </>
    )

}

export function resetTutorial() {
  localStorage.removeItem('gorinto')
  window.location.reload()
}

export const hidePopupStyle = css`
  top: 85%;
  left: 90%;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: solid 0 #FFF;
  font-size: 0;
`

export const hidePopupOverlayStyle = (boxTop: number, boxLeft: number) => css`
  top: ${boxTop}%;
  left: ${boxLeft}%;
  width: 0;
  height: 0;
  overflow: hidden;
`

const endStyle = css`
background: url(${background});
`

const textEndStyle = css`
color: white;
text-shadow: 0.1em 0.1em black;
`

const popupOverlayStyle = css`
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: all .5s ease;
`
const showPopupOverlayStyle = css`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const popupStyle = css`
  position: absolute;
  text-align: center;

  z-index : 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border:1em black solid;
  background: url(${background});
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  color:white;
  text-shadow: 0.3em 0.3em black;
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }
  & > h2 {
    font-size: 5em;
    margin:0;
  }
  & > p {
    text-align: center;
    font-size: 3.5em;

    width:90%;
  }
  & > button {
    font-size: 3.5em;
  }
`

const style = css`
  background-color: transparent;
`

const closePopupStyle = css`
  position: relative;
  float: right;
  text-align: center;
  margin-top: -2%;
  margin-right: -0%;
  font-size: 4em;
  color:white;
  &:hover{
    cursor: pointer;
    color: black;
  }
`

export const popupPosition = ({boxWidth, boxTop, boxLeft, arrow}: TutorialStepDescription) => css`
  transition-property: width, top, left, transform;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: ${boxWidth}%;
  top: ${boxTop}%;
  left: ${boxLeft}%;
  transform: translate(-50%, ${!arrow || arrow.angle % 180 !== 0 ? '-50%' : arrow.angle % 360 === 0 ? '0%' : '-100%'});
`

export const buttonsPosition = css`
  top: 15%;
  width: 80%;
`

const buttonStyle = css`
  margin-right: 1em;
`

const arrowStyle = (angle: number) => css`
  position: absolute;
  transform: rotate(${angle}deg);
  will-change: transform;
  z-index: 102;
  transition-property: top, left, transform;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const showArrowStyle = (top: number, left: number) => css`
  top: ${top}%;
  left: ${left}%;
  width: 20%;
`

const hideArrowStyle = css`
  top: 90%;
  left: 90%;
  width: 0;
`

type TutorialStepDescription = {
    title: (t: TFunction) => string
    text: (t: TFunction) => string
    boxTop: number
    boxLeft: number
    boxWidth: number
    arrow?: {
      angle: number
      top: number
      left: number
    }
  }

const tutorialDescription:TutorialStepDescription[][] = [
    [
        {
          title: (t: TFunction) => t('Welcome to Gorinto tutorial'),
          text: (t: TFunction) => t('In Gorinto, you are trying to reach perfect balance between the five Elements. Master specifical rules to build the greatest Gorinto.'),
          boxTop: 40,
          boxLeft: 50,
          boxWidth: 60
        },
        {
          title: (t: TFunction) => t('Your Gorinto'),
          text: (t: TFunction) => t('In this tutorial, you are the Black Player.'),
          boxTop: 78,
          boxLeft: 52,
          boxWidth: 50,
          arrow: {
            angle: 270,
            top: 72,
            left: 15
          }
        },
        {
          title: (t: TFunction) => t('Your Opponents'),
          text: (t: TFunction) => t('You also play against 2 two opponents controlled by the machine : the Red and the White players.'),
          boxTop: 55,
          boxLeft: 47,
          boxWidth: 55,
        },
        {
          title: (t: TFunction) => t('Goal of the game'),
          text: (t: TFunction) => t('The goal of this game is to score more Wisdom Points than your opponents, by collecting elements and following specific rules.'),
          boxTop: 73,
          boxLeft: 30,
          boxWidth: 55,
          arrow: {
            angle: 180,
            top: 73,
            left: 6
          }
        },
        {
          title: (t: TFunction) => t('The Board'),
          text: (t: TFunction) => t('Here is the board, also called the Mountain. It is here you will place and pick tiles during the game.'),
          boxTop: 60,
          boxLeft: 50,
          boxWidth: 70,
          arrow: {
            angle: 0,
            top:47,
            left: 42
          }
        },
        {
          title: (t: TFunction) => t('The Paths'),
          text: (t: TFunction) => t('Next to the Mountain, there are the two Paths. When it is your turn, you can pick a tile on a Path and move it on the Mountain in a straight line.'),
          boxTop: 35,
          boxLeft: 50,
          boxWidth: 40,
          arrow: {
            angle: 0,
            top:20,
            left: 40
          }
        },
        {
          title: (t: TFunction) => t('How to move a tile'),
          text: (t: TFunction) => t("Enough talking ! You have to move a tile from a path to the mountain first. Try to move this Fire Element on the second column !"),
          boxTop: 45,
          boxLeft: 40,
          boxWidth: 50,
          arrow: {
            angle: 0,
            top:32,
            left: 16
          }
        }
    ],
    [
      {
        title: (t: TFunction) => t('How to take a tile'),
        text: (t: TFunction) => t("Great ! It is time to complete your move by picking a tile on the Mountain."),
        boxTop: 50,
        boxLeft: 50,
        boxWidth: 40,

      },
      {
        title: (t: TFunction) => t('The Patterns'),
        text: (t: TFunction) => t("In Gorinto, elements you can take depend on the element you just put on the Mountain. Each element correspond to one Pattern, for a total of five Patterns."),
        boxTop: 30,
        boxLeft: 15,
        boxWidth: 30,
        arrow: {
          angle: 0,
          top:15,
          left: 2
        }
      },
      {
        title: (t: TFunction) => t('The Fire Pattern'),
        text: (t: TFunction) => t("Start with the fire pattern. You can take tiles from the four other spaces in your placement's column. There are shining in yellow on the Mountain."),
        boxTop: 50,
        boxLeft: 70,
        boxWidth: 30,
      },
      {
        title: (t: TFunction) => t('The Fire Pattern'),
        text: (t: TFunction) => t("Take your first tile according to this pattern ! Take this Wind tile by moving it over your Gorinto or by clicking it. It will be useful for our next turn."),
        boxTop: 50,
        boxLeft: 70,
        boxWidth: 30,
        arrow: {
          angle: 270,
          top:45,
          left: 42
        }
      }
    ],
    [
      {
        title: (t: TFunction) => t('Understanding'),
        text: (t: TFunction) => t("Nice ! You have increased your Wind element understanding by one. But your turn is over now. Let your opponents play..."),
        boxTop: 70,
        boxLeft: 15,
        boxWidth: 30,
      },    
      {
        title: (t: TFunction) => t('The Wind Pattern'),
        text: (t: TFunction) => t("Time to learn another Pattern. Move this Wind element on the third line."),
        boxTop: 20,
        boxLeft: 71,
        boxWidth: 40,
        arrow: {
          angle: 270,
          top:5,
          left: 39
        }
      }
  ],
  [
    {
      title: (t: TFunction) => t('The Wind Pattern'),
      text: (t: TFunction) => t("According to Wind pattern, you can take tiles from the four locations orthogonally adjacent to your placement. There are shining in yellow on the Mountain."),
      boxTop: 40,
      boxLeft: 80,
      boxWidth: 30,
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: (t: TFunction) => t("But this time, you will pick two tiles, and not only one ! Indeed, the number of tiles you must take is equal to your understanding of the element plus one."),
      boxTop: 70,
      boxLeft: 45,
      boxWidth: 50,
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: (t: TFunction) => t("You have juste move a Wind Element, and you have already collected one Wind Element. Your understanding of this element is 1, so you can gather 1 + 1 = 2 tiles."),
      boxTop: 70,
      boxLeft: 45,
      boxWidth: 60,
      arrow: {
        angle: 270,
        top:65,
        left: 2
      }
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: (t: TFunction) => t("Notice that for the other elements, you have not collected any tile yet, so you can collect 0 + 1 = 1 tile if you move any other tile except Wind."),
      boxTop: 78,
      boxLeft: 45,
      boxWidth: 60,
      arrow: {
        angle: 270,
        top:77,
        left: 2
      }
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: (t: TFunction) => t("For now, just collect the Water element and the Earth Element here."),
      boxTop: 65,
      boxLeft: 72,
      boxWidth: 40,
      arrow: {
        angle: 270,
        top:60,
        left: 40
      }
    }, 
  ],
  [],
  [
    {
      title: (t: TFunction) => t('The Patterns'),
      text: (t: TFunction) => t("Good ! If you forget one pattern, click here to view the five patterns of the game."),
      boxTop: 25,
      boxLeft: 15,
      boxWidth: 30,
      arrow: {
        angle: 0,
        top:12,
        left: 2
      }
    }, 
    {
      title: (t: TFunction) => t('The Water Pattern'),
      text: (t: TFunction) => t("Learn the Water Pattern now : place this water element on the second line."),
      boxTop: 20,
      boxLeft: 20,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top:10,
        left: 35
      }
    }
  ],
  [ 
    {
      title: (t: TFunction) => t('The Water Pattern'),
      text: (t: TFunction) => t("According to Water Pattern, you can gather from the four other spaces in your placement's row."),
      boxTop: 70,
      boxLeft: 50,
      boxWidth: 60,
    }, 
    {
      title: (t: TFunction) => t('The Season Marker'),
      text: (t: TFunction) => t("But first, let's take a look at this Marker. Each game has four season and we're in the first one."),
      boxTop: 25,
      boxLeft: 75,
      boxWidth: 35,
      arrow: {
        angle: 0,
        top:12,
        left: 67
      }
    }, 
    {
      title: (t: TFunction) => t('The End of a Season'),
      text: (t: TFunction) => t("A season end when it's the turn of the first player to play, but there isn't enough tiles on the paths to make a whole turn."),
      boxTop: 75,
      boxLeft: 46,
      boxWidth: 50,
      arrow: {
        angle: 270,
        top:74,
        left: 10
      }
    }, 
    {
      title: (t: TFunction) => t('The Goal Cards'),
      text: (t: TFunction) => t("At the end of a season, every player score points based on Objective Cards. These cards never change during the game, so make sure to understand them before you start !"),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 50,
      arrow: {
        angle: 90,
        top:30,
        left: 65
      }
    },
    {
      title: (t: TFunction) => t('The Goal Cards'),
      text: (t: TFunction) => t("In this game, you can score points if you make odd height stacks and stacks of different heights."),
      boxTop: 35,
      boxLeft: 45,
      boxWidth: 50,
      arrow: {
        angle: 90,
        top:30,
        left: 65
      }
    }, 
    {
      title: (t: TFunction) => t('The Goal Cards'),
      text: (t: TFunction) => t("It could be a good strategy to keep odd height stacks ! Pick the Earth Tiles according to the Water Pattern !"),
      boxTop: 70,
      boxLeft: 50,
      boxWidth: 60,
    } 
  ],
  [],
  [
    {
      title: (t: TFunction) => t('Scoring'),
      text: (t: TFunction) => t("Nice ! Look at the end of the season. You will score 2 points for the first Goal Card, and 5 for the second one. A pretty good start !"),
      boxTop: 75,
      boxLeft: 22,
      boxWidth: 40,
      arrow: {
        angle: 180,
        top:75,
        left: 6
      }
    }, 
    {
      title: (t: TFunction) => t('Beginning of a new season'),
      text: (t: TFunction) => t("When a new season start, the paths are filled again, and the first player is the one who has the lowest score."),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 60,
    }, 
    {
      title: (t: TFunction) => t('The Earth Pattern'),
      text: (t: TFunction) => t("Learn the Earth Pattern ! Move this Earth element on the fourth line."),
      boxTop: 20,
      boxLeft: 75,
      boxWidth: 35,
      arrow: {
        angle: 270,
        top:8,
        left: 46
      }
    }
  ],
  [
    {
      title: (t: TFunction) => t('The Earth Pattern'),
      text: (t: TFunction) => t("The Earth pattern is the only one which allow you to gather from the stack you placed the tile."),
      boxTop: 50,
      boxLeft: 30,
      boxWidth: 30,
    }, 
    {
      title: (t: TFunction) => t('The Earth Pattern'),
      text: (t: TFunction) => t("You have a huge understanding of the Earth element ! Take all the tiles !"),
      boxTop: 50,
      boxLeft: 30,
      boxWidth: 30,
    }, 
  ],
  [],[],[],
  [
    {
      title: (t: TFunction) => t('The Earth Pattern'),
      text: (t: TFunction) => t("Perfect ! Remember that with the Earth Element, and with enough understanding, you can pick more than four tiles although it is the theoretical maximum with the other elements."),
      boxTop: 55,
      boxLeft: 15,
      boxWidth: 30,

    }, 
    {
      title: (t: TFunction) => t('The Void Pattern'),
      text: (t: TFunction) => t("But it's not always possible (or a good idea) to pick the maximum amount of tiles... Move this Void tile on the fifth column."),
      boxTop: 55,
      boxLeft: 52,
      boxWidth: 40,
      arrow: {
        angle: 270,
        top:50,
        left: 20
      }
    }
  ],
  [
    {
      title: (t: TFunction) => t('The Void Pattern'),
      text: (t: TFunction) => t("The Void pattern, the last one, allows you to gather tiles diagonally adjacent to your placement."),
      boxTop: 55,
      boxLeft: 35,
      boxWidth: 40,
    }, 
    {
      title: (t: TFunction) => t('Restrictions'),
      text: (t: TFunction) => t("But even though you have enough understanding to pick two tiles, you can only pick one here, because of the configuration of the Mountain..."),
      boxTop: 48,
      boxLeft: 32,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top:34,
        left: 48
      }
    }, 
    {
      title: (t: TFunction) => t('Restrictions'),
      text: (t: TFunction) => t("When you move a tile, remember you have to pick the maxiumum of tiles according to your understading and the ressources on the mountain. It could be a good idea to pick no element at all !"),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 50,
    }, 
    {
      title: (t: TFunction) => t('Restrictions'),
      text: (t: TFunction) => t("Pick the only tile available to achieve this lesson."),
      boxTop: 65,
      boxLeft: 39,
      boxWidth: 30,
      arrow: {
        angle: 90,
        top:60,
        left: 50
      }
    }, 
  ],
  [
    {
      title: (t: TFunction) => t('The Keys Elements'),
      text: (t: TFunction) => t("Perfect ! You have all the keys to play Gorinto ! Except one... The Keys Elements."),
      boxTop: 33,
      boxLeft: 15,
      boxWidth: 30,
      arrow: {
        angle: 0,
        top:20,
        left: 2
      }
    }, 
    {
      title: (t: TFunction) => t('The Keys Elements'),
      text: (t: TFunction) => t("Keys Elements is another way to score points in Gorinto. But unlike Goal Cards, you score them at the very end of the game."),
      boxTop: 33,
      boxLeft: 15,
      boxWidth: 30,
      arrow: {
        angle: 0,
        top:20,
        left: 2
      }
    }, 
    {
      title: (t: TFunction) => t('The Keys Elements'),
      text: (t: TFunction) => t("You will score 2 points per Key Element you own. In this game, you will score two points for each Void and Wind element you own."),
      boxTop: 25,
      boxLeft: 45,
      boxWidth: 50,
    }, 
    {
      title: (t: TFunction) => t('The student has surpassed the tutorial'),
      text: (t: TFunction) => t("You know everything now to play Gorinto ! We let you free to play your last move of the season yourself. Try to make the best move to score a lot of points, maybe by equalizing your height stacks ?"),
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 60,
    }, 
  ]
]

const thirdTurnInfo = {
  title: (t: TFunction) => t('2-player game'),
  text: (t: TFunction) => t('For information, in a 2-player game, one tile is discarded from a path each turn, except for the first turn.'),
  boxTop: 50,
  boxLeft: 50,
  boxWidth: 70
}

const lastTurnInfo = {
  title: (t: TFunction) => t('Last Season'),
  text: (t: TFunction) => t("It's the last season ! Be sure to pick a lot of Keys Elements, without losing the balance with Goal Cards !"),
  boxTop: 50,
  boxLeft: 50,
  boxWidth: 70
}

const tutorialEndGame = {
  title: (t: TFunction) => t('Congratulations!'),
  text: (t: TFunction) => t('You have finished your first game! You can now play with your friends, or meet other players via our chat room on Discord.'),
  boxTop: 25,
  boxLeft: 50,
  boxWidth: 80
}


export default TutorialPopup