import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import { getOrderShippingAddress} from '../selectors/addressSelectors'
import { fetchShippingAddresses } from '../apis/core'
import { asyncAndDispatch } from './utils'
import { getValidAddressForOrder } from '../utils/validateAddress'
import { actionTypes } from './actionTypes'

export const loadShippingAddresses = () => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())
  const userId = getUserId(getState())
  const orderAddress = getOrderShippingAddress(getState())

  const getPayload = async () => {
    const { data: userAddresses } = await fetchShippingAddresses(accessToken)
    const defaultShippingAddress = userAddresses.find(({shippingDefault}) => (shippingDefault))
    const selectedAddress = getValidAddressForOrder(userAddresses, orderAddress, defaultShippingAddress)

    return {
      userAddresses,
      selectedAddress
    }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_LOAD_SHIPPING_ADDRESSES,
    getPayload,
    errorMessage: `Failed to loadShippingAddresses userId: ${userId}`
  })
}
