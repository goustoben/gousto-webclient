import React from 'react'
import PropTypes from 'prop-types'
import RCTooltip from 'rc-tooltip'
import css from './CheckoutTooltip.css'

const CheckoutTooltip = ({ version, placement, trigger, children }) => (
  <div className={version ? css[`on${version}`] : ''}>
    <RCTooltip
      placement={placement}
      trigger={trigger}
      overlay={<div className={css.tooltipContent}>{children}</div>}
      overlayClassName={`checkoutTooltip-${placement}`}
    >
      <span className={css.tooltipTrigger} />
    </RCTooltip>
  </div>
)

CheckoutTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  version: PropTypes.string,
  trigger: PropTypes.arrayOf(PropTypes.string),
}

CheckoutTooltip.defaultProps = {
  placement: 'right',
  version: '',
  trigger: ['click'],
}

export { CheckoutTooltip }
