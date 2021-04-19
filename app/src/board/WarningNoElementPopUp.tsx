/** @jsxImportSource @emotion/react */

import {usePlay} from "@gamepark/react-client";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {css} from "@emotion/react";
import Button from "./Button";
import MoveTile from "@gamepark/gorinto/moves/MoveTile";
import PathType from "@gamepark/gorinto/types/PathType";
import MoveType from "@gamepark/gorinto/types/MoveType";

const WarningNoElementPopUp : FC<{close: () => void, path:PathType, x:number, y:number}> = ({close, path, x, y}) => {

    const {t} = useTranslation()
    const playMove = usePlay<MoveTile>()

    return(

        <div css={[popupOverlayStyle, showPopupOverlayStyle, style]} onClick={close}>

            <div css={[popupStyle, popupPosition]} onClick={event => event.stopPropagation()}>

                <div css = {closePopupStyle} onClick={close}> <FontAwesomeIcon icon={faTimes} /> </div>
                <h2>{t("Warning !")}</h2>
                <p>{t("You're about to play a move which doesn't allow you to pick any tile ! Do you still want to do it ?")}</p>

                <Button css={buttonPosition1} onClick={() => playMove({type:MoveType.MoveTile,path,x,y})}>{t("Yes ! Sure")}</Button>
                <Button css={buttonPosition2} onClick={close}>{t("No ! Don't")}</Button>

            </div>




        </div>

    )

}

const buttonPosition1 = css`
position:absolute;
left:20%;
bottom:10%;

height:15%;
`

const buttonPosition2 = css`
position:absolute;
right:20%;
bottom:10%;

height:15%;
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
  height: 42%;
  width:60%;
  z-index : 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border:1em black solid;
  background-color:rgba(177,183,185,1);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }

  & > h2 {
      text-align:center;
      font-size:6em;
      color:#c70000;
      width:100%;
      margin-top:0em;
      margin-bottom:0.5em;
  }

  & > p {
    text-align: center;
    font-size: 4em;

    width:100%;
    color:black;
    margin-top:0.5em;
    margin-bottom:0.5em;

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

export default WarningNoElementPopUp