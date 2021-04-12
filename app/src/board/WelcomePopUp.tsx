/** @jsxImportSource @emotion/react */
import Player from "@gamepark/gorinto/types/Player";
import {usePlayer} from "@gamepark/react-client";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Goals} from "@gamepark/gorinto/cards/Goals";
import {css} from "@emotion/react";
import KeyElementCardPanelPopUp from "./KeyElementCardPanelPopUp";
import {getPlayerName} from "@gamepark/gorinto/GorintoOptions";
import Button from "./Button";
import GameView from "@gamepark/gorinto/types/GameView";
import GoalCard from "./GoalCard";

const WelcomePopUp : FC<{player:Player, game:GameView, close: () => void}> = ({player, game, close}) => {

    const {t} = useTranslation()
    const playerInfo = usePlayer(player.color)

    return(

        <div css={[popupOverlayStyle, showPopupOverlayStyle, style]} onClick={close}>

            <div css={[popupStyle, popupPosition]} onClick={event => event.stopPropagation()}>

                <div css = {closePopupStyle} onClick={close}> <FontAwesomeIcon icon={faTimes} /> </div>
                <h2>{t("Welcome, {playerName}",{playerName: playerInfo?.name !== undefined ? playerInfo?.name : getPlayerName(player.color,t)})}</h2>

                <div css={cardsStyle}>

                    {game.goals.map((goalNumber, index) =>

                        <GoalCard key={index} goal={Goals[goalNumber]} css={goalCardPanelPosition(index)}/>

                    )}

                    {game.keyElements.map((element, index) =>
                
                        <KeyElementCardPanelPopUp key = {index}
                                                  element = {element}
                                                  position = {index}
                        />
                    )}

                </div>

                <p> {t("You play with these two Goals and with these two Key Elements. Good luck, and have fun !")} </p>

                <Button css={buttonPosition} onClick={close}>{t('Understood')}</Button>

            </div>




        </div>

    )

}

const buttonPosition = css`
position:absolute;
right:8%;
bottom:4%;

height:10%;
`

const cardsStyle = css`
position:absolute;

width:95%;
height:70%;
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

const popupPosition = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const goalCardPanelPosition = (position: number) => css`
    position: absolute;
    top: 5%;
    left: ${15 + (position * 37)}%;
    width: 33.5%;
    height: 60%;
    font-size: 2.2em;
`

export default WelcomePopUp