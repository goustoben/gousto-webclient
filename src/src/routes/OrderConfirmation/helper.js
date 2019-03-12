import moment from 'moment'

export const getHeaderDetails = (order) => {
  const { humanDeliveryDate, whenCutoff } = order
  const { deliveryStart, deliveryEnd } = order.deliverySlot
  const cutOffTimeFormat = moment(whenCutoff).add(1, 'seconds').format('HH')
  const cutoffDayFormat = moment(whenCutoff).format('dddd Do MMMM')

  return ({
    deliveryDate: humanDeliveryDate,
    deliveryStart,
    deliveryEnd,
    whenCutoffTime: cutOffTimeFormat,
    whenCutoffDate: cutoffDayFormat
  })
}
