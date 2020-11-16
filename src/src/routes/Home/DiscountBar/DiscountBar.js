import PropTypes from 'prop-types'
import React from 'react'
import { onEnter } from 'utils/accessibility'
import classnames from 'classnames'
import css from './DiscountBar.css'

const DiscountBar = ({ isHidden, isSticky, applyDiscount }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={applyDiscount}
    onKeyDown={onEnter(applyDiscount)}
    className={classnames(
      css.discountContainer,
      {
        [css.hideBar]: isHidden,
        [css.stickyBar]: isSticky,
      }
    )}
  >
    <p className={css.discountText}>Get 30% off all boxes for 1 month</p>
    <div className={css.arrowRightIcon} />
  </div>
)

DiscountBar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  applyDiscount: PropTypes.func.isRequired,
  isSticky: PropTypes.bool.isRequired,
}

export {
  DiscountBar
}
