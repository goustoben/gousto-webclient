import moment from 'moment'

const roundTime = (_time) => {
	const time = moment(_time, 'HH:mm:ss')
	if (time.minute() > 30) {
		return time.endOf('hour').add(1, 'ms')
	}

	return time.startOf('hour')
}

const formatTime = (time) => (roundTime(time).format('ha'))

function toTimeRange(deliverySlot) {
	return `${formatTime(deliverySlot.get('deliveryStart'))} - ${formatTime(deliverySlot.get('deliveryEnd'))}`
}

export default {
	toTimeRange,
}
