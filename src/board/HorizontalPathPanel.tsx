import { css } from "@emotion/core";
import { FC } from "react";
import Game from "../types/Game";
import ElementTile from "./ElementTile";

const HorizontalPathPanel : FC<{game : Game}> = ({game}) => {

    return(

        <div css = {horizontalPathPanel}>

            {game.horizontalPath.map((tile, index) => 
            
            <ElementTile key = {index}
                         image = {tile.image}
                         element = {tile.element}
                         position = {index}
            />
        
        )}

        </div>


    )

}

const horizontalPathPanel = css`
position : absolute;
top : 2%;
left : 18%;
width : 82%;
height : 11%;

border : red 2px solid;
`

export default HorizontalPathPanel