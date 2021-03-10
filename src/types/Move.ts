import CountGoals from "../moves/CountGoals"
import MoveSeasonMarker from "../moves/MoveSeasonMarker"
import MoveTile from "../moves/MoveTile"
import RefillPaths from "../moves/RefillPaths"
import SwitchFirstPlayer from "../moves/SwitchFirstPlayer"
import TakeTile from "../moves/TakeTile"
import CantPickAnyTile from "../moves/CantPickAnyTile"
import CountKeys from "../moves/CountKeys"
import DetermineWinner from "../moves/DetermineWinner"


type Move = RefillPaths | MoveTile | TakeTile | MoveSeasonMarker | CountGoals
| SwitchFirstPlayer | CantPickAnyTile | CountKeys | DetermineWinner

export default Move