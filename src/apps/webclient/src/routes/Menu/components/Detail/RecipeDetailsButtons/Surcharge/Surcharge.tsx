import React from 'react'

import css from './Surcharge.css'

type SurchargeProps = {
  surcharge: number
}

export const Surcharge = ({ surcharge }: SurchargeProps) => {
  if (!surcharge) {
    return null
  }

  return (
    <div className={css.surcharge}>
      +&pound;
      {surcharge.toFixed(2)} per serving
    </div>
  )
}
