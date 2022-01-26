import { connect } from 'react-redux'
import {
  multiSkipCloseModal,
  multiSkipTrackContinueToPause,
  skipMultipleBoxes,
  trackViewMultiSkip
} from 'routes/Account/actions/multiSkip'
import {
  getUserId,
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
    multiSkippedBoxesCount: getSkippedBoxesCount(state),
    userId: getUserId(state),
  }
}

const mapDispatchToProps = {
  handleSkipBoxes: skipMultipleBoxes,
  closeModal: multiSkipCloseModal,
  trackContinueToPause: multiSkipTrackContinueToPause,
  trackViewMultiSkip
}

export const MultiSkipScreenContainer = connect(mapStateToProps, mapDispatchToProps)(MultiSkipScreenLogic)
