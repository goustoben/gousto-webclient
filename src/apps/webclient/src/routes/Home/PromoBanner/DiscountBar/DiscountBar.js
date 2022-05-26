import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { onEnter } from 'utils/accessibility'

import css from './DiscountBar.css'

const DiscountBar = ({ isHidden, isSticky, applyDiscount, text }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={applyDiscount}
    onKeyDown={onEnter(applyDiscount)}
    className={classnames(css.discountContainer, {
      [css.hideBar]: isHidden,
      [css.stickyBar]: isSticky,
    })}
  >
    <p className={css.discountText}>{text}</p>
    <div className={css.arrowRightIcon} />
  </div>
)

DiscountBar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  applyDiscount: PropTypes.func.isRequired,
  isSticky: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export { DiscountBar }
