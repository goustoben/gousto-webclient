import { connect } from 'react-redux'
import {
  multiSkipCloseModal,
  multiSkipTrackContinueToPause,
  skipMultipleBoxes
} from 'routes/Account/actions/multiSkip'
import {
  getUserNewOrdersForMultiSkip,
  getNextDeliveryDate,
  getIsMultiSkipSuccess,
  getIsMultiSkipError,
  getSkippedBoxesCount
} from 'selectors/user'

import { MultiSkipScreenLogic } from './MultiSkipScreen.logic'

const mapStateToProps = (state) => {
  const newOrders = getUserNewOrdersForMultiSkip(state)
  const alreadySkippedBoxesCount = newOrders.filter(({ canSkip }) => !canSkip).length

  return {
    newOrders,
    alreadySkippedBoxesCount,
    nextDeliveryDate: getNextDeliveryDate(state),
    isMultiSkipSuccess: getIsMultiSkipSuccess(state),
    isMultiSkipError: getIsMultiSkipError(state),
    multiSkippedBoxesCount: getSkippedBoxesCount(state)
  }
}

const mapDispatchToProps = {
  handleSkipBoxes: skipMultipleBoxes,
  closeModal: multiSkipCloseModal,
  trackContinueToPause: multiSkipTrackContinueToPause,
}

export const MultiSkipScreenContainer = connect(mapStateToProps, mapDispatchToProps)(MultiSkipScreenLogic)
