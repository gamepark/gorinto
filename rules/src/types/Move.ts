import ChangeActivePlayer from '../moves/ChangeActivePlayer'
import ScoreGoals from '../moves/ScoreGoals'
import MoveSeasonMarker from '../moves/MoveSeasonMarker'
import MoveTile from '../moves/MoveTile'
import RefillPaths from '../moves/RefillPaths'
import RemoveTileOnPath from '../moves/RemoveTileOnPath'
import ScoreKeyElements from '../moves/ScoreKeyElements'
import SwitchFirstPlayer from '../moves/SwitchFirstPlayer'
import TakeTile from '../moves/TakeTile'


type Move = RefillPaths | MoveTile | TakeTile | MoveSeasonMarker | ScoreGoals
| SwitchFirstPlayer | ChangeActivePlayer | RemoveTileOnPath | ScoreKeyElements

export default Move