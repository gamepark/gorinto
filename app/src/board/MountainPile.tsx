/** @jsxImportSource @emotion/react */
import Element from '@gamepark/gorinto/types/Element'
import PathType from '@gamepark/gorinto/types/PathType'
import TilesToTake from '@gamepark/gorinto/types/TilesToTake'
import {FC, HTMLAttributes} from 'react'
import ElementInPath from './ElementInPath'
import ElementInPile from './ElementInPile'
import MountainDropZone from './MountainDropZone'

import PlayerColor from '@gamepark/gorinto/types/PlayerColor'

type Props = {
    pile: number[],
    x: number,
    y: number,
    tilesToTake: TilesToTake | undefined
    activePlayer: PlayerColor | undefined
    heightPile:number
    verifyAndCompleteMove:(tile:ElementInPath|undefined,x:number,y:number) => void
    selectedTileInPath?: ElementInPath,
    selectedTilesInMountain: ElementInPile[] | undefined,
    onWarning:(path:PathType,x:number, y:number) => void
    isTacticalRemove:boolean | undefined
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

const MountainPile: FC<Props> = ({pile, x, y, tilesToTake, activePlayer, heightPile, verifyAndCompleteMove, selectedTileInPath, selectedTilesInMountain, onWarning, isTacticalRemove, ...props}) => {

    return (
        <>

            <MountainDropZone
                x={x}
                y={y}
                height={heightPile}
                selectedTileInPath={selectedTileInPath}
                verifyAndCompleteMove = {verifyAndCompleteMove}
                tilesToTake = {tilesToTake}
                activePlayer = {activePlayer}
                heightPile = {heightPile}
                pile = {pile}
                selectedTilesInMountain = {selectedTilesInMountain}
                {...props}/>

        </>
    )
}

export function canTakeTile(x: number, y: number, z: number, tilesToTake: TilesToTake | undefined, mountainBoard: number[][][]): boolean {

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

export default MountainPile