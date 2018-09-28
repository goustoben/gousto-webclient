import React from 'react'
import { Button } from 'goustouicomponents'
import css from './CheckoutButton.css'

const CheckoutButton = ({ color, fill, onClick, stepName, submitting }) => (
	<Button
		color={color}
		fill={fill}
		width="full"
		onClick={onClick}
		pending={submitting}
		className={css.marginTop}
		disabled={submitting}
		data-testing="checkoutCTA"
	>
		{stepName}
	</Button>
)

CheckoutButton.propTypes = {
	fill: React.PropTypes.bool,
	stepName: React.PropTypes.string,
	submitting: React.PropTypes.bool,
	onClick: React.PropTypes.func,
	color: React.PropTypes.string,
}

CheckoutButton.defaultProps = {
	color: 'primary',
	onClick: () => {},
	fill: true,
	stepName: '',
	submitting: false,
}

export default CheckoutButton
