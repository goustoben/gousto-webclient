import moment from 'moment'

import { config } from './config'

export const checkCardExpiryDate = (card, now) => {
  let bannerToShow
  const expiryDate = moment(card.get('expiryDate'))

  if (!card.size) return undefined

  if (now.isSame(expiryDate, 'month')) {
    bannerToShow = 'toExpire'
  } else if (now.isAfter(expiryDate, 'month')) {
    bannerToShow = 'expired'
  }

  return bannerToShow
}

export const checkAmendedDeliveryDate = (orders) => {
  const alternateDeliveryDays = orders.filter(order => order.get('state') === 'pending' && order.get('originalDeliveryDay')).toArray()

  return alternateDeliveryDays.length > 0 ? 'amendDelivery' : undefined
}

export const checkOrderAwaitingSelection = (orders, now) => {
  const notifications = orders
    .filter(order => order.get('state') === 'pending' && order.get('default') === '1')
    .filter(order => moment(order.get('whenCutoff')).isSame(now, 'day'))
    .toArray()

  return notifications.length >= 1 ? 'selectOrder' : undefined
}

export const checkRafOffer = (now) => {
  const { startDate, endDate } = config.referAFriend
  const rafExpiry = moment(now).isBetween(startDate, endDate)

  return rafExpiry ? 'referAFriend' : undefined
}

export const checkSustainabilityPledge = (now) => {
  const { startDate, endDate } = config.sustainabilityPledge
  const showBanner = moment(now).isBetween(startDate, endDate)

  return showBanner ? 'sustainabilityPledge' : undefined
}

export const priority = (type = '') => {
  switch (type) {
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
