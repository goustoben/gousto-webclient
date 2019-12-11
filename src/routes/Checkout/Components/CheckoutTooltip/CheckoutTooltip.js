import React from 'react'
import PropTypes from 'prop-types'
import RCTooltip from 'rc-tooltip'
import css from './CheckoutTooltip.css'

const CheckoutTooltip = (props) => (
  <div className={props.version ? css[`on${props.version}`] : ''}>
    <RCTooltip
      placement={props.placement}
      trigger={props.trigger}
      overlay={<div className={css.tooltipContent}>{props.children}</div>}
      overlayClassName={`checkoutTooltip-${props.placement}`}
    >
      <span className={css.tooltipTrigger}></span>
    </RCTooltip>
  </div>)

CheckoutTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  version: PropTypes.string,
  trigger: PropTypes.array,
}

CheckoutTooltip.defaultProps = {
  placement: 'right',
  version: '',
  trigger: ['click'],
}

export default CheckoutTooltip
