import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { actionTypes, trackingKeys } from './actionTypes'
import { getNumOrdersChecked, getNumOrdersCompensated } from '../selectors/selectors'
import { SE_CATEGORY_HELP } from './getHelp'

export const trackContinueToSsrClick = () => (dispatch, getState) => {
  const numOrdersChecked = getNumOrdersChecked(getState())
  const numOrdersCompensated = getNumOrdersCompensated(getState())

  dispatch({
    type: webClientActionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.continueToSsrClick,
      num_orders_checked: numOrdersChecked,
      num_orders_compensated: numOrdersCompensated,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const updateHasSeenRepetitiveIssuesScreen = (hasSeenRepetitiveIssuesScreen) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_HELP_HAS_SEEN_REPETITIVE_ISSUES,
    hasSeenRepetitiveIssuesScreen
  })
}
