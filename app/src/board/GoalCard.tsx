/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react"
import Goal from '@gamepark/gorinto/types/Goal'
import {FC, HTMLAttributes} from "react"
import {Trans, useTranslation} from 'react-i18next'
import goalCardBackground from "../images/goal_background.jpg"

type Props = {
    goal: Goal
} & HTMLAttributes<HTMLDivElement>

const GoalCard: FC<Props> = ({goal, ...props}) => {

    const {t} = useTranslation()

    return (

        <div css={goalCardCss} {...props}>

            {goal.hint && <p css={hintCss}>{goal.hint(t)}</p>}
            <p><Trans defaults={goal.text(t)} components={[<strong/>]}/></p>
            {goal.conflictLetter && <span className="notranslate" css={conflictLetterCss}>{goal.conflictLetter}</span>}

        </div>

    )

}

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