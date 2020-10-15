import moment from 'moment'

export const compareTodayToDeliveryDate = (deliveryDate) => {
  const precision = 'day'
  if (moment(new Date()).isBefore(deliveryDate, precision)) {
    return 'before'
  }

  if (moment(new Date()).isSame(deliveryDate, precision)) {
    return 'on'
  }

  return 'after'
}
