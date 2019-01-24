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

function formatNextDayDeliveryDayDate(dayOffSet) {
  return moment().add(dayOffSet, 'day').format('YYYY-MM-DD')
}

function formatNextDayDeliveryDayLabel(dayOffSet) {
  return moment().add(dayOffSet, 'day').format('ddd D MMM')
}

export default {
  toTimeRange,
  formatNextDayDeliveryDayDate,
  formatNextDayDeliveryDayLabel
}

