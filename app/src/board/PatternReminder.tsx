/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, HTMLAttributes } from "react"
import Pattern from '../images/GOR_TTS_pattern.jpg'

type Props = {
    open:() => void
} & HTMLAttributes<HTMLDivElement>

const PatternReminder : FC<Props> = ({open, ...props}) => {

    return (

        <div css={PatternReminderStyle} onClick={open} >  </div>

    )

}

const PatternReminderStyle = css`
position:absolute;
left:0%;
top:0%;
height:10%;
width:20%;
border-radius: 30% 30% 0% 0%;

background-image:url(${Pattern});
background-repeat:no-repeat;
background-size:contain;
background-position:bottom;
filter: drop-shadow(0 0 0.75em black);
`

export default PatternReminder