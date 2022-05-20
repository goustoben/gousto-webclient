import { Dispatch } from 'redux'
import { actionTypes } from 'actions/actionTypes'
import { clickPriceComparisonTableHeading } from 'actions/trackingKeys'

export const trackClickPriceComparisonTableHeader = () => (dispatch: Dispatch) =>
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: clickPriceComparisonTableHeading,
    },
  })
