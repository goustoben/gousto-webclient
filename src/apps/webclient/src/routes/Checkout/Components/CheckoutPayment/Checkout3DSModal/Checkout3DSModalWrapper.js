import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkPaymentAuth } from 'actions/checkout'
import { getChallengeUrl, isModalOpen } from 'selectors/payment'
import { usePricing } from 'routes/Menu/domains/pricing'
import { Checkout3DSModal } from './Checkout3DSModal'

function useOnChallengeDone() {
  const dispatch = useDispatch()
  const { pricing } = usePricing()

  return useCallback(
    (checkoutSessionId) => {
      dispatch(checkPaymentAuth(checkoutSessionId, { pricing }))
    },
    [dispatch, pricing]
  )
}

export function Checkout3DSModalWrapper() {
  const isOpen = useSelector(isModalOpen)
  const challengeUrl = useSelector(getChallengeUrl)
  const onChallengeDone = useOnChallengeDone()

  return (
    <Checkout3DSModal
      isOpen={isOpen}
      challengeURL={challengeUrl}
      onChallengeDone={onChallengeDone}
    />
  )
}
