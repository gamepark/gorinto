/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Game from '@gamepark/gorinto/types/Game'
import { FC } from "react";

const Header : FC<{game:Game}> = ({game}) => {

    return(

        <div css={headerStyle}> 
        
            Message Header : {game.season}
        
        </div>

    )

}

const headerStyle = css`
position:absolute;
top:0%;
right:0%;
width:100%;
height:5%;
background-color:rgba(0,0,139, 0.5);
z-index:2;

font-size:4em;
text-align:center;
color:white;
`

export default Header