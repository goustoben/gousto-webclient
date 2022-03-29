import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import actions from 'actions'
import { usePricing } from 'routes/Menu/domains/pricing'

export function useSubmitOrder() {
  const dispatch = useDispatch()
  const { pricing } = usePricing()

  return useCallback(() => {
    dispatch(actions.checkoutSignup({ pricing }))
  }, [dispatch, pricing])
}
