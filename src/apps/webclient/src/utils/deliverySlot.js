import moment from 'moment'

const roundTime = (_time) => {
  const time = moment(_time, 'HH:mm:ss')
  if (time.minute() > 30) {
    return time.endOf('hour').add(1, 'ms')
  }

  return time.startOf('hour')
}

const formatTime = (time) => (roundTime(time).format('ha'))

export const toTimeRange = deliverySlot => `${formatTime(deliverySlot.get('deliveryStart'))} - ${formatTime(deliverySlot.get('deliveryEnd'))}`

export const parseTimeRange = (deliveryStart, deliveryEnd) => `${formatTime(deliveryStart)} - ${formatTime(deliveryEnd)}`

export const isAfterCutoff = () => moment().hours() >= 12

export const getDateOffset = date => {
  const now = moment()
  const then = moment(date)
  const offset = Math.ceil(then.diff(now, 'hours', true) / 24)
  const adjustedOffset = isAfterCutoff() ? offset - 1 : offset

  return adjustedOffset
}

export const formatDeliveryTime = (deliveryStartTime, deliveryEndTime, tempDate) => (
  `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${tempDate} ${deliveryEndTime}`).format('ha')} `
)

/**
 * Temp methods only for NDD painted door
 */

export const formatNextDayDeliveryDayDate = dayOffSet => moment().add(dayOffSet, 'day').format('YYYY-MM-DD')

export const formatNextDayDeliveryDayLabel = dayOffSet => moment().add(dayOffSet, 'day').format('ddd D MMM')

export const generateNextDayDeliverySlots = nextDayDeliveryDays => {
  const slots = {}
  nextDayDeliveryDays.forEach(day => {
    slots[day.date] = [{ label: '8AM - 7PM', subLabel: '', value: 'NULL', coreSlotId: 'NULL' }]
  })

  return slots
}

export const createNextDayDeliveryDays = () => {
  const dayOffSet = isAfterCutoff() ? 2 : 1

  return [
    {
      date: formatNextDayDeliveryDayDate(dayOffSet),
      value: formatNextDayDeliveryDayDate(dayOffSet),
      disable: false,
      label: `${formatNextDayDeliveryDayLabel(dayOffSet)} £1.99`
    },
    {
      date: formatNextDayDeliveryDayDate(dayOffSet + 1),
      value: formatNextDayDeliveryDayDate(dayOffSet + 1),
      disable: false,
      label: `${formatNextDayDeliveryDayLabel(dayOffSet + 1)} £0.99`
    }
  ]
}

/** END: Temp methods for NDD painted door */
