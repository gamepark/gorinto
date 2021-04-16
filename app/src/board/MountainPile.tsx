/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import MoveTile, { getFilterCoordinatesWithPattern } from '@gamepark/gorinto/moves/MoveTile'
import TakeTile, {isTakeTile} from '@gamepark/gorinto/moves/TakeTile'
import Element from '@gamepark/gorinto/types/Element'
import MoveType from '@gamepark/gorinto/types/MoveType'
import PathType from '@gamepark/gorinto/types/PathType'
import TilesToTake from '@gamepark/gorinto/types/TilesToTake'
import {useAnimation, usePlay, usePlayerId, useSound} from '@gamepark/react-client'
import {FC, HTMLAttributes, useEffect} from 'react'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'
import ElementTile from './ElementTile'
import MountainDropZone from './MountainDropZone'
import GameView from "@gamepark/gorinto/types/GameView";
import Path from '@gamepark/gorinto/types/Path'
import moveTileSound from '../sounds/tic.mp3'

type Props = {
    pile: number[],
    x: number,
    y: number,
    game: GameView,
    selectedTileInPath?: ElementInPath,
    onSelect:(x:number,y:number,position: number) => void, 
    selectedTilesInMountain: ElementInPile[],
    onWarning:(path:PathType,x:number, y:number) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

const MountainPile: FC<Props> = ({pile, x, y, game, selectedTileInPath, onSelect, selectedTilesInMountain, onWarning,...props}) => {

    const playerId = usePlayerId()
    const animation = useAnimation<TakeTile>(animation => isTakeTile(animation.move) && animation.move.coordinates.x === x && animation.move.coordinates.y === y)
    const tilesToTake = game.tilesToTake
    const canTakeAny = tilesToTake?.element === Element.Earth && tilesToTake.coordinates.length && tilesToTake.coordinates[0].x === x && tilesToTake.coordinates[0].y === y

    const playMove = usePlay<MoveTile>()
    const moveSound = useSound(moveTileSound)

    useEffect(() => {
        if (animation && animation.move){
            moveSound.play()
        }
    },[animation && animation.move])

    return (
        <>
            <div {...props} css={[!tilesToTake && noPointerEvents, renderContext]}>
                {pile.map((tile, index) =>
                    <div css={positionTile} key={index}>
                        <ElementTile
                            css={[animation && game.mountainBoard[x][y].length === index + 1 && tilesToTake?.element !== Element.Earth && takeTileAnimation(animation.duration, index + 1),
                                animation && tilesToTake?.element === Element.Earth && index === animation.move.coordinates.z && takeTileEarthAnimation(animation.duration, index + 1),
                                canTakeAny && shadowStyle
                            ]}
                            position={canTakeAny ? 3 * index : index}
                            draggable={playerId === game.activePlayer && canDrag(game, x, y, index)}
                            type='ElementInPile'
                            draggableItem={{x, y, z: index}}
                            element={tile}

                            mountainBoard = {game.mountainBoard}
                            onWarning = {onWarning}

                            onClick={() => {
                                canTakeTile(x, y, index, tilesToTake, game.mountainBoard)
                                    ? onSelect(x,y,index)
                                    : console.log("Ne rien faire")
                                        }
                                    }

                            elementOfTilesToTake = {tilesToTake ? tilesToTake.element : undefined}
                            isSelected={selectedTilesInMountain?.some((element => element.x === x && element.y === y && element.z === index)) && tilesToTake !== undefined}
                        />
                    </div>
                )}
            </div>

            <MountainDropZone
                x={x}
                y={y}
                height={game.mountainBoard[x][y].length}
                selectedTileInPath={selectedTileInPath}
                onWarning={onWarning}
                mountainBoard={game.mountainBoard}
                horizontalPath = {game.horizontalPath}
                verticalPath = {game.verticalPath}
                onClick={() => {
                    canMoveTile(selectedTileInPath, x, y) 
                    ? getFilterCoordinatesWithPattern(getElementofSelectedTileInPath(selectedTileInPath!, game.horizontalPath, game.verticalPath),{x,y},game.mountainBoard).length === 0 
                        ? onWarning(selectedTileInPath!.path,x,y)
                        : moveSound.play() && playMove({
                            type: MoveType.MoveTile,
                            path: selectedTileInPath!.path,
                            x,
                            y
                        }) 
                    : console.log("Ne rien faire")
                }}
                {...props}/>

        </>
    )
}

export function getElementofSelectedTileInPath(selectedTileInPath:ElementInPath,horizontalPath:Path, verticalPath:Path):Element{
    if (selectedTileInPath.path === PathType.Horizontal){
        return horizontalPath[selectedTileInPath.position]!
    } else {
        return verticalPath[selectedTileInPath.position]!
    }
}

function canTakeTile(x: number, y: number, z: number, tilesToTake: TilesToTake | undefined, mountainBoard: number[][][]): boolean {

    if (tilesToTake === undefined) {
        return false
    } else {
        if (tilesToTake.element !== Element.Earth) {
            return (
                (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
                &&
                (z === mountainBoard[x][y].length - 1)
            )
        } else {
            return (
                (tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
                &&
                (z !== mountainBoard[x][y].length - 1)
            )
        }
    }
}

function canMoveTile(selectedTileInPath: ElementInPath | undefined, x: number, y: number): boolean {
    if (selectedTileInPath === undefined) {
        return false
    } else if (selectedTileInPath.path === PathType.Horizontal) {
        return selectedTileInPath.position === x;
    } else if (selectedTileInPath.path === PathType.Vertical) {
        return selectedTileInPath.position === y
    } else {
        return false
    }
}

function canDrag(game: GameView, x: number, y: number, z: number): boolean {

    if (game.tilesToTake === undefined) {
        return false;
    } else if (game.tilesToTake.quantity === 0) {
        return false
    } else if (game.tilesToTake.element !== Element.Earth) {
        return (
            (game.tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z === game.mountainBoard[x][y].length - 1)
        )
    } else {
        return (
            (game.tilesToTake.coordinates.find(coord => (coord.x === x) && (coord.y === y)) !== undefined)
            &&
            (z !== game.mountainBoard[x][y].length - 1)
        )
    }
}

const shadowStyle = css`
    box-shadow: 0 0 1.5em 0.5em black;
    border-radius: 20%;
`

const renderContext = css`
    transform-style: preserve-3d;
`

const noPointerEvents = css`
    pointer-events: none;
`

const positionTile = css`
    position: absolute;
    left: 15%;
    top: 15%;
    width: 70%;
    height: 70%;

    transform-style: preserve-3d;
`

const takeTileKeyFrames = (z: number) => keyframes`
    from {
    }
    25% {
        transform: translate3d(0, 0, ${z * 4 + 4.02}em);
    }
    55% {
        transform: translate3d(0, 0, ${z * 4 + 4.02}em);
    }
    to {
        transform: translate3d(0, 0, 150em);
    }
`

const takeTileEarthKeyFrames = (z: number) => keyframes`
    from {
    }
    25% {
        transform: translate3d(-150%, 0, ${z * 3 * 4 + 4.02}em);
    }
    55% {
        transform: translate3d(-150%, 0, ${z * 3 * 4 + 4.02}em);
    }
    to {
        transform: translate3d(-150%, 0, 150em);
    }
`

const takeTileAnimation = (duration: number, z: number) => css`
    animation: ${takeTileKeyFrames(z)} ${duration}s ease-in-out;
`

const takeTileEarthAnimation = (duration: number, z: number) => css`
    animation: ${takeTileEarthKeyFrames(z)} ${duration}s ease-in-out;
`

export default MountainPile