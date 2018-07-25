import React, { PropTypes } from 'react'
import { formatTime, formatLongDate } from '../../datetimeFormatter'

const PreviewDeliveryDate = (props) => (
	<div>
		<span className="selected-order-date">
			Delivery Date: {formatLongDate(props.deliveryDate)}, {formatTime(props.deliverySlot.delivery_start)} - {formatTime(props.deliverySlot.delivery_end)}
		</span>

		{props.isDateEditable ?
			<a className="update-order-date" onClick={props.toggleEdit}>
				{props.isEditingDate ? 'cancel date change' : 'change date'}
			</a>
			:
			null
		}
		<div className="clearfix">
			{props.children}
		</div>
	</div>
)

PreviewDeliveryDate.propTypes = {
	deliveryDate: PropTypes.string.isRequired,
	deliverySlot: PropTypes.shape({
		delivery_start: PropTypes.string.isRequired,
		delivery_end: PropTypes.string.isRequired,
	}),
	toggleEdit: PropTypes.func,
	isEditingDate: PropTypes.bool,
	isDateEditable: PropTypes.bool,
	children: PropTypes.any,
}

PreviewDeliveryDate.defaultProps = {
	toggleEdit: () => {},
	isEditingDate: false,
	isDateEditable: false,
}

export default PreviewDeliveryDate
