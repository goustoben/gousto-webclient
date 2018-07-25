import React, { PropTypes } from 'react'
import moment from 'moment'

import css from './DeliveryInfo.css'
import Svg from 'Svg'

const DeliveryInfo = ({ deliveryDate, cutOffDate, frequency }) => {
	const deliveryDay = moment(deliveryDate).format('dddd')
	const cutOffDay = moment(cutOffDate).format('dddd')

	return (
		<div className={css.infoContainer}>
			<div className={css.flex}>
				<Svg fileName="icon-frequency" className={css.iconFrequency} />
				<div className={css.iconFrequencyDescription}>
					<p className={css.iconFrequencyText}>Your {frequency} deliveries will come on {deliveryDay}s. You can edit your orders until midday on {cutOffDay} each {frequency.replace('ly', '')}, and can adjust your subscription at any time.</p>
				</div>
			</div>
		</div>
	)
}

DeliveryInfo.propTypes = {
	deliveryDate: PropTypes.string,
	cutOffDate: PropTypes.string,
	frequency: PropTypes.string,
}

DeliveryInfo.defaultProps = {
	frequency: 'weekly',
}

export default DeliveryInfo
