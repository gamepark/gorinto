import { css } from "@emotion/core"
import { FC } from "react"
import {useTranslation} from 'react-i18next'
import Goal from "../types/Goal"
import BackGroundGoal from "../images/goal_background.jpg"

const GoalCard : FC<{goal:Goal, position:number}> = ({goal, position}) => {

    const {t} = useTranslation()

    return(

        <div css={goalCardPanelStyle(position, goal.hint !== undefined)}>
        
            {goal.hint && <p>Hint : {goal.hint(t)} </p>}
            <p>Goal : {goal.text(t)} </p>
            <span>{goal.conflictLetter}</span>
        
        </div>

    )

}

const goalCardPanelStyle = (position:number, isHint:boolean) => css`

position : absolute;
top : ${(position+2) * 25}%;
left : 0px;
width:100%;
height:25%;

background-image:url(${BackGroundGoal});
background-size: contain;
background-repeat: no-repeat;
background-position:center;

p{
    color:black;
    font-size:1.6em;
    text-align:center;
    width:60%;
    position:absolute;
    right:20%;
    font-family: 'Courgette', cursive;
    letter-spacing: -0.05em;
}

${isHint === false &&
    `
    p:nth-child(2n+1){
        top:25%;
        color:black;
    }
    `
}

${isHint === true &&
    `
    p:nth-child(2n+1){
        top:14%;
        color:#8c514b;
    }
    p:nth-child(2n){
        bottom:14%;
        color:black;
    }
    `
}

span{
    position:absolute;
    bottom:9%;
    right:16%;
    font-size:1.5em;
    font-family: 'Bubblegum Sans', cursive;
    color:white;
    text-shadow: 1px 1px 2px black;
}

`


export default GoalCard