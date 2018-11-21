import React from 'react'

import css from './PaymentHeader.css'

export const PaymentHeader = () => (
  <div>
    <h3 className={css.header}>Payment details</h3>
    <span className={css.padlockIcon} />
    <span className={css.boldInfo}>All fields are required</span>
    <p className={css.textSM}>All transactions are secured using 128 bit SSL technology.</p>
  </div>
)
