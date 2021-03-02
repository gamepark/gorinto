import { css } from "@emotion/core";
import { FC } from "react";
import { Goals } from "../cards/Goals";
import { Keys } from "../cards/KeyElement";
import Game from "../types/Game";
import GoalCard from "./GoalCard";
import KeyElementCardPanel from "./KeyElementCardPanel";

const CardsList : FC<{game:Game}> = ({game}) => {

    return(

        <div css={cardsListStyle}>

            {game.twoKeyElementCards.map((cardNumber, index) =>
            
                <KeyElementCardPanel key = {index}
                                     keyCard = {Keys[cardNumber]}
                                     position = {index}
                />
            )}

            {game.twoGoals.map((goalNumber, index) =>
            
                <GoalCard goal = {Goals[goalNumber]}
                          key = {index}
                          position = {index}
                />
            
            )}

        </div>

    )

}

const cardsListStyle = css`
position:absolute;
top:15%;
left:0;
width:20%;
height:85%;
background-color:lightgrey;
border-right:1px black solid;
`

export default CardsList