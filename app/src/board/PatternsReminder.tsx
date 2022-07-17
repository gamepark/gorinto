/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useState} from 'react'
import {Dialog, Picture} from '@gamepark/react-components'
import {useTranslation} from 'react-i18next'
import Button from './Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import background from '../images/BG2.jpg'
import {getElementName} from './ElementTile'
import Element from '@gamepark/gorinto/types/Element'
import Images from '../images/Images'

export default function PatternsReminder() {
  const {t} = useTranslation()
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <>
      <div css={patternsStyle} onClick={() => setDialogOpen(true)}/>
      <Dialog open={dialogOpen} onBackdropClick={() => setDialogOpen(false)} css={popupStyle}>
        <FontAwesomeIcon css={closePopupStyle} onClick={() => setDialogOpen(false)} icon={faTimes}/>
        <h2 css={dialogTitle}>{t('Elemental patterns')}</h2>
        <div css={rulesCss}>
          <div css={elementRuleCss}>
            <Picture src={Images.patternVoid} alt="Void pattern" css={patternCss}/>
            <h3>{getElementName(Element.Void, t)}</h3>
            <p>{t('void.pattern.rule')}</p>
          </div>
          <div css={elementRuleCss}>
            <Picture src={Images.patternWind} alt="Wind pattern" css={patternCss}/>
            <h3>{getElementName(Element.Wind, t)}</h3>
            <p>{t('wind.pattern.rule')}</p>
          </div>
          <div css={elementRuleCss}>
            <Picture src={Images.patternFire} alt="Fire pattern" css={patternCss}/>
            <h3>{getElementName(Element.Fire, t)}</h3>
            <p>{t('fire.pattern.rule')}</p>
          </div>
          <div css={elementRuleCss}>
            <Picture src={Images.patternWater} alt="Water pattern" css={patternCss}/>
            <h3>{getElementName(Element.Water, t)}</h3>
            <p>{t('water.pattern.rule')}</p>
          </div>
          <div css={elementRuleCss}>
            <Picture src={Images.patternEarth} alt="Earth pattern" css={patternCss}/>
            <h3>{getElementName(Element.Earth, t)}</h3>
            <p>{t('earth.pattern.rule')}</p>
          </div>
        </div>
        <Button css={buttonCss} onClick={() => setDialogOpen(false)}>{t('Understood')}</Button>
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

  background-image: url(${Images.patterns});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;

  &:hover {
    cursor: pointer;
  }
`

const popupStyle = css`
  position: relative;
  font-size: 3.2em;
  padding: 1em;
  box-shadow: black 0 0 0.2em;
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

  &:hover {
    color: white;
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
    margin: 0 0.2em;
  }
`

const patternCss = css`
  width: 10em;
`

const buttonCss = css`
  position: relative;
  margin-top: 1em;
`