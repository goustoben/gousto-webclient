import { useCallback, useMemo } from 'react'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { basketChosenAddressChange } from 'actions/basket'
import { ImmutableMap } from 'routes/Menu/types/immutableMap'

export type Address = ImmutableMap<{
  id: string
  name: string
  postcode: string
}>

const useStateAddress = () =>
  useSelector<RootStateOrAny, Address>((state) => state.basket.get('chosenAddress'))

const useCurrentAddress = () => {
  const address = useStateAddress()

  const addressId = address?.get('id') || null
  const addressPostcode = address?.get('postcode') || null

  return useMemo(
    () =>
      addressId && addressPostcode
        ? {
            id: addressId,
            postcode: addressPostcode,
          }
        : null,
    [addressId, addressPostcode],
  )
}

const useChangeAddress = () => {
  const dispatch = useDispatch()

  return useCallback((address: Address) => dispatch(basketChosenAddressChange(address)), [dispatch])
}

/**
 * Hook to handle the currently selected basket address.
 *
 * Returns
 *  the currently selected address,
 *  and a function to change the currently selected address.
 */
export const useAddress = () => {
  const address = useCurrentAddress()
  const changeAddress = useChangeAddress()

  return { address, changeAddress }
}
