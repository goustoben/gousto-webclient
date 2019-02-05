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

export const isAfterCutoff = () => moment().hours() >= 12

export const getDateOffset = date => {
  const now = moment()
  const then = moment(date)
  const offset = Math.ceil(then.diff(now, 'hours') / 24)
  const adjustedOffset = isAfterCutoff() ? offset - 1 : offset

  return adjustedOffset
}

/**
 * Temp methods only for NDD painted door
 */

export const formatNextDayDeliveryDayDate = dayOffSet => moment().add(dayOffSet, 'day').format('YYYY-MM-DD')

export const formatNextDayDeliveryDayLabel = dayOffSet => moment().add(dayOffSet, 'day').format('ddd D MMM')

export const generateNextDayDeliverySlots = nextDayDeliveryDays => {
  const slots = {}
  nextDayDeliveryDays.map(day => {
    slots[day.date] = [{ label: "8AM - 7PM", subLabel: "", value: "NULL", coreSlotId: "NULL" }]
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
      label: `${formatNextDayDeliveryDayLabel(dayOffSet)} £2.99`
    },
    {
      date: formatNextDayDeliveryDayDate(dayOffSet + 1),
      value: formatNextDayDeliveryDayDate(dayOffSet + 1),
      disable: false,
      label: `${formatNextDayDeliveryDayLabel(dayOffSet + 1)} £1.99`
    }
  ]
}

/** END: Temp methods for NDD painted door */

export default {
  toTimeRange,
  formatNextDayDeliveryDayDate,
  formatNextDayDeliveryDayLabel,
  getDateOffset,
  isAfterCutoff,
  createNextDayDeliveryDays,
  generateNextDayDeliverySlots
}

