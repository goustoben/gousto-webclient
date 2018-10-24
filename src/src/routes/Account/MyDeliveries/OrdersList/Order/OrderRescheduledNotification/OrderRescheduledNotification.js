import React, { PropTypes } from 'react'

import css from './OrderRescheduledNotification.css'

const OrderRescheduledNotification = ({ oldDeliveryDay, reason }) => (
	<div className={css.notification}>
		<span className={css.oldDeliveryDay}>{oldDeliveryDay}</span>
		{reason ?
			<span> ({reason})</span>
		: null}
	</div>
)

OrderRescheduledNotification.propTypes = {
	oldDeliveryDay: PropTypes.string,
	reason: PropTypes.string,
}

OrderRescheduledNotification.defaultProps = {
	oldDeliveryDay: '',
	reason: '',
}

export default OrderRescheduledNotification
