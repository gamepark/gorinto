/** @jsxImportSource @emotion/react */
import {css, Global} from '@emotion/react'
import Gorinto from '@gamepark/gorinto/Gorinto'
import {GorintoOptionsSpec} from '@gamepark/gorinto/GorintoOptions'
import {GameProvider, setupTranslation} from '@gamepark/react-client'
import normalize from 'emotion-normalize'
import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GorintoAnimations from './GorintoAnimations'
import GorintoView from './GorintoView'
import Background from './images/BG2.jpg'
import reportWebVitals from './reportWebVitals'
import translations from './translations.json'
import GorintoTutorial from './tutorial/Tutorial'

setupTranslation(translations)

const style = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'RocknRoll One', sans-serif;
    font-size: 1vh;
    @media (max-aspect-ratio: 16/9) {
      font-size: calc(9vw / 16);
    }
  }

  #root {
    position: absolute;
    height: 100vh;
    width: 100vw;
    user-select: none;
    overflow: hidden;
    background-image: url(${Background});
    background-color: white;
    color: #eee;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`

ReactDOM.render(
  <StrictMode>
    <GameProvider game="gorinto" Rules={Gorinto} 
                  RulesView={GorintoView}
                  optionsSpec={GorintoOptionsSpec}
                  animations={new GorintoAnimations()}
                  tutorial={GorintoTutorial}
    >
      <App/>
    </GameProvider>
    <Global styles={[normalize, style]}/>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
