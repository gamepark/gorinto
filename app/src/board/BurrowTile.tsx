/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PathType from '@gamepark/gorinto/types/PathType'
import {FC, HTMLAttributes} from 'react'
import Images from '../images/Images'

type Props = {
  index: number | undefined,
  path: PathType | undefined
} & HTMLAttributes<HTMLDivElement>

const BurrowTile: FC<Props> = ({index, path}) => <div css={burrowStyle(index, path)}/>

const burrowStyle = (index: number | undefined, path: PathType | undefined) => css`
  position: absolute;
  right: -20%;
  ${index !== undefined && `transform:translate3d(-300%,0,0);`}
  top: 65%;
  width: 10%;
  height: 20%;
  transition: transform 1s;

  transform-style: preserve-3d;

  ${index === 0 && path === PathType.Horizontal && `background-image:url(${Images.BurrowTileF})`};
  ${index === 1 && path === PathType.Horizontal && `background-image:url(${Images.BurrowTileG})`};
  ${index === 2 && path === PathType.Horizontal && `background-image:url(${Images.BurrowTileH})`};
  ${index === 3 && path === PathType.Horizontal && `background-image:url(${Images.BurrowTileI})`};
  ${index === 4 && path === PathType.Horizontal && `background-image:url(${Images.BurrowTileJ})`};
  ${index === 0 && path === PathType.Vertical && `background-image:url(${Images.BurrowTileE})`};
  ${index === 1 && path === PathType.Vertical && `background-image:url(${Images.BurrowTileD})`};
  ${index === 2 && path === PathType.Vertical && `background-image:url(${Images.BurrowTileC})`};
  ${index === 3 && path === PathType.Vertical && `background-image:url(${Images.BurrowTileB})`};
  ${index === 4 && path === PathType.Vertical && `background-image:url(${Images.BurrowTileA})`};

  border-radius: 20%;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

`

export default BurrowTile