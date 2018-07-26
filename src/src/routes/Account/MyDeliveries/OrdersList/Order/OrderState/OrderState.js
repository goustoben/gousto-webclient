import React, { PropTypes } from 'react'
import css from './OrderState.css'

const initcap = (word) => word.charAt(0).toUpperCase() + word.slice(1)
const toCamelCase = (str) => str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(' ', '')

const OrderState = ({ orderState }) => {
	let state = initcap(orderState)
	const iconClass = `icon${toCamelCase(state)}`
	const stateClass = `state${toCamelCase(state)}`

	return (
		<div className={css.orderStateWrap}>
			<span className={css[iconClass]} ></span>
			<p className={css[stateClass]}>{state}</p>
		</div>
	)
}

OrderState.propTypes = {
	orderState: PropTypes.string,
}

OrderState.defaultProps = {
	orderState: '',
}

export default OrderState
