/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from "react"
import SeasonBoard from '../images/SeasonBoard.jpg'
import SeasonMarker from '../images/SeasonMarker.png'

const SeasonIndicator : FC<{season:number}> = ({season}) => {

    return (

        <div css={seasonIndicatorStyle}> 
        
            <div css={seasonMarker(season)}> 

                <div css={[seasonMarkerSize, face1]}></div>
                <div css={[seasonMarkerSize, face2]}></div>
                
            </div>
            
        </div>

    )

}

const face1 = css`
background-image:url(${SeasonMarker});
background-repeat:no-repeat;
background-size: contain;

transform-style:preserve-3d;
transform-origin:bottom;
transform: rotateX(-90deg) rotateY(45deg);
`

const face2 = css`
background-image:url(${SeasonMarker});
background-repeat:no-repeat;
background-size: contain;

transform-style:preserve-3d;
transform-origin:bottom;
transform: rotateX(-90deg) rotateY(135deg);
`

const seasonMarker = (position:number) => css`
position:absolute;
height:88%;
width:24%;
left:${(position-1)*25}%;
top:0%;
background:radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(255,255,255,0.02) 62%, rgba(255,255,255,0) 63%);
transform-style:preserve-3d;
`

const seasonMarkerSize = css`
position:absolute;
height:100%;
width:70%;
bottom:40%;
left:15%;

`

const seasonIndicatorStyle = css`
    position:absolute;
    width: 20%;
    height:10%;
    left:0%;
    top:0%;
    background-image : url(${SeasonBoard});
    background-size: contain;
    background-repeat: no-repeat;
    background-position:bottom;

    transform-style:preserve-3d;
`

export default SeasonIndicator