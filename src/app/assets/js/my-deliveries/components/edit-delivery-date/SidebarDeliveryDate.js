import React, { PropTypes } from 'react'
import { formatTime, formatLongDate } from '../../datetimeFormatter'

const SidebarDeliveryDate = (props) => (
	<span>
		<span className="glyphicon glyphicon-calendar" aria-hidden="true" />
		{props.order.original_delivery_day ?
			<span>
				<span className="strikethrough-day text-danger">
					{formatLongDate(props.order.original_delivery_day.date)}
				</span>
				<br />
			</span>
			:
			null
		}
		{formatLongDate(props.order.delivery_date).toUpperCase()}
		{' '}
		{formatTime(props.order.delivery_slot.delivery_start)} - {formatTime(props.order.delivery_slot.delivery_end)}
	</span>
)

SidebarDeliveryDate.propTypes = {
	order: PropTypes.shape({
		delivery_date: PropTypes.string.isRequired,
		delivery_slot: PropTypes.shape({
			delivery_start: PropTypes.string.isRequired,
			delivery_end: PropTypes.string.isRequired,
		}),
		original_delivery_day: PropTypes.shape({
			date: PropTypes.string,
		}),
	}),
}

export default SidebarDeliveryDate
