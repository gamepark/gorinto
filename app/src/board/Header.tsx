/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import GameState from '@gamepark/gorinto/types/GameState'
import { FC } from "react";

const Header : FC<{game:GameState}> = ({game}) => {

    return(

        <div css={headerStyle}> 
        
            <span>Message Header : {game.season}</span>
        
        </div>

    )

}

const headerStyle = css`
position:absolute;
top:0%;
right:0%;
width:100%;
height:7em;
background-color:rgba(0,0,139, 0.5);
z-index:2;

text-align:center;
color:white;

span{
    font-size:4.5em;
}
`

export default Header