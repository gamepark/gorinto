/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from "react"
import Pattern from '../images/GOR_TTS_pattern.png'

const PatternReminder : FC<{}> = () => {

    return (

        <div css={PatternReminderStyle}>  </div>

    )

}

const PatternReminderStyle = css`
position:absolute;
right:1%;
top:0%;
height:10%;
width:20%;

background-image:url(${Pattern});
background-repeat:no-repeat;
background-size:contain;
background-position:bottom;
filter: drop-shadow(0 0 0.75em black);
`

export default PatternReminder