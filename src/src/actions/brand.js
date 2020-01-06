import actionTypes from './actionTypes'

export function brandDataReceived(response) {
  return ({
    type: actionTypes.BRAND_DATA_RECEIVED,
    response,
  })
}
