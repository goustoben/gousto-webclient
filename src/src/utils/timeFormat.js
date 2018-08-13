import moment from 'moment'

export default function timeFormat(time, format) {
	switch (format) {
		case 'day':
			return moment(time, 'YYYY-MM-DD').format('dddd D MMMM')
		case 'hour': {
			// Round up to the closest hour
			let m = moment(time, 'HH:mm:ss')
			m = m.minute() || m.second() ? m.add(1, 'hour').startOf('hour') : m.startOf('hour')

			return m.format('ha')
		}
		case 'hourAndDay':
			return moment(time, 'YYYY-MM-DD HH:mm:ss').format('ha, D MMMM')
		case 'timeLeft':
			return moment(time, 'YYYY-MM-DD HH:mm:ss').toNow(true)
		case 'dayAndMonth':
			return moment(time, 'YYYY-MM-DD HH:mm:ss').format('D MMMM')
		default:
			return ''
	}
}
