import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPayPalNonce } from 'actions/checkout'
import { usePricing } from 'routes/Menu/domains/pricing'
import { CheckoutPayPalDetailsContainer } from './CheckoutPayPalDetailsContainer'

function useSetPayPalNonce() {
  const dispatch = useDispatch()
  const { pricing } = usePricing()

  return useCallback((nonce: string) => {
    dispatch(setPayPalNonce(nonce, { pricing }))
  }, [ dispatch, pricing ])
}

export function CheckoutPayPalDetailsWrapper(props: {}) {
  const setPayPalNonce = useSetPayPalNonce()

  return <CheckoutPayPalDetailsContainer {...props} setPayPalNonce={setPayPalNonce} />
}
