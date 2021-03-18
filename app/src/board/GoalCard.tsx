/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Goal from '@gamepark/gorinto/types/Goal'
import { FC } from "react"
import {useTranslation} from 'react-i18next'
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
top : 10%;
left : ${79+position*10}%;
width:10%;
height:15%;

background-image:url(${BackGroundGoal});
background-size: contain;
background-repeat: no-repeat;
background-position:top;

p{
    color:black;
    font-size:1em;
    text-align:center;
    width:70%;
    position:absolute;
    right:15%;
    font-family: 'Courgette', cursive;
    letter-spacing: -0.05em;
}

${isHint === false &&
    `
    p:nth-of-type(2n+1){
        top:28%;
        color:black;
    }
    `
}

${isHint === true &&
    `
    p:nth-of-type(2n+1){
        top:17%;
        color:#8c514b;
    }
    p:nth-of-type(2n){
        bottom:25%;
        color:black;
    }
    `
}

span{
    position:absolute;
    bottom:18%;
    right:7%;
    font-size:1.3em;
    font-family: 'Bubblegum Sans', cursive;
    color:white;
    text-shadow: 1px 1px 2px black;
}

`


export default GoalCard