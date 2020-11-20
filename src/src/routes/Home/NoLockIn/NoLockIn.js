import React from 'react'
import css from './NoLockIn.css'

const NoLockIn = () => (
  <div className={css.noLockIn}>
    <div className={css.lockInIcon} />
    <div className={css.lockSign}>
      <span className={css.lockInBold}>No lock in: </span>
      pause or cancel for free anytime
    </div>
  </div>
)

export {
  NoLockIn
}
