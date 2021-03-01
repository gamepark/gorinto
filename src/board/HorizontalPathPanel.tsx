import { css } from "@emotion/core";
import { FC } from "react";
import Game from "../types/Game";
import ElementTile from "./ElementTile";

const HorizontalPathPanel : FC<{game : Game}> = ({game}) => {

    return(

        <div css = {horizontalPathPanel}>

            {game.horizontalPath.map((tile, index) => 
            
            <div css={positionningTile(index)} key = {index}> 

                <ElementTile 
                             image = {tile.image}
                             element = {tile.element}
                             position = {index}
                />

            </div>


        
        )}

        </div>


    )

}

const positionningTile = (position : number) => css`
position:absolute;
top:0%;
left:${0.5+19.5*position}%;
width:15%;
height:100%;
`

const horizontalPathPanel = css`
position : absolute;
top : 2%;
left : 18%;
width : 82%;
height : 11%;
margin-left:2%;
margin-right:2%;
`

export default HorizontalPathPanel