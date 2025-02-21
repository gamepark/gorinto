/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveTile, {isMoveTile} from '@gamepark/gorinto/moves/MoveTile'
import RemoveTileOnPath, {isRemoveTileOnPath} from '@gamepark/gorinto/moves/RemoveTileOnPath'
import Element from '@gamepark/gorinto/types/Element'
import PathType from '@gamepark/gorinto/types/PathType'
import PlayerColor from '@gamepark/gorinto/types/PlayerColor'
import {useAnimation, usePlayerId, useSound} from '@gamepark/react-client'
import {FC, useEffect} from 'react'
import ElementInPath from './ElementInPath'
import ElementTile from './ElementTile'
import moveTileSound from '../sounds/tic.mp3'
import { getNumberOfTilesToTake } from './Board'

type Props = {
    tilesToTake: { quantity: number, coordinates: { x: number, y: number }[], element?: Element } | undefined,
    horizontalPath: (Element | null)[],
    activePlayer: PlayerColor | undefined,
    mountain: Element[][][],
    onSelect: (position: number) => void,
    selectedTile?: ElementInPath,
    verifyIfWarningIsNeeded : (tile:Element, x:number,y:number) => boolean,
    onWarning:(path:PathType,x:number, y:number) => void
    isTacticalRemove:boolean | undefined
}

const HorizontalPathPanel: FC<Props> = ({tilesToTake, horizontalPath, activePlayer, mountain, onSelect, selectedTile, verifyIfWarningIsNeeded, onWarning, isTacticalRemove}) => {

    const playerId = usePlayerId()
    const animationMoveTile = useAnimation<MoveTile>(animation => isMoveTile(animation.move) && animation.move.path === PathType.Horizontal)
    const animationRemoveTile = useAnimation<RemoveTileOnPath>(animation => isRemoveTileOnPath(animation.move))

    const moveSound = useSound(moveTileSound)

    useEffect(() => {
        if (animationMoveTile && animationMoveTile.move){
            moveSound.play()
        }
    },[animationMoveTile && animationMoveTile.move])

    function playSound(sound:HTMLAudioElement):void{
        sound.play()
    }

    function isDraggable():boolean{
        if (activePlayer !== playerId || activePlayer === undefined){
            return false
        } else {
            if (!tilesToTake){
                return animationRemoveTile === undefined
            } else {
                return isTacticalRemove === true
            }
        }
    }

    return (
        <div css={horizontalPathPanel}>
            {horizontalPath.map((tile, index) => tile === null ? null :
                <div css={positionTile(index)} key={index}>
                    <ElementTile
                        css={[animationMoveTile && animationMoveTile.move.x === index && moveTileAnimation(animationMoveTile.move.y, mountain[animationMoveTile.move.x][animationMoveTile.move.y].length, maxPileHeightOnTheColumn(index, mountain), animationMoveTile.duration),
                            animationRemoveTile && animationRemoveTile.move.index === index && animationRemoveTile.move.path === PathType.Horizontal && removeTileAnimation(isTacticalRemove ? activePlayer === playerId ? 0 : animationRemoveTile.duration : animationRemoveTile.duration)
                        ]}
                        draggable={isDraggable()}
                        type='ElementInPath'
                        draggableItem={{path: PathType.Horizontal, position: index, element:tile}}
                        element={tile}
                        onClick={() => onSelect(index)}
                        isSelected={selectedTile?.path === PathType.Horizontal && selectedTile?.position === index && (tilesToTake === undefined ? true : getNumberOfTilesToTake(tilesToTake, mountain) === 0 && isTacticalRemove === true ? true : false)}
                        verifyIfWarningIsNeeded = {verifyIfWarningIsNeeded}
                        onWarning = {onWarning}
                        playSound = {(sound) => playSound(sound)}
                        sound = {moveSound}

                        />
                        

                </div>
            )}
        </div>
    )

}

function maxPileHeightOnTheColumn(y: number, mountain: number[][][]): number {

    let zMax: number = 0;
    for (let i = 0; i < 5; i++) {
        const height = mountain[i][y].length;
        if (height > zMax) {
            zMax = height;
        }
    }

    return zMax
}

const widthPath = 15; // in percent

const removeTileAnimation = (duration: number) => css`
    animation: ${removeTileKeyFrames} ${duration}s;
`

const removeTileKeyFrames = keyframes`
    from {
    }
    25% {
        transform: translate3d(0, 0, ${8.02}em);
        box-shadow: 0 0 1.5em 1em red;
        border-radius: 20%;
    }
    65% {
        transform: translate3d(0, 0, ${8.02}em);
        box-shadow: 0 0 2em 1.5em red;
        border-radius: 20%;
    }
    to {
        transform: translate3d(0, 0, 100em);
        box-shadow: none;
        border-radius: 20%;
    }
`

const moveTileAnimation = (y: number, z: number, zMax: number, duration: number) => css`
    animation: ${moveTileKeyFrames(y, z, zMax)} ${duration}s;
`

const moveTileKeyFrames = (y: number, z: number, zMax: number) => keyframes`
    from {
    }
    15% {
        transform: translate3d(0, 0, ${zMax * 4 + 8.02}em);
    }
    85% {
        transform: translate3d(0, ${(y + 1) * (widthPath * 9.0667)}%, ${zMax * 4 + 8.02}em);
    }
    to {
        transform: translate3d(0, ${(y + 1) * (widthPath * 9.0667)}%, ${z * 4.02}em);
    }
`

const positionTile = (position: number) => css`
    position: absolute;
    top: 0;
    left: ${3.5 + 19.5 * position}%;
    width: ${widthPath}%;
    height: 100%;
    transform-style: preserve-3d;
`

const horizontalPathPanel = css`
    position: absolute;
    top: 2.25%;
    left: 18%;
    width: 81.5%;
    height: 12%;

    transform-style: preserve-3d;
`

export default HorizontalPathPanel