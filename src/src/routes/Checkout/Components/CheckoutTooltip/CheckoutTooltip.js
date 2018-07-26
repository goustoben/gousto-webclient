import React from 'react'
import css from './CheckoutTooltip.css'
import RCTooltip from 'rc-tooltip'

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
	children: React.PropTypes.node.isRequired,
	placement: React.PropTypes.string,
	version: React.PropTypes.string,
	trigger: React.PropTypes.array,
}

CheckoutTooltip.defaultProps = {
	placement: 'right',
	version: '',
	trigger: ['click'],
}

export default CheckoutTooltip
