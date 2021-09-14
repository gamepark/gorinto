/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveSeasonMarker, {isMoveSeasonMarker} from '@gamepark/gorinto/moves/MoveSeasonMarker'
import {useAnimation} from '@gamepark/react-client'
import {FC} from 'react'
import Images from '../images/Images'

const SeasonIndicator: FC<{ season: number }> = ({season}) => {

  const animation = useAnimation<MoveSeasonMarker>(animation => isMoveSeasonMarker(animation.move))

  return (

    <div css={seasonIndicatorStyle}>

      <div css={[seasonMarker(season), animation && season !== 4 && moveSeasonMarkerAnimation(animation.duration)]}>

        <div css={[seasonMarkerSize, face1]}/>
        <div css={[seasonMarkerSize, face2]}/>

      </div>

    </div>

  )

}

const moveSeasonMarkerAnimation = (duration: number) => css`
  animation: ${moveSeasonMarkerKeyFrames} ${duration}s ease-in-out;
`

const moveSeasonMarkerKeyFrames = keyframes`
  from {
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
`

const face1 = css`
  background-image: url(${Images.SeasonMarker});
  background-repeat: no-repeat;
  background-size: contain;

  transform-style: preserve-3d;
  transform-origin: bottom;
  transform: rotateX(-90deg) rotateY(0deg);
`

const face2 = css`
  background-image: url(${Images.SeasonMarker});
  background-repeat: no-repeat;
  background-size: contain;

  transform-style: preserve-3d;
  transform-origin: bottom;
  transform: rotateX(-90deg) rotateY(90deg);
`

const seasonMarker = (position: number) => css`
  position: absolute;
  height: 88%;
  width: 24%;
  left: ${(position - 1) * 25}%;
  top: 10%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0.02) 62%, rgba(255, 255, 255, 0) 63%);
  transform-style: preserve-3d;
`

const seasonMarkerSize = css`
  position: absolute;
  height: 100%;
  width: 70%;
  bottom: 40%;
  left: 15%;

`

const seasonIndicatorStyle = css`
  position: absolute;
  width: 20%;
  height: 9%;
  right: 1%;
  top: 0;
  background-image: url(${Images.SeasonBoard});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  transform-style: preserve-3d;
`

export default SeasonIndicator