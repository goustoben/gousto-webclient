import { connect } from 'react-redux'
import {
  getUserId,
  getUserNewOrdersForMultiSkip,
  getNextDeliveryDate,
  getIsMultiSkipSuccess,
  getIsMultiSkipError,
  getSkippedBoxesCount
} from 'selectors/user'
import { MultiSkipScreenLogic } from './MultiSkipScreen.logic'
import { multiSkipTrackContinueToPause } from "routes/Account/actions/multiSkip/multiSkipTrackContinueToPause"
import { trackViewMultiSkip } from "routes/Account/actions/multiSkip/trackViewMultiSkip"
import { multiSkipCloseModal } from "routes/Account/actions/multiSkip/multiSkipCloseModal"
import { skipMultipleBoxes } from "routes/Account/actions/multiSkip/skipMultipleBoxes"

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
