
import actionTypes from './actionTypes'

export function menuServiceDataReceived(response) {
  return ({
    type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
    response,
    trackingData: {
      actionType: 'MENU_SERVICE_DATA_RECEIVED'
    }
  })
}
