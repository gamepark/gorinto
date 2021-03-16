/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {Goals} from '@gamepark/gorinto/cards/Goals'
import {Keys} from '@gamepark/gorinto/cards/KeyElement'
import { FC } from "react";
import GoalCard from "./GoalCard";
import KeyElementCardPanel from "./KeyElementCardPanel";

const CardsList : FC<{keysArray:number[], goalsArray:number[]}> = ({keysArray, goalsArray}) => {

    return(

        <div css={cardsListStyle}>

            {keysArray.map((cardNumber, index) =>
            
                <KeyElementCardPanel key = {index}
                                     keyCard = {Keys[cardNumber]}
                                     position = {index}
                />
            )}

            {goalsArray.map((goalNumber, index) =>
            
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
top:10%;
left:5%;
width:17%;
height:85%;

box-shadow: 0em 0em 1.5em 0.8em black;
`

export default CardsList