import RefillPaths, {RefillPathsView} from '../moves/RefillPaths'
import Move from './Move'

export type MoveView = Exclude<Move, RefillPaths> | RefillPathsView