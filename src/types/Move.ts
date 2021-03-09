import CountGoals from "../moves/CountGoals"
import MoveSeasonMarker from "../moves/MoveSeasonMarker"
import MoveTile from "../moves/MoveTile"
import RefillPaths from "../moves/RefillPaths"
import SwitchFirstPlayer from "../moves/SwitchFirstPlayer"
import TakeTile from "../moves/TakeTile"
import CantPickAnyTile from "../moves/CantPickAnyTile"


type Move = RefillPaths | MoveTile | TakeTile | MoveSeasonMarker | CountGoals
| SwitchFirstPlayer | CantPickAnyTile

export default Move