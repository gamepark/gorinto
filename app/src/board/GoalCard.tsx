/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react"
import Goal from '@gamepark/gorinto/types/Goal'
import Player from "@gamepark/gorinto/types/Player"
import {FC, HTMLAttributes} from "react"
import {Trans, useTranslation} from 'react-i18next'
import BackGroundGoal from "../images/goal_background.jpg"

type Props = {
    goal:Goal,
    position:number,
    open:() => void
    players:Player[]
} & HTMLAttributes<HTMLDivElement>

const GoalCard : FC<Props> = ({goal, position, open, players, ...props}) => {

    const {t} = useTranslation()

    return(

        <div css={[players.length === 4 ? goalCardPanelStyle4Players(goal.hint !== undefined) : goalCardPanelStyleLessPlayers(goal.hint !== undefined),goalCardPanelPosition(position, players.length)]} onClick={open}>
        
            {goal.hint && <p>{goal.hint(t)}</p>}
            <p><Trans defaults={goal.text(t)} components={[<strong css={goalStrongCss}/>]}/></p>
            {goal.conflictLetter && <span className="notranslate" >{goal.conflictLetter}</span>}
        
        </div>

    )

}

const goalCardPanelPosition = (position:number, players:number) => css`

${players === 4 && `
position : absolute;
top : 10%;
left : ${79+position*10}%;

width:10%;
height:13%;
`}

${players < 4 && `

position : absolute;
top : ${10+position*25}%;
left : 79%;

width:20%;
height:25%;

`}
`

const goalCardPanelStyle4Players = (isHint:boolean) => css`

background-image:url(${BackGroundGoal});
background-size: contain;
background-repeat: no-repeat;
background-position:top;

display: flex ; flex-direction: column; align-items: center;

p{
    margin-top:0;
    margin-bottom:0;
    color:black;
    font-size:1em;
    text-align:center;
    width:70%;
    font-family: 'Courgette', cursive;
    letter-spacing: -0.05em;
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
    bottom:5%;
    right:7%;
    font-size:1.3em;
    font-family: 'Bubblegum Sans', cursive;
    color:white;
    text-shadow: 1px 1px 2px black;
}

`

const goalCardPanelStyleLessPlayers = (isHint:boolean) => css`

background-image:url(${BackGroundGoal});
background-size: contain;
background-repeat: no-repeat;
background-position:top;

display: flex ; flex-direction: column; align-items: center;


p{
    margin-top:0;
    margin-bottom:0;
    color:black;
    font-size:2.3em;
    text-align:center;
    width:70%;
    font-family: 'Courgette', cursive;
    letter-spacing: -0.05em;
    white-space: break-spaces;
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
    bottom:5%;
    right:10%;
    font-size:2.2em;
    font-family: 'Bubblegum Sans', cursive;
    color:white;
    text-shadow: 1px 1px 2px black;
}

`

const goalStrongCss = css`
    font-weight: normal;
    color: red;
`

export default GoalCard