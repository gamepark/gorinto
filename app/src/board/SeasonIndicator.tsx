/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from "react"
import SeasonBoard from '../images/SeasonBoard.jpg'
import SeasonMarker from '../images/seasonMarkerTemporary.png'

const SeasonIndicator : FC<{season:number}> = ({season}) => {

    return (

        <div css={seasonIndicatorStyle}> 
        
            <div css={seasonMarker(season)}> 

                <img src={SeasonMarker} alt="marker" css={seasonMarkerSize} />
                
            </div>
            
        </div>

    )

}

const seasonMarker = (position:number) => css`
position:absolute;
height:88%;
width:24%;
left:${(position-1)*25}%;
top:0%;
`

const seasonMarkerSize = css`
position:absolute;
height:65%;
left:15%;
top:15%;
`

const seasonIndicatorStyle = css`
    position:absolute;
    width: 20%;
    height:10%;
    left:2%;
    top:0%;
    background-image : url(${SeasonBoard});
    background-size: contain;
    background-repeat: no-repeat;
    background-position:center top;
`

export default SeasonIndicator