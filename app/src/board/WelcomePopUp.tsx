/** @jsxImportSource @emotion/react */
import Player from "@gamepark/gorinto/types/Player";
import {usePlayer, usePlayerId} from "@gamepark/react-client";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Goals} from "@gamepark/gorinto/cards/Goals";
import {css} from "@emotion/react";
import {getPlayerName} from "@gamepark/gorinto/GorintoOptions";
import Button from "./Button";
import GameView from "@gamepark/gorinto/types/GameView";
import GoalCard from "./GoalCard";
import background from '../images/BG2.jpg'
import PlayerColor from "@gamepark/gorinto/types/PlayerColor";
import KeyElementCardPanel from "./KeyElementCardPanel";

const WelcomePopUp : FC<{player:Player | undefined, game:GameView, close: () => void}> = ({player, game, close}) => {

    const {t} = useTranslation()
    const playerInfo = usePlayer(player !== undefined ? player.color : undefined) 
    const playerId = usePlayerId<PlayerColor>()
    const isSpec = playerId === undefined

    return(

        <div css={[popupOverlayStyle, showPopupOverlayStyle, style]} onClick={close}>

            <div css={[popupStyle, popupPosition]} onClick={event => event.stopPropagation()}>

                <div css = {closePopupStyle} onClick={close}> <FontAwesomeIcon icon={faTimes} /> </div>
                <h2>{t("Welcome, {playerName}",{playerName: !isSpec 
                  ? playerInfo?.name !== undefined 
                    ? playerInfo?.name 
                    : getPlayerName(player!.color,t)
                  : t("dear spectator")})}</h2>

                <p>{isSpec ? t("welcome.spec.objectives") : t("welcome.player.objectives")}</p>

                <div css={goalCardsStyle}>
                    {game.goals.map((goalNumber, index) =>

                        <GoalCard key={index} 
                                  goal={Goals[goalNumber]} 
                                  css={goalCardPanelPosition}/>

                    )}

                </div>
                <p>{isSpec ? t("welcome.spec.key.elements") : t("welcome.player.key.elements")}</p>

                <div css={keyElementCardsStyle}>

                    {game.keyElements.map((element, index) =>
                
                        <KeyElementCardPanel key = {index}
                                             element = {element}
                                             css={keyElementCardPanelPosition}
                        />
                    )}

                </div>


                <Button css={buttonPosition} onClick={close}>{t('Understood')}</Button>

            </div>

        </div>

    )

}

const buttonPosition = css`
position:relative;
bottom:9%;
left:40%;
`

const goalCardsStyle = css`
position:relative;
margin: 1em auto;
height:40%;
width:90%;

display:flex;
flex-direction:row;
justify-content: center;
`

const goalCardPanelPosition = css`
    position:relative;
    height:100%;
    width:32%;
    margin:0em 1em;
    font-size: 2.2em;
`

const keyElementCardsStyle = css`
position:relative;
margin: 1em auto;
height:25%;
width:90%;

display:flex;
flex-direction:row;
justify-content: center;
`

const keyElementCardPanelPosition = css`
  position:relative;
  height:100%;
  width:21%;
  margin:0em 1em;
  font-size: 1.2em;
`

const popupOverlayStyle = css`
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transform: translateZ(30em);
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
  transform: translateZ(0em);
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
    margin:0;
  }
  & > p {
    position:relative;
    text-align: center;
    font-size: 3em;
    margin:0.5em auto;
    width:80%;

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

export default WelcomePopUp