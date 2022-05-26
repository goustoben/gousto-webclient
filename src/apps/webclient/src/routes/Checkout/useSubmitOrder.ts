import { useCallback } from 'react'

import actions from 'actions'
import { useDispatch } from 'react-redux'

import { feLoggingLogEvent, logLevels } from 'actions/log'
import { usePricing } from 'routes/Menu/domains/pricing'

export function useSubmitOrder() {
  const dispatch = useDispatch()
  const { pricing } = usePricing()

  return useCallback(() => {
    dispatch(feLoggingLogEvent(logLevels.info, 'useSubmitOrder - in callback'))
    dispatch(actions.checkoutSignup({ pricing }))
  }, [dispatch, pricing])
}
