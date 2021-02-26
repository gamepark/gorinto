import { css } from "@emotion/core";
import { FC } from "react";
import { Goals } from "../cards/Goals";
import Game from "../types/Game";
import GoalCard from "./GoalCard";
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
top:10%;
left:0;
width:20%;
height:90%;
`

export default CardsList