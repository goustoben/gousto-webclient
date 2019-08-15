import moment from 'moment'

export const getHeaderDetails = (order) => {
  const { humanDeliveryDate, whenCutoff, deliverySlot } = order.toJS()
  const { deliveryStart, deliveryEnd } = deliverySlot
  const deliveryStartFormat = moment(deliveryStart, 'HH:mm:ss').format('ha')
  const deliveryEndFormat = moment(deliveryEnd, 'HH:mm:ss').add(1, 'seconds').format('ha')
  const cutOffTimeFormat = moment(whenCutoff).add(1, 'seconds').format('ha')
  const cutoffDayFormat = moment(whenCutoff).format('dddd Do MMMM')

  return ({
    deliveryDate: humanDeliveryDate,
    deliveryStart: deliveryStartFormat,
    deliveryEnd: deliveryEndFormat,
    whenCutoffTime: cutOffTimeFormat,
    whenCutoffDate: cutoffDayFormat
  })
}
