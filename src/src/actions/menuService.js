
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from './actionTypes'

export function menuServiceDataReceived(response) {
  return ({
    type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
    response,
    trackingData: {
      actionType: trackingKeys.receiveMenuServiceData
    }
  })
}
