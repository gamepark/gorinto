/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GameView from "@gamepark/gorinto/types/GameView";
import Move from "@gamepark/gorinto/types/Move";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import {useActions, useFailures, usePlayerId, useTutorial} from "@gamepark/react-client";
import {TFunction} from "i18next";
import {FC, useEffect, useRef, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import Arrow from "../images/tutorial-arrow-grey.png"
import Button from "../board/Button";
import background from '../images/BG2.jpg'

declare type Tutorial = {
  playNextMoves: (quantity?: number) => void;
  playNextMove: () => void;
  setOpponentsPlayAutomatically: (value?: boolean) => void;
};

const TutorialPopup : FC<{game:GameView, tutorial:Tutorial}> = ({game}) => {

    const {t} = useTranslation()
    const playerId = usePlayerId<PlayerColor>()
    const actions = useActions<Move, PlayerColor>()
    const actionsNumber = actions !== undefined ? actions.filter(action => action.playerId === playerId).length : 0
    const previousActionNumber = useRef(actionsNumber)
    const [tutorialIndex, setTutorialIndex] = useState(0)
    const [tutorialDisplay, setTutorialDisplay] = useState(tutorialDescription.length > actionsNumber)
    const [failures] = useFailures()
    const [hideLastTurnInfo, setHideLastTurnInfo] = useState(false)
    const [hideThirdTurnInfo, setHideThirdTurnInfo] = useState(false)
    const [hideEndInfo, setHideEndInfo] = useState(false)

    const platformUri = process.env.REACT_APP_PLATFORM_URI ?? 'https://game-park.com'
    const discordUri = 'https://discord.gg/nMSDRag'

    const moveTutorial = (deltaMessage: number) => {
      setTutorialIndex(tutorialIndex + deltaMessage)
      setTutorialDisplay(true)
    }
    
    const resetTutorialDisplay = () => {
      if (game.activePlayer !== undefined){
        if (game.season === 3){
          setHideThirdTurnInfo(false)
        } else if (game.season === 4){
          setHideLastTurnInfo(false)
        } else {
          setTutorialIndex(0)
          setTutorialDisplay(true)
        }

      } else {
        setHideEndInfo(false)
      }

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
    const indexsWhichDontDisplay = [[2,1],[5,1],[8,1],[13,0],[15,0]];

    const displayPopup = playerId === game.activePlayer 
    ? tutorialDisplay && currentMessage && !failures.length
    : tutorialDisplay && currentMessage && !failures.length && !(indexsWhichDontDisplay.some(tab => tab[0] === actionsNumber && tab[1] === tutorialIndex))

    const tutorial = useTutorial()
    useEffect(() => {
      tutorial && tutorial.setOpponentsPlayAutomatically(true)
      }, []
    )

    return (
        <>

        <div css={[popupOverlayStyle, displayPopup ? showPopupOverlayStyle : hidePopupOverlayStyle(85, 90), style]}
            onClick={() => setTutorialDisplay(false)}>

            <div css={[popupStyle, displayPopup ? popupPosition(currentMessage) : hidePopupStyle]}
                onClick={event => event.stopPropagation()}>

              <div css={closePopupStyle} onClick={() => setTutorialDisplay(false)}><FontAwesomeIcon icon={faTimes}/></div>

              {currentMessage && <h2>{currentMessage.title(t)}</h2>}
              {currentMessage && <p> <Trans defaults={currentMessage.text} components={[<strong/>]} /> </p>}
              {tutorialIndex > 0 && <Button css={buttonStyle} onClick={() => moveTutorial(-1)}>{'<<'}</Button>}
              <Button onClick={() => moveTutorial(1)}>{t('OK')}</Button>

            </div>

        </div>

        {
        !displayPopup && 
        <Button css={resetStyle} onClick={() => resetTutorialDisplay()}>{t('Show Tutorial')}</Button>
      }

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
            <p>{t(thirdTurnInfo.text)}</p>
            <Button onClick={() => setHideThirdTurnInfo(true)}>{t('OK')}</Button>
          </div>
        }

        {
          game.season === 4 && game.activePlayer !== undefined && !hideLastTurnInfo &&
          <div css={[popupStyle, popupPosition(lastTurnInfo)]}>
            <div css={closePopupStyle} onClick={() => setHideLastTurnInfo(true)}><FontAwesomeIcon icon={faTimes}/></div>
            <h2>{lastTurnInfo.title(t)}</h2>
            <p>{t(lastTurnInfo.text)}</p>
            <Button onClick={() => setHideLastTurnInfo(true)}>{t('OK')}</Button>
          </div>
        }

        {
          game.activePlayer === undefined && !hideEndInfo &&
          <div css={[popupStyle, endStyle, popupPosition(tutorialEndGame)]}>
            <div css={closePopupStyle} onClick={() => setHideEndInfo(true)}><FontAwesomeIcon icon={faTimes}/></div>
            <h2 css={textEndStyle} >{tutorialEndGame.title(t)}</h2>
            <p css={textEndStyle} >{t(tutorialEndGame.text)}</p>
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
  background-color: black;
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  color:white;
  font-family: 'Mulish', sans-serif;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    border-radius: 40em 1.5em 40em 1.5em/1.5em 40em 1.5em 40em;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }
  & > h2 {
    position:relative;
    font-size: 5em;
    margin:0 1em;
  }
  & > p {
    position:relative;
    text-align: center;
    font-size: 3.5em;
    white-space: break-spaces;

    strong {
      font-weight:bold;
    }

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

const resetStyle = css`
  position: absolute;
  text-align: center;
  bottom: 36.5%;
  right: 1%;
  font-size: 3em;
`

type TutorialStepDescription = {
    title: (t: TFunction) => string
    text: string
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
          text: 'tuto.welcome',
          boxTop: 40,
          boxLeft: 50,
          boxWidth: 60
        },
        {
          title: (t: TFunction) => t('Your Gorinto'),
          text: 'tuto.your.gorinto',
          boxTop: 78,
          boxLeft: 42,
          boxWidth: 50,
          arrow: {
            angle: 270,
            top: 72,
            left: 5
          }
        },
        {
          title: (t: TFunction) => t('Your opponents'),
          text: 'tuto.your.opponents',
          boxTop: 55,
          boxLeft: 47,
          boxWidth: 55,
        },
        {
          title: (t: TFunction) => t('The Seasons'),
          text: 'tuto.seasons',
          boxTop: 26,
          boxLeft: 72,
          boxWidth: 30,
          arrow: {
            angle: 0,
            top: 13,
            left: 68
          }
        },
        {
          title: (t: TFunction) => t('Wisdom points'),
          text: 'tuto.wisdom.points',
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
          title: (t: TFunction) => t('The Goals'),
          text: 'tuto.goals',
          boxTop: 40,
          boxLeft: 44,
          boxWidth: 50,
          arrow: {
            angle: 90,
            top: 33,
            left: 65
          }
        },
        {
          title: (t: TFunction) => t('The Key Elements'),
          text: 'tuto.keys',
          boxTop: 25,
          boxLeft: 51,
          boxWidth: 50,
          arrow: {
            angle: 270,
            top: 15,
            left: 14
          }
        },
        {
          title: (t: TFunction) => t('The board'),
          text: 'tuto.board',
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
          title: (t: TFunction) => t('The Path'),
          text: 'tuto.path',
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
          text: "tuto.move.fire",
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
        text: "tuto.take.intro",
        boxTop: 50,
        boxLeft: 50,
        boxWidth: 40,

      },
      {
        title: (t: TFunction) => t('The Patterns'),
        text: "tuto.patterns",
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
        text: "tuto.pattern.fire",
        boxTop: 50,
        boxLeft: 70,
        boxWidth: 30,
      },
      {
        title: (t: TFunction) => t('tuto.gather', {number: 1}),
        text: "tuto.take.with.fire.pattern",
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
        title: (t: TFunction) => t('End of your turn'),
        text: "tuto.end.first.turn",
        boxTop: 70,
        boxLeft: 15,
        boxWidth: 30,
      },    
      {
        title: (t: TFunction) => t('The Wind Pattern'),
        text: "tuto.move.wind",
        boxTop: 22,
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
      text: "tuto.wind.pattern",
      boxTop: 40,
      boxLeft: 80,
      boxWidth: 30,
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: "tuto.understanding",
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 60,
    },
    {
      title: (t: TFunction) => t('Understanding'),
      text: "tuto.understanding.wind",
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
      title: (t: TFunction) => t('tuto.gather', {number: 2}),
      text: "tuto.take.with.wind",
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
      title: (t: TFunction) => t('End of your turn'),
      text: "tuto.end.second.turn",
      boxTop: 35,
      boxLeft: 15,
      boxWidth: 30
    }, 
    {
      title: (t: TFunction) => t('New turn'),
      text: "tuto.move.water",
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
      text: "tuto.water.pattern",
      boxTop: 70,
      boxLeft: 50,
      boxWidth: 60,
    }, 
  ],
  [],
  [
    {
      title: (t: TFunction) => t('End of the Season'),
      text: "tuto.end.third.turn",
      boxTop: 75,
      boxLeft: 22,
      boxWidth: 40,
    }, 
    {
      title: (t: TFunction) => t('End of the Season'),
      text: "tuto.push.marker",
      boxTop: 18,
      boxLeft: 46,
      boxWidth: 40,
      arrow: {
        angle: 90,
        top:6,
        left: 62
      }
    }, 
    {
      title: (t: TFunction) => t('End of the Season'),
      text: "tuto.count.goals",
      boxTop: 48,
      boxLeft: 44,
      boxWidth: 50,
      arrow: {
        angle: 90,
        top:32,
        left: 65
      }
    },
    {
      title: (t: TFunction) => t('Your Wisdom points'),
      text: "tuto.your.wisdom.points",
      boxTop: 75,
      boxLeft: 20,
      boxWidth: 40,
      arrow: {
        angle: 180,
        top:76,
        left: 6
      }
    },
    {
      title: (t: TFunction) => t('Start of a new Season'),
      text: "tuto.start.new.season",
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 50,

    },
    {
      title: (t: TFunction) => t('New turn'),
      text: "tuto.move.earth",
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
      text: "tuto.earth.pattern",
      boxTop: 50,
      boxLeft: 30,
      boxWidth: 30,
    }, 
    {
      title: (t: TFunction) => t('Understanding'),
      text: "tuto.understanding.earth",
      boxTop: 75,
      boxLeft: 22,
      boxWidth: 45,
      arrow: {
        angle: 180,
        top:76,
        left: 2
      }
    }, 
    {
      title: (t: TFunction) => t('tuto.gather', {number: 4}),
      text: "tuto.take.with.earth",
      boxTop: 50,
      boxLeft: 30,
      boxWidth: 30,
    }, 
  ],
  [],[],[],
  [
    {
      title: (t: TFunction) => t('New turn'),
      text: "tuto.move.void",
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
      text: "tuto.void.pattern",
      boxTop: 55,
      boxLeft: 35,
      boxWidth: 40,
    }, 
    {
      title: (t: TFunction) => t('Understanding'),
      text: "tuto.understanding.void",
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
      title: (t: TFunction) => t('Understanding'),
      text: "tuto.must.take.max",
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 60,
    }, 
    {
      title: (t: TFunction) => t('Gather this tile'),
      text: "tuto.take.with.void",
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
      title: (t: TFunction) => t('It’s your turn!'),
      text: "tuto.reminder.scoring",
      boxTop: 50,
      boxLeft: 50,
      boxWidth: 75,
    }, 

    {
      title: (t: TFunction) => t('It’s your turn!'),
      text: "tuto.end.help",
      boxTop: 25,
      boxLeft: 30,
      boxWidth: 60,
      arrow: {
        angle: 0,
        top:10,
        left: 3
      }
    }, 
  ]
]

const thirdTurnInfo = {
  title: (t: TFunction) => t('Two player game'),
  text: 'tuto.2.players',
  boxTop: 50,
  boxLeft: 50,
  boxWidth: 70
}

const lastTurnInfo = {
  title: (t: TFunction) => t('Last Season'),
  text: "tuto.last.season",
  boxTop: 50,
  boxLeft: 50,
  boxWidth: 70
}

const tutorialEndGame = {
  title: (t: TFunction) => t('Congratulations'),
  text: 'You have finished your first game! You can now play with your friends, or meet other players via our chat room on Discord.',
  boxTop: 29,
  boxLeft: 50,
  boxWidth: 80
}


export default TutorialPopup