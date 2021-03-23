/** @jsxImportSource @emotion/react */

import Player from "@gamepark/gorinto/types/Player";
import { usePlayer } from "@gamepark/react-client";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import Game from "@gamepark/gorinto/types/Game";
import { Goals } from "@gamepark/gorinto/cards/Goals";
import GoalCard from './GoalCard';
import KeyElementCardPanel from "./KeyElementCardPanel";
import { Keys } from "@gamepark/gorinto/cards/KeyElement";
import { css } from "@emotion/react";

const WelcomePopUp : FC<{player:Player, game:Game, close: () => void}> = ({player, game, close}) => {

    const {t} = useTranslation()
    const playerInfo = usePlayer(player.color)

    return(

        <div css={[popupOverlayStyle, showPopupOverlayStyle, style]} onClick={close}>

            <div css={[popupStyle, popupPosition]} onClick={event => event.stopPropagation()}>

                <div css = {closePopupStyle} onClick={close}> <FontAwesomeIcon icon={faTimes} /> </div>
                <h2>{t("Welcome, {playerName}",{playerName:playerInfo?.name})}</h2>

                {game.twoGoals.map((goalNumber, index) =>
            
                    <GoalCard key = {index}
                            goal = {Goals[goalNumber]}
                    />
        
                )}

                {game.twoKeyElementCards.map((cardNumber, index) =>
            
                    <KeyElementCardPanel key = {index}
                                         keyCard = {Keys[cardNumber]}
                    />
                )}

                <p> {t("You play with these two Goals and with these two Key Elements. Good luck, and have fun !")} </p>

            </div>




        </div>

    )

}

export const popupOverlayStyle = css`
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: all .5s ease;
`
export const showPopupOverlayStyle = css`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

export const popupStyle = css`
  position: absolute;
  text-align: center;
  max-height: 70%;
  z-index : 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }
  & > h2 {
    font-size: 5em;
    margin:0;
  }
  & > p {
    font-size: 4em;
    margin: 2% 0;
  }
  & > button {
    font-size: 4em;
  }
`

export const popupPosition = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const style = css`
  background-color: transparent;
`

export const closePopupStyle = css`
  position: relative;
  float: right;
  text-align: center;
  margin-top: -2%;
  margin-right: -0%;
  font-size: 4em;
  &:hover{
    cursor: pointer;
    color: #26d9d9;
  }
`



export default WelcomePopUp