/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { css } from "@emotion/react";
import Button from "./Button";

import PatternBGLess from '../images/GOR_TTS_pattern_big_bgless.png'

const PatternPopUp : FC<{close: () => void}> = ({close}) => {

    const {t} = useTranslation()

    return(

        <div css={[popupOverlayStyle, showPopupOverlayStyle, style]} onClick={close}>

            <div css={[popupStyle, popupPosition]} onClick={event => event.stopPropagation()}>
                
                <div css = {closePopupStyle} onClick={close}> <FontAwesomeIcon icon={faTimes} /> </div>

                <h2>{t("Reminder of Elemental Patterns")}</h2>

                <div css={patternStyle}></div>

                <p css={[voidTake, explanation]}>{t("Diagonal Gathering")}</p>
                <p css={[windTake, explanation]}>{t("Orthogonal Gathering")}</p>
                <p css={[waterTake, explanation]}>{t("Column Gathering")}</p>
                <p css={[fireTake, explanation]}>{t("Row Gathering")}</p>
                <p css={[earthTake, explanation]}>{t("Stack Gathering")}</p>

                <Button css={buttonPosition} onClick={close}>{t('Understood')}</Button>

            </div>

        </div>

    )

}

const explanation = css`
position:absolute;
top:55%;
`

const voidTake = css`left:6.5%;width:15%;`
const windTake = css`left:23%;width:20%;;`
const waterTake = css`left:47.5%;width:15%;`
const fireTake = css`left:66%;width:15%;`
const earthTake = css`left:82%;width:15%;`

const buttonPosition = css`
position:absolute;
bottom:10%;

transform:translateX(-50%);
`

const patternStyle = css`
position:absolute;
left:5%;
width:90%;
height:35%;
background-image:url(${PatternBGLess});
background-position:top;
background-size:contain;
background-repeat:no-repeat;
border-radius: 0% 0% 10% 10%;
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
  height: 70%;
  width:65%;
  z-index : 102;
  border-radius: 1em;
  box-sizing: border-box;
  align-self: center;
  padding: 2%;
  margin: 0 2%;
  outline: none;
  box-shadow: 1em 2em 2.5em -1.5em hsla(0, 0%, 0%, 0.2);
  border:1em black solid;
  background-color:rgba(0,6,89,0.95);
  border-radius: 40em 3em 40em 3em/3em 40em 3em 40em;
  
  &:hover{
      box-shadow: 2em 4em 5em -3em hsla(0,0%,0%,.5);
    }
  & > h2 {
    font-size: 5em;
    margin:0;
    padding-bottom:1em;
    text-shadow: 0.15em 0.15em 0.2em black;
  }
  & > p {
    text-align: center;
    font-size: 3em;
    text-shadow: 0.15em 0.15em 0.2em black;
  }
  & > button {
    font-size: 3.2em;
    height:10%;
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

export default PatternPopUp