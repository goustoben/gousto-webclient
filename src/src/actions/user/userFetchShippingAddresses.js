import { fetchShippingAddressesPending } from "actions/user/fetchShippingAddressesPending"
import { fetchedShippingAddresses } from "actions/user/fetchedShippingAddresses"
import Immutable from "immutable"
import { basketAddressChange } from "actions/basket/basketAddressChange"
import { basketChosenAddressChange } from "actions/basket/basketChosenAddressChange"
import { basketPostcodeChangePure } from "actions/basket/basketPostcodeChangePure"
import { fetchShippingAddressesError } from "actions/user/fetchShippingAddressesError"
import { fetchShippingAddresses } from "apis/users/fetchShippingAddresses"

export function userFetchShippingAddresses() {
  return async (dispatch, getState) => {
    dispatch(fetchShippingAddressesPending(true))
    try {
      const accessToken = getState().auth.get('accessToken')
      const {data: shippingAddresses} = await fetchShippingAddresses(accessToken)
      dispatch(fetchedShippingAddresses(shippingAddresses))

      const address = Immutable.fromJS(shippingAddresses)
        .filter(addr => addr.get('shippingDefault'))
        .first()
      dispatch(basketAddressChange(address))
      dispatch(basketChosenAddressChange(address))
      dispatch(basketPostcodeChangePure(address.get('postcode')))

      dispatch(fetchShippingAddressesPending(false))
    } catch (err) {
      dispatch(fetchShippingAddressesError(err.message))
      dispatch(fetchShippingAddressesPending(false))
    }
  }
}
