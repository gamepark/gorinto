import CountGoals from "../moves/CountGoals"
import MoveSeasonMarker from "../moves/MoveSeasonMarker"
import MoveTile from "../moves/MoveTile"
import RefillPaths from "../moves/RefillPaths"
import TakeTile from "../moves/TakeTile"


type Move = RefillPaths | MoveTile | TakeTile | MoveSeasonMarker | CountGoals

export default Move