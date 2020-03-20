
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'

export function menuServiceDataReceived(response, accessToken = '', userMenuVariant = '') {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MENU_FETCH_PARAMS,
      accessToken,
      menuVariant: userMenuVariant
    })

    dispatch({
      type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
      response,
      trackingData: {
        actionType: trackingKeys.receiveMenuServiceData
      }
    })
  }
}
