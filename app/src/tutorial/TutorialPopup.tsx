import { css } from "@emotion/react";
import {faMinusSquare, faPlusSquare, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import GameState from "@gamepark/gorinto/types/GameState";
import Move from "@gamepark/gorinto/types/Move";
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import { useActions, usePlayerId } from "@gamepark/react-client";
import { TFunction } from "i18next";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "src/board/Button";

const TutorialPopup : FC<{game:GameState}> = ({game}) => {

    const {t} = useTranslation()
    const playerId = usePlayerId<PlayerColor>()
    const actions = useActions<Move, PlayerColor>()
    const actionsNumber = actions !== undefined ? actions.filter(action => action.playerId === playerId).length : 0

    const [tutorialIndex, setTutorialIndex] = useState(0)
    const [tutorialDisplay, setTutorialDisplay] = useState(tutorialDescription.length > actionsNumber)


    const tutorialMessage = (index: number) => {
        let currentStep = actionsNumber
        while (!tutorialDescription[currentStep]) {
          currentStep--
        }
        return tutorialDescription[currentStep][index]
      }

    const currentMessage = tutorialMessage(tutorialIndex)



    return (
        <>

    <div css={[popupOverlayStyle, style]}
           onClick={() => setTutorialDisplay(false)}>
        <div css={[popupStyle]}
             onClick={event => event.stopPropagation()}>
          <div css={closePopupStyle} onClick={() => setTutorialDisplay(false)}><FontAwesomeIcon icon={faTimes}/></div>
          {currentMessage && <h2>{currentMessage.title(t)}</h2>}
          {currentMessage && <p>{currentMessage.text(t)}</p>}

        </div>
    </div>

        </>
    )

}

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
  height: 80%;
  width:80%;
  z-index : 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border:1em black solid;
  background-color:rgba(157,163,165,1);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }
  & > h2 {
    font-size: 5em;
    margin:0;
    text-shadow: 0.15em 0.15em 0.2em black;
  }
  & > p {
    text-align: justify;
    font-size: 3.5em;

    position:absolute;
    bottom:0%;
    left:8%;
    width:62%;

    text-shadow: 0.1em 0.1em 0.15em black;
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
  top: 86%;
  width: 80%;
`

const resetStyle = css`
  position: absolute;
  text-align: center;
  bottom: 10%;
  right: 1%;
  font-size: 3.5em;
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
            boxTop: 50,
            boxLeft: 50,
            boxWidth: 60
          }
    ]
]

export default TutorialPopup