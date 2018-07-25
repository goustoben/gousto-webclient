import moment from 'moment'

export const formatLongDate = (datetime) => (moment(datetime).format('dddd Do MMMM'))

export const formatShortDate = (datetime) => (moment(datetime).format('ddd DD MMM'))

export const formatTime = (_time) => {
	let time = moment(_time, 'HH:mm:ss')
	if (time.minute() > 30) {
		time = time.endOf('hour').add(1, 'ms')
	} else {
		time = time.startOf('hour')
	}

	return time.format('ha')
}

export const formatFullDate = (datetime) => moment(datetime).format('YYYY-MM-DD')
