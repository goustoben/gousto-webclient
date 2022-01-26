import moment from 'moment'

const getTimeLeft = (date) => {
  const dateToMoment = moment(date, 'YYYY-MM-DD HH:mm:ss')

  if (dateToMoment.diff(moment()) <= 0) {
    return null
  }

  return dateToMoment.toNow(true)
}

function timeFormat(time, format) {
  switch (format) {
  case 'day':
    return moment(time, 'YYYY-MM-DD').format('dddd Do MMMM')
  case 'hour': {
    // Round up to the closest hour
    let m = moment(time, 'HH:mm:ss')
    m = m.minute() || m.second() ? m.add(1, 'hour').startOf('hour') : m.startOf('hour')

    return m.format('ha')
  }
  case 'hourAndDay':
    return moment(time, 'YYYY-MM-DD HH:mm:ss').format('ha, D MMMM')
  case 'timeLeft':
    return getTimeLeft(time)
  case 'dayAndMonth':
    return moment(time, 'YYYY-MM-DD HH:mm:ss').format('D MMMM')
  default:
    return ''
  }
}

export default timeFormat
