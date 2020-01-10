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
  const alternateDeliveryDays = orders.filter(order => order.get('state') === 'pending' && order.get('originalDeliveryDay')).toArray()
  if (alternateDeliveryDays.length > 0) {
    return 'amendDelivery'
  }
}

export const checkOrderAwaitingSelection = (orders, now) => {
  const notifications = orders
    .filter(order => order.get('state') === 'pending' && order.get('default') === '1')
    .filter(order => moment(order.get('whenCutoff')).isSame(now, 'day'))
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

export const checkSustainabilityPledge = (now) => {
  const { startDate, endDate } = config.sustainabilityPledge
  const showBanner = moment(now).isBetween(startDate, endDate)

  return showBanner ? 'sustainabilityPledge' : undefined
}

export const priority = (type = '') => {
  switch(type) {
  case 'danger':
    return 3
  case 'warning':
    return 2
  case 'notify':
    return 1
  default:
    return 0
  }
}

export const sortNotifications = (a, b) => (
  priority(b.type) - priority(a.type)
)
