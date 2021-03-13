/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {Goals} from '@gamepark/gorinto/cards/Goals'
import {Keys} from '@gamepark/gorinto/cards/KeyElement'
import Game from '@gamepark/gorinto/types/Game'
import { FC } from "react";
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
            
                <GoalCard   key = {index}
                            goal = {Goals[goalNumber]}
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
`

export default CardsList