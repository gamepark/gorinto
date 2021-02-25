import { css } from "@emotion/core";
import { FC } from "react";
import Game from "../types/Game";
import GoalCardPanel from "./GoalCardPanel";
import KeyElementCardPanel from "./KeyElementCardPanel";

const CardsList : FC<{game:Game}> = ({game}) => {

    return(

        <div css={cardsListStyle}>

            {game.twoKeyElementCards.map((card, index) =>
            
                <KeyElementCardPanel key = {card.element}
                                     image = {card.image}
                                     element = {card.element}
                                     position = {index}
                />
            )}

            {game.twoGoalCards.map((card, index) =>
            
                <GoalCardPanel key = {card.goal}
                               image = {card.image}
                               goal = {card.goal}
                               goalSubtitle = {card.goalSubtitle}
                               conflictLetter = {card.conflictLetter}
                               position = {index}
                />
            
            )}

        </div>

    )

}

const cardsListStyle = css`
position:absolute;
top:10%;
left:0;
width:20%;
height:90%;
`

export default CardsList