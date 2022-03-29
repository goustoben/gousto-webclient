import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPayPalNonce } from 'actions/checkout'
import { usePricing } from 'routes/Menu/domains/pricing'
import { CheckoutPayPalDetailsContainer } from './CheckoutPayPalDetailsContainer'

function useSetPayPalNonce() {
  const dispatch = useDispatch()
  const { pricing } = usePricing()

  return useCallback(
    (nonce: string) => {
      dispatch(setPayPalNonce(nonce, { pricing }))
    },
    [dispatch, pricing]
  )
}

type CheckoutPayPalDetailsWrapperProps = {
  hide: boolean
  paypalScriptsReady: boolean
}

export function CheckoutPayPalDetailsWrapper(props: CheckoutPayPalDetailsWrapperProps) {
  const setPayPalNonceCallback = useSetPayPalNonce()

  return <CheckoutPayPalDetailsContainer {...props} setPayPalNonce={setPayPalNonceCallback} />
}
