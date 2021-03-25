import CountGoals from "../moves/CountGoals"
import MoveSeasonMarker from "../moves/MoveSeasonMarker"
import MoveTile from "../moves/MoveTile"
import RefillPaths from "../moves/RefillPaths"
import SwitchFirstPlayer from "../moves/SwitchFirstPlayer"
import TakeTile from "../moves/TakeTile"
import ChangeActivePlayer from "../moves/ChangeActivePlayer"
import CountKeys from "../moves/CountKeys"
import RemoveTileOnPath from "../moves/RemoveTileOnPath"


type Move = RefillPaths | MoveTile | TakeTile | MoveSeasonMarker | CountGoals
| SwitchFirstPlayer | ChangeActivePlayer | CountKeys | RemoveTileOnPath

export default Move