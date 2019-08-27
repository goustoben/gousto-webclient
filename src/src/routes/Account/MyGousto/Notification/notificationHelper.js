import moment from 'moment'
import { config } from './config'

export const checkCardExpiryDate = (card, now) => {
  let bannerToShow
  const expiryDate = moment(card.get('expiryDate'))

  if (!card.size) return

  if (now.isBefore(expiryDate) && expiryDate.diff(now, 'days') <= 30) {
    bannerToShow = 'toExpire'
  } else if (now.isSameOrAfter(expiryDate)) {
    bannerToShow = 'expired'
  }

  return bannerToShow
}

export const checkAmendedDeliveryDate = (orders) => {
  const alternateDeliveryDays = orders.filter(order => order.state === 'pending' && order.original_delivery_day).toArray()
  if (alternateDeliveryDays.length > 0) {
    return 'amendDelivery'
  }
}

export const checkOrderAwaitingSelection = (orders, now) => {
  const notifications = orders
    .filter(order => order.state === 'pending' && order.default === '1')
    .filter(order => moment(order.when_cutoff).isSame(now, 'day'))
    .toArray()

  if (notifications.length >= 1) {
    return 'selectOrder'
  }
}

export const checkRafOffer = (now) => {
  const { startDate, endDate } = config.referAFriend
  const rafExpiry = moment(now).isBetween(startDate, endDate)

  if (rafExpiry) {
    return 'referAFriend'
  }
}
