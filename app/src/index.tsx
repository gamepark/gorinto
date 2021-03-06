/** @jsxImportSource @emotion/react */
import {css, Global} from '@emotion/react'
import Gorinto from '@gamepark/gorinto/Rules'
import {createGameStore} from '@gamepark/react-client'
import React from 'react'
import normalize from 'emotion-normalize'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Background from './images/BG2.jpg'

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
    background-image:url(${Background});
    background-color: white;
    background-size: cover;
    background-position: bottom;
    color: #eee;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createGameStore('gorinto', Gorinto)}>
      <App/>
    </Provider>
    <Global styles={[normalize, style]}/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
