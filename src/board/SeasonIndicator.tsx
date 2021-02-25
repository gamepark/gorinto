import { css } from '@emotion/core'
import { FC } from "react"
import SeasonBoard from '../images/SeasonBoard.jpg'

const SeasonIndicator : FC<{season:number}> = ({season}) => {

    return (

        <div css={seasonIndicatorStyle}> {season} </div>

    )

}

const seasonIndicatorStyle = css`
    position:absolute;
    width: 20%;
    height:10%;
    background-image : url(${SeasonBoard});
    background-size: contain;
    background-repeat: no-repeat;
    background-position:center top;
`

export default SeasonIndicator