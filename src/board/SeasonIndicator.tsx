import { css } from '@emotion/core'
import { FC } from "react"

const SeasonIndicator : FC<{season:number}> = ({season}) => {

    return (

        <div css={seasonIndicatorStyle}> {season} </div>

    )

}

const seasonIndicatorStyle = css`
    position:absolute;
    width: 20%;
    height:10%;
    border: 1px solid black;
    background-color:grey;
`

export default SeasonIndicator