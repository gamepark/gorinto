import { css } from "@emotion/core"
import { FC } from "react"
import {useTranslation} from 'react-i18next'
import Goal from "../types/Goal"

const GoalCard : FC<{goal:Goal, position:number}> = ({goal, position}) => {

    const {t} = useTranslation()

    console.log("le goal : ")
    console.log(goal)

    return(

        <div css={goalCardPanelStyle(position, goal.image)}>
        
            <p>Goal : {goal.text(t)} </p>
            {goal.hint && <p>SubGoal : {goal.hint(t)} </p>}
            <span>{goal.conflictLetter}</span>
        
        </div>

    )

}

const goalCardPanelStyle = (position:number, image:string) => css`
position : absolute;
top : ${(position+2) * 25}%;
left : 0px;
width:100%;
height:25%;

background-image:url(${image});
background-size: contain;
background-repeat: no-repeat;
background-position:center;


`


export default GoalCard