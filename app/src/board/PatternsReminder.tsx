/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useState} from "react"
import patterns from '../images/patterns.png'
import {Dialog} from "@gamepark/react-components";
import {useTranslation} from "react-i18next";
import Button from "./Button";
import patternEarth from "../images/pattern-earth.png";
import patternVoid from "../images/pattern-void.png";
import patternWind from "../images/pattern-wind.png";
import patternWater from "../images/pattern-water.png";
import patternFire from "../images/pattern-fire.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import background from '../images/BG2.jpg'
import {getElementName} from "./ElementTile";
import Element from "@gamepark/gorinto/types/Element";

export default function PatternsReminder() {
    const {t} = useTranslation()
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <>
            <div css={patternsStyle} onClick={() => setDialogOpen(true)}/>
            <Dialog open={dialogOpen} onBackdropClick={() => setDialogOpen(false)} css={popupStyle}>
                <FontAwesomeIcon css={closePopupStyle} onClick={() => setDialogOpen(false)} icon={faTimes}/>
                <h2 css={dialogTitle}>{t("Elemental patterns")}</h2>
                <div css={rulesCss}>
                    <div css={elementRuleCss}>
                        <img src={patternVoid} alt="Void pattern"/>
                        <h3>{getElementName(Element.Void, t)}</h3>
                        <p>{t("Can gather from the four locations diagonally adjacent to your placement.")}</p>
                    </div>
                    <div css={elementRuleCss}>
                        <img src={patternWind} alt="Wind pattern"/>
                        <h3>{getElementName(Element.Wind, t)}</h3>
                        <p>{t("Can gather from the four locations orthogonally adjacent to your placement.")}</p>
                    </div>
                    <div css={elementRuleCss}>
                        <img src={patternFire} alt="Fire pattern"/>
                        <h3>{getElementName(Element.Fire, t)}</h3>
                        <p>{t("Can gather from the four other spaces in your placement’s column.")}</p>
                    </div>
                    <div css={elementRuleCss}>
                        <img src={patternWater} alt="Water pattern"/>
                        <h3>{getElementName(Element.Water, t)}</h3>
                        <p>{t("Can gather from the four other spaces in your placement’s row.")}</p>
                    </div>
                    <div css={elementRuleCss}>
                        <img src={patternEarth} alt="Earth pattern"/>
                        <h3>{getElementName(Element.Earth, t)}</h3>
                        <p>{t("Can gather from the stack you placed upon.")}</p>
                    </div>
                </div>
                <Button css={buttonCss} onClick={() => setDialogOpen(false)}>{t("Understood")}</Button>
            </Dialog>
        </>
    )
}

const patternsStyle = css`
    position: absolute;
    left: 0;
    top: 0;
    height: 9%;
    width: 20%;

    background-image: url(${patterns});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
`

const popupStyle = css`
    position: relative;
    color: black;
    text-align: center;
    border-radius: 1em;
    background-image: url(${background});
    width: 80vw;
    border: 0.1em solid #333333;

    &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 1em;
    }
`

const closePopupStyle = css`
    position: absolute;
    top: 0.4em;
    right: 0.6em;
    font-size: 2em;
    cursor: pointer;

    &:active {
        top: 0.45em;
    }
`

const dialogTitle = css`
    position: relative;
    margin: 0 2em;
`

const rulesCss = css`
    position: relative;
    display: flex;
`

const elementRuleCss = css`
    flex: 1 1 0;
    width: 0;

    & > img {
        width: 100%;
    }

    & > h3 {
        margin: 0 0 0.3em;
    }

    & > p {
        margin: 0;
    }
`

const buttonCss = css`
    position: relative;
    margin-top: 1em;
`