import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './NoLockIn.css'

const NoLockIn = ({ isCentered }) => (
  <div className={classNames(css.noLockIn, { [css.isCentered]: isCentered })}>
    <div className={css.lockInIcon} />
    <div className={css.lockSign}>
      <span className={css.lockInBold}>No lock in: </span>
      pause or cancel for free anytime
    </div>
  </div>
)

NoLockIn.propTypes = {
  isCentered: PropTypes.bool,
}

NoLockIn.defaultProps = {
  isCentered: false,
}

export { NoLockIn }
