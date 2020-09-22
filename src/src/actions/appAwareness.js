import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'

export const trackAppStoreLoginButton = () => (dispatch) => {
  const type = trackingKeys.clickAppStoreLoginButton

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
    }
  })
}

export const trackPlayStoreLoginButton = () => (dispatch) => {
  const type = trackingKeys.clickPlayStoreLoginButton

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: type,
    }
  })
}
