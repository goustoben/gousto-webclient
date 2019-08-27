import React from 'react'

import css from './PaymentHeader.css'

export const PaymentHeader = () => (
  <div>
    <div className={css.headerContainer}>
      <h3 className={css.header}>Payment details <span className={css.padlockIcon} /></h3>
      <span className={css.boldInfo}>All fields are required</span>
    </div>
    <p className={css.textSM}>All transactions are secured using 128 bit SSL technology.</p>
  </div>
)
