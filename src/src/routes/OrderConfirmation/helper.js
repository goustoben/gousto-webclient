import moment from 'moment'

export const getHeaderDetails = (order) => {
  const { humanDeliveryDate, whenCutoff, deliverySlot } = order.toJS()
  const { deliveryStart, deliveryEnd } = deliverySlot
  const deliveryStartFormat = moment(deliveryStart, 'HH:mm:ss').format('h a')
  const deliveryEndFormat = moment(deliveryEnd, 'HH:mm:ss').add(1, 'seconds').format('h a')
  const cutOffTimeFormat = moment(whenCutoff).add(1, 'seconds').format('h a')
  const cutoffDayFormat = moment(whenCutoff).format('dddd Do MMMM')

  return ({
    deliveryDate: humanDeliveryDate,
    deliveryStart: deliveryStartFormat,
    deliveryEnd: deliveryEndFormat,
    whenCutoffTime: cutOffTimeFormat,
    whenCutoffDate: cutoffDayFormat
  })
}
