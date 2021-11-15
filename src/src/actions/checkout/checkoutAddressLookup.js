import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"
import { fetchAddressByPostcode } from "apis/addressLookup/fetchAddressByPostcode"

export function checkoutAddressLookup(postcode) {
  return async (dispatch) => {
    dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, true))
    dispatch(error(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, null))

    const addresses = {
      deliveryPoints: [],
      postcode,
    }

    try {
      const lookupResults = await fetchAddressByPostcode(postcode)

      addresses.deliveryPoints = lookupResults.data.deliveryPoints || []
      addresses.town = lookupResults.data.town
      addresses.postcode = lookupResults.data.postcode || postcode
      addresses.county = lookupResults.data.traditionalCounty || ''
    } catch (err) {
      dispatch(trackCheckoutError(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, err.message, 'checkoutAddressLookup'))
      dispatch(error(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, err.message))
      logger.error({message: 'Unable to look-up address'})
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, false))
    }

    return addresses
  }
}
