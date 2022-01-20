
import * as trackingKeys from 'actions/trackingKeys'
import { normaliseData } from '../apis/transformers/normaliseData'
import { actionTypes } from './actionTypes'

export function menuServiceDataReceived(response, accessToken = '', userMenuVariant = '') {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MENU_FETCH_PARAMS,
      accessToken,
      menuVariant: userMenuVariant
    })

    const normalisedData = normaliseData(response)

    dispatch({
      type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
      response: normalisedData,
      trackingData: {
        actionType: trackingKeys.receiveMenuServiceData
      }
    })
  }
}
