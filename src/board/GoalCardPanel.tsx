import { css } from "@emotion/core"
import { FC } from "react"

const GoalCardPanel : FC<{image:string, goal:string, goalSubtitle:string | undefined, conflictLetter:string, position:number}> = ({image, goal, goalSubtitle, conflictLetter, position}) => {

    return(

        <div css={goalCardPanelStyle(position, image)}>
        
            <p>Goal : {goal} </p>
            <p>SubGoal : {goalSubtitle} </p>
            <span>{conflictLetter}</span>
        
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


export default GoalCardPanel