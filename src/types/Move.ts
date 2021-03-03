import MoveTile from "../moves/MoveTile"
import RefillPaths from "../moves/RefillPaths"
import TakeTile from "../moves/TakeTile"


type Move = RefillPaths | MoveTile | TakeTile

export default Move