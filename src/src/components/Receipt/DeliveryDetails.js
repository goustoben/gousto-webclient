import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import moment from 'moment'
import css from './DeliveryDetails.css'

import deliverySlotUtils from 'utils/deliverySlot'

const DeliveryDetails = (props) => {
	const deliveryDate = moment(props.date).format('ddd, D MMM')
	const deliveryTime = deliverySlotUtils.toTimeRange(props.slot)

	const shippingDetails = [
		props.address.get('line1'),
		props.address.get('line2'),
		props.address.get('line3'),
		props.address.get('town'),
		props.address.get('postcode'),
		`${deliveryDate}, ${deliveryTime}`,
	]
		.filter(lineItem => !!lineItem)

	return (
		<span
			className={css.content}
			data-hj-masked
		>
			{shippingDetails.map((shippingDetail, key) => <span key={key} className={css.shippingDetail}>{shippingDetail}</span>)}
		</span>
	)
}

DeliveryDetails.propTypes = {
	address: PropTypes.instanceOf(Immutable.Map),
	date: PropTypes.string,
	slot: PropTypes.object,
}

export default DeliveryDetails
