import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import Svg from 'Svg'
import { formatOrderPrice } from 'utils/pricing'
import css from './HeaderContent.css'

const poundSign = String.fromCharCode(163)

export const HeaderContent = ({
  isExpanded,
  handleClick,
  totalWithoutDiscount,
  totalToPay,
  promoCodeValid,
}) => (
  <div
    className={classNames(css.toggleHeader, { [css.hideBottomBorder]: isExpanded })}
    role="button"
    tabIndex="0"
    onClick={handleClick}
    onKeyDown={onEnter(handleClick)}
    data-testing="checkoutOrderSummary"
  >
    <span className={css.title}>{isExpanded ? 'Hide order summary' : 'Show order summary'}</span>
    <span className={css.poundsWrapper}>
      {promoCodeValid && (
        <span className={css.total}>
          <s>
            {poundSign}
            {totalWithoutDiscount}
          </s>
        </span>
      )}
      <span className={css.withDiscount}>{formatOrderPrice(totalToPay)}</span>
      <Svg
        fileName="icon-chevron-small-right"
        className={classNames(css.icon, {
          [css.isExpanded]: isExpanded,
          [css.isCollapsed]: !isExpanded,
        })}
      />
    </span>
  </div>
)

HeaderContent.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  totalToPay: PropTypes.string,
  totalWithoutDiscount: PropTypes.string,
  promoCodeValid: PropTypes.bool,
}

HeaderContent.defaultProps = {
  totalToPay: '',
  totalWithoutDiscount: '',
  promoCodeValid: false,
}
