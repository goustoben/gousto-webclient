import moment from 'moment'
import { CUTOFF_TIMES } from '../enum/time'

export const formatCutoffTime = (cutoffTime) => (CUTOFF_TIMES[cutoffTime]
  ? CUTOFF_TIMES[cutoffTime]
  : moment(cutoffTime, 'HH:mm:ss').add(1, 'seconds').format('ha'))

