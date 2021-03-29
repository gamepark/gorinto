/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Goal from '@gamepark/gorinto/types/Goal'
import { FC, HTMLAttributes } from "react"
import {useTranslation} from 'react-i18next'
import BackGroundGoal from "../images/goal_background.jpg"

type Props = {
    goal:Goal,
    position:number
} & HTMLAttributes<HTMLDivElement>

const GoalCardPopUp : FC<Props> = ({goal, position, ...props}) => {

    const {t} = useTranslation()

    return(

        <div css={[goalCardPanelStyle(goal.hint !== undefined), goalCardPanelPosition(position)]}>
        
            {goal.hint && <p>{goal.hint(t)} </p>}
            <p>{goal.text(t)} </p>
            {goal.conflictLetter && <span>{goal.conflictLetter}</span>}
        
        </div>

    )

}

const goalCardPanelPosition = (position:number) => css`
position : absolute;
top : 5%;
left : ${16.5+position*33.5}%;

width:33.5%;
height:60%;
`

const goalCardPanelStyle = (isHint:boolean) => css`

background-image:url(${BackGroundGoal});
background-size: contain;
background-repeat: no-repeat;
background-position:top;

display: flex ; flex-direction: column; align-items: center;


p{
    margin-top:0;
    margin-bottom:0;
    color:black;
    font-size:3em;
    text-align:center;
    width:70%;
    font-family: 'Courgette', cursive;
    letter-spacing: -0.07em;
}

${isHint === false &&
    `
    p:nth-of-type(2n+1){
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color:black;
    }
    `
}

${isHint === true &&
    `
    p:nth-of-type(2n+1){
        position: absolute;
        top: 25%;
        transform: translateY(-25%);
        color:#8c514b;
    }
    p:nth-of-type(2n){
        position: absolute;
        top: 75%;
        transform: translateY(-75%);
        color:black;
    }
    `
}

span{
    position:absolute;
    bottom:6%;
    right:8%;
    font-size:3em;
    font-family: 'Bubblegum Sans', cursive;
    color:white;
    text-shadow: 1px 1px 2px black;
}

`


export default GoalCardPopUp