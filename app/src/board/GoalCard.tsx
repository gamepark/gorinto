/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react"
import ScoreGoals, { isScoreGoals } from "@gamepark/gorinto/moves/ScoreGoals"
import Goal from '@gamepark/gorinto/types/Goal'
import { useAnimation } from "@gamepark/react-client"
import {FC, HTMLAttributes} from "react"
import {Trans, useTranslation} from 'react-i18next'
import goalCardBackground from "../images/goal_background.jpg"

type Props = {
    goal: Goal
    score?:number
} & HTMLAttributes<HTMLDivElement>

const GoalCard: FC<Props> = ({goal, score, ...props}) => {

    const {t} = useTranslation()
    const animationScoring = useAnimation<ScoreGoals>(animation => isScoreGoals(animation.move))


    return (

        <div css={goalCardCss} {...props}>

            {goal.hint && <p css={hintCss}>{goal.hint(t)}</p>}
            <p><Trans defaults={goal.text} components={[<strong/>]}/></p>
            {goal.conflictLetter && <span className="notranslate" css={conflictLetterCss}>{goal.conflictLetter}</span>}

        {score !== undefined &&
                <p css = {[hintForScoring, !animationScoring && hidden, score === 0 && redStyle]}>+{score}</p>
        }
        </div>

    )

}

const redStyle = css`
color:#B51313;
`

const hidden = css`
visibility:hidden;
background-color:rgba(255,255,255,0);
opacity:0;
transition:opacity 1s, visibility 1s, background-color 1s;
`


const hintForScoring = css`
visibility:visible;
position:absolute;
width:80%;
top:0%;
left:10%;
margin:0.25em 0!important;
padding:0.37em 0!important;
background-color:rgba(255,255,255,0.5);
opacity:1;
transition:opacity 1s,visibility 1s, background-color 1s;

font-size : 6em;
text-align:center;

`

const goalCardCss = css`
    background-image: url(${goalCardBackground});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
    color: black;

    p {
        margin: 0.4em 0;
        text-align: center;
        font-family: 'Courgette', cursive;
        letter-spacing: -0.05em;
        line-height: 1.2em;
        white-space: break-spaces;
        
        strong {
            font-weight: normal;
            color: red;
        }
    }
`

const hintCss = css`
    font-size: 0.9em;
    color: #8c514b;
`

const conflictLetterCss = css`
    position: absolute;
    bottom: 6%;
    right: 8%;
    font-family: 'Bubblegum Sans', cursive;
    color: white;
    text-shadow: 1px 1px 2px black;
`

export default GoalCard