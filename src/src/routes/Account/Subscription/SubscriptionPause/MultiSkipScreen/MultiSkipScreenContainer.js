import { connect } from 'react-redux'
import {
  multiSkipCloseModal,
  multiSkipTrackContinueToPause,
  skipMultipleBoxes
} from 'routes/Account/actions/multiSkip'
import { getUserNewOrdersForMultiSkip } from 'selectors/user'

import { MultiSkipScreen } from './MultiSkipScreen'

const mapStateToProps = (state) => {
  const newOrders = getUserNewOrdersForMultiSkip(state)
  const alreadySkippedBoxesCount = newOrders.filter(({ canSkip }) => !canSkip).length

  return {
    newOrders,
    alreadySkippedBoxesCount
  }
}

const mapDispatchToProps = {
  handleSkipBoxes: skipMultipleBoxes,
  closeModal: multiSkipCloseModal,
  trackContinueToPause: multiSkipTrackContinueToPause
}

export const MultiSkipScreenContainer = connect(mapStateToProps, mapDispatchToProps)(MultiSkipScreen)
