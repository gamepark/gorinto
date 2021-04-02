/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PathType from '@gamepark/gorinto/types/PathType'
import { FC, HTMLAttributes } from "react"

import BurrowTileA from "../images/GOR_tts_Kitsune_burrowtileA.jpg"
import BurrowTileB from "../images/GOR_tts_Kitsune_burrowtileB.jpg"
import BurrowTileC from "../images/GOR_tts_Kitsune_burrowtileC.jpg"
import BurrowTileD from "../images/GOR_tts_Kitsune_burrowtileD.jpg"
import BurrowTileE from "../images/GOR_tts_Kitsune_burrowtileE.jpg"
import BurrowTileF from "../images/GOR_tts_Kitsune_burrowtileF.jpg"
import BurrowTileG from "../images/GOR_tts_Kitsune_burrowtileG.jpg"
import BurrowTileH from "../images/GOR_tts_Kitsune_burrowtileH.jpg"
import BurrowTileI from "../images/GOR_tts_Kitsune_burrowtileI.jpg"
import BurrowTileJ from "../images/GOR_tts_Kitsune_burrowtileJ.jpg"

type Props = {
    index:number | undefined,
    path:PathType | undefined
} & HTMLAttributes<HTMLDivElement>

const BurrowTile : FC<Props> = ({index, path, ...props}) => {

    return (

        <div css={burrowStyle(index, path)}> 
            
        </div>

    )

}

const burrowStyle = (index:number | undefined, path:PathType | undefined) => css`
position:absolute;
right:-20%;
${index !== undefined && `transform:translate3d(-300%,0,0);`}
top:65%;
width:10%;
height:20%;
transition:transform 1s;

transform-style:preserve-3d;

${index === 0 && path === PathType.Horizontal && `background-image:url(${BurrowTileF})`};
${index === 1 && path === PathType.Horizontal && `background-image:url(${BurrowTileG})`};
${index === 2 && path === PathType.Horizontal && `background-image:url(${BurrowTileH})`};
${index === 3 && path === PathType.Horizontal && `background-image:url(${BurrowTileI})`};
${index === 4 && path === PathType.Horizontal && `background-image:url(${BurrowTileJ})`};
${index === 0 && path === PathType.Vertical && `background-image:url(${BurrowTileE})`};
${index === 1 && path === PathType.Vertical && `background-image:url(${BurrowTileD})`};
${index === 2 && path === PathType.Vertical && `background-image:url(${BurrowTileC})`};
${index === 3 && path === PathType.Vertical && `background-image:url(${BurrowTileB})`};
${index === 4 && path === PathType.Vertical && `background-image:url(${BurrowTileA})`};

border-radius:20%;

background-repeat:no-repeat;
background-size:contain;
background-position:center;

`

export default BurrowTile