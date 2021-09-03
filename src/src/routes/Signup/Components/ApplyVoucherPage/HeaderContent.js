import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import { signupClickVoucherInfo } from 'actions/trackingKeys'
import Svg from 'Svg'
import css from './ApplyVoucherPage.css'

export const HeaderContent = ({ isExpanded, handleClick, trackUTMAndPromoCode }) => (
  <div
    className={css.header}
    role="button"
    tabIndex="0"
    onClick={(e) => {
      handleClick(e)
      trackUTMAndPromoCode(signupClickVoucherInfo)
    }}
    onKeyDown={onEnter(handleClick)}
    data-testing="applyVoucherDropdown"
  >
    <div className={css.title}>Where can I find the voucher?</div>
    <Svg
      fileName="icon-chevron-small-right"
      className={classNames(css.icon, {
        [css.isExpanded]: isExpanded,
        [css.isCollapsed]: !isExpanded,
      })}
    />
  </div>
)

HeaderContent.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}
