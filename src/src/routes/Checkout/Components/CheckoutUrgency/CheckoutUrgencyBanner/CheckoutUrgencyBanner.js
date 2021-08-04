import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)

  return (
    <div>
      checkout urgency test banner:{' '}
      <span id="CheckoutUrgencyBanner_remainingSeconds">{remainingSeconds}</span>
    </div>
  )
}
