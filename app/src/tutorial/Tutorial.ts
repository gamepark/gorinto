import GameState from "@gamepark/gorinto/types/GameState";
import Move from "@gamepark/gorinto/types/Move";
import PlayerColor, { playerColors } from "@gamepark/gorinto/types/PlayerColor";
import { Tutorial } from "@gamepark/react-client";
import {setupPlayers} from "@gamepark/gorinto/Gorinto"
import { Goals } from "@gamepark/gorinto/cards/Goals";
import { elements } from "@gamepark/gorinto/types/Element";
import Landscape, { getLandscapeDiagram } from "@gamepark/gorinto/Landscape";
import Path from "@gamepark/gorinto/types/Path";
import MoveType from "@gamepark/gorinto/types/MoveType";
import PathType from "@gamepark/gorinto/types/PathType";

const initialBag = [elements[1],elements[1],elements[3],elements[2],elements[1],elements[2],elements[3],elements[4],elements[0],elements[3],//Path1
                    elements[4],elements[3],elements[4],elements[4],elements[0],elements[1],elements[3],elements[0],elements[1],elements[4],//Path2
                    elements[0],elements[3],elements[0],elements[2],elements[1],elements[4],elements[4],elements[0],elements[2],elements[0],//Path3
                    elements[3],elements[4],elements[2],elements[2],elements[2],elements[4],elements[3],elements[3],elements[1],elements[0],//Path4
                    elements[0],elements[3],elements[3],elements[3],elements[1],elements[1],elements[4],elements[0],elements[1],elements[0],//Mountain
                    elements[1],elements[1],elements[4],elements[2],elements[4],elements[3],elements[2],elements[0],elements[0],elements[4],//Mountain
                    elements[2],elements[3],elements[4],elements[4],elements[0],elements[2],elements[1],elements[1],elements[4],elements[2],//Mountain
                    elements[4],elements[0],elements[2],elements[0],elements[2],elements[4],elements[3],elements[2],elements[0],elements[4],//Mountain
                    elements[1],elements[2],elements[1],elements[0],elements[0],elements[0],elements[3],elements[4],elements[3],elements[1],//Mountain
                    elements[2],elements[3],elements[2],elements[1],elements[3],elements[1],elements[3],elements[2],elements[1],elements[2]]//Mountain

const tabPlayers = setupPlayers([{id:PlayerColor.Black},{id:PlayerColor.Red},{id:PlayerColor.White}])

const GorintoTuthorial: Tutorial<GameState,Move, PlayerColor> = {

    setupTutorial:() => [{
        players: tabPlayers,
        season:1,
        activePlayer:tabPlayers[0].color,
        firstPlayer:tabPlayers[0].color,
        goals:[Array.from(Goals.keys())[0],Array.from(Goals.keys())[2]],
        keyElements:[elements[0],elements[1]],
        mountainBoard:getLandscapeDiagram(Landscape.Peak).map(row => row.map(height => Array.from(Array(height)).map(() => initialBag.pop()!))),
        horizontalPath:initialBag.splice(0,5) as Path,
        verticalPath:initialBag.splice(0,5) as Path,
        elementTilesBag:initialBag,
        tutorial:true
    }, [PlayerColor.Black, PlayerColor.Red, PlayerColor.White]],

    expectedMoves:() => [

        // Season 1

        {type:MoveType.MoveTile, path:PathType.Vertical, x:1,y:0},      //Player
        {type:MoveType.TakeTile, coordinates:{x:1,y:2}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:3,y:2},
        {type:MoveType.TakeTile, coordinates:{x:3,y:4}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:4,y:4},
        {type:MoveType.TakeTile, coordinates:{x:3,y:4}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:1,y:2},    //Player
        {type:MoveType.TakeTile, coordinates:{x:0,y:2}},
        {type:MoveType.TakeTile, coordinates:{x:1,y:3}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:0,y:2},
        {type:MoveType.TakeTile, coordinates:{x:0,y:1}},
        {type:MoveType.TakeTile, coordinates:{x:0,y:3}},

        {type:MoveType.MoveTile, path:PathType.Vertical, x:2,y:1},
        {type:MoveType.TakeTile, coordinates:{x:3,y:1}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:2,y:1},    //Player
        {type:MoveType.TakeTile, coordinates:{x:3,y:1}},
        {type:MoveType.TakeTile, coordinates:{x:4,y:1}},

        {type:MoveType.MoveTile, path:PathType.Vertical, x:3,y:4},
        {type:MoveType.TakeTile, coordinates:{x:1,y:4}},
        {type:MoveType.TakeTile, coordinates:{x:2,y:4}},

        {type:MoveType.MoveTile, path:PathType.Vertical, x:2,y:3},
        {type:MoveType.TakeTile, coordinates:{x:1,y:4}},
        {type:MoveType.TakeTile, coordinates:{x:3,y:2}},

        // Season 2

        {type:MoveType.MoveTile, path:PathType.Vertical, x:3,y:4},
        {type:MoveType.TakeTile, coordinates:{x:3,y:4,z:0}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:2,y:3},    //Player
        {type:MoveType.TakeTile, coordinates:{x:2,y:3,z:3}},
        {type:MoveType.TakeTile, coordinates:{x:2,y:3,z:2}},
        {type:MoveType.TakeTile, coordinates:{x:2,y:3,z:1}},
        {type:MoveType.TakeTile, coordinates:{x:2,y:3,z:0}},

        {type:MoveType.MoveTile, path:PathType.Vertical, x:3,y:3},
        {type:MoveType.TakeTile, coordinates:{x:2,y:3}},
        {type:MoveType.TakeTile, coordinates:{x:4,y:3}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:4,y:2},
        {type:MoveType.TakeTile, coordinates:{x:3,y:1}},
        {type:MoveType.TakeTile, coordinates:{x:3,y:3}},

        {type:MoveType.MoveTile, path:PathType.Vertical, x:4,y:2},      //Player
        {type:MoveType.TakeTile, coordinates:{x:3,y:3}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:3,y:4},
        {type:MoveType.TakeTile, coordinates:{x:3,y:4,z:0}},

        {type:MoveType.MoveTile, path:PathType.Horizontal, x:1,y:3},
        {type:MoveType.TakeTile, coordinates:{x:0,y:3}},
        {type:MoveType.TakeTile, coordinates:{x:4,y:3}},

    ]

}

export default GorintoTuthorial