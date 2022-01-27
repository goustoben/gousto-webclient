import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import Svg from 'Svg'
import { formatSeconds } from '../checkoutUrgencyUtils'
import css from './CheckoutUrgencyBanner.css'
import { Badge, Box, Color } from '@gousto-internal/citrus-react'

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const formattedTime = formatSeconds(remainingSeconds)

  return (
    <div className={css.container}>
      <div className={css.banner}>
        <div className={css.iconContainer}>
          <Svg className={css.icon} fileName="icon-timer-red" />
        </div>
        <div className={css.content}>
          Checkout within {formattedTime} to avoid losing your recipes
        </div>
      </div>
    </div>
  )
}
