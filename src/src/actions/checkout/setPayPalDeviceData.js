import { actionTypes } from 'actions/actionTypes'

export function setPayPalDeviceData(deviceData) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_DEVICE_DATA,
      deviceData
    })
  }
}
