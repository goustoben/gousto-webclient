import moment from 'moment'

import { getUserOrderDeliverySlotId } from 'selectors/user'
import {
  getSlotDisabledSlotId,
  getSlotCoreSlotId,
  getSlotDeliveryStartTime,
  getSlotDeliveryEndTime,
  getSlotDeliveryPrice,
} from 'selectors/boxSummary'

import { formatDeliveryTime } from './deliverySlot'
import { getLandingDay } from './deliveries'

export const addDisabledSlotIds = deliveryDays => (
  deliveryDays.map(deliveryDay => {
    const date = deliveryDay.get('date')
    const slots = deliveryDay.get('slots')

    const formattedSlots = slots.map(slot => {
      const deliveryStartTime = slot.get('deliveryStartTime')
      const deliveryEndTime = slot.get('deliveryEndTime')

      let disabledSlotId = ''
      if (deliveryStartTime && deliveryEndTime) {
        const slotStartTime = deliveryStartTime.substring(0, 2)
        const slotEndTime = deliveryEndTime.substring(0, 2)
        disabledSlotId = `${date}_${slotStartTime}-${slotEndTime}`
      }

      return slot.set('disabledSlotId', disabledSlotId)
    })

    return deliveryDay.set('slots', formattedSlots)
  })
)

export const formatAndValidateDisabledSlots = (disabledSlots = '') => {
  // date_slotStartTime-slotEndTime
  // 05-02-2019_08-19

  if (typeof disabledSlots !== 'string') {
    return []
  }

  const validFormat = /\d{4}-([0-][0-9]|(1)[0-2])-([0-2][0-9]|(3)[0-1])_([0-1][0-9]|(2)[0-4])-([0-1][0-9]|(2)[0-4])/

  return disabledSlots
    .split(/,\s+|\s+,|,/)
    .filter((slot) => slot.match(validFormat))
}

export const getTempDeliveryOptions = (state) => {
  const deliveryDays = addDisabledSlotIds(state.boxSummaryDeliveryDays)
  const canLandOnOrder = state.features.getIn(['landingOrder', 'value'], false)

  const landing = getLandingDay(
    state,
    true,
    !canLandOnOrder,
    deliveryDays,
    false
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const tempOrderId = state.temp.get('orderId', landing.orderId)

  return { deliveryDays, tempDate, tempSlotId, tempOrderId }
}

export const isDisabledSlotsApplicable = (isAuthenticated, isSubscriptionActive, isSubscriberDisabledSlotsEnabled) => {
  // Disabled slots are applicable to logout user
  if (!isAuthenticated) {
    return true
  }

  // Disabled slots are applicable to transactional user & subscribed if flag is active
  return isAuthenticated && (isSubscriptionActive === 'inactive' || isSubscriberDisabledSlotsEnabled)
}

export const getSlotProps = ({
  slot,
  disabledSlots,
  userOrder,
  isAuthenticated,
  isSubscriptionActive,
  isSubscriberDisabledSlotsEnabled,
  tempDate,
}) => {
  const isSlotDisabled = !!(disabledSlots && disabledSlots.includes(getSlotDisabledSlotId({ slot })))
  const coreSlotId = getSlotCoreSlotId({ slot })
  const hasOrderForSlot = userOrder && (getUserOrderDeliverySlotId({ userOrder }) === coreSlotId)
  const deliveryPrice = getSlotDeliveryPrice({ slot })
  const label = formatDeliveryTime(getSlotDeliveryStartTime({ slot }), getSlotDeliveryEndTime({ slot }), tempDate)
  const subLabel = (deliveryPrice === '0.00') ? 'Free' : `£${deliveryPrice}`

  return {
    label,
    subLabel,
    value: slot.get('id'),
    coreSlotId,
    disabled:
      isSlotDisabled
      && isDisabledSlotsApplicable(
        isAuthenticated,
        isSubscriptionActive,
        (isSubscriberDisabledSlotsEnabled && !hasOrderForSlot)
      )
  }
}

export const getDeliveryDaysAndSlots = (newDate, props, isSubscriberDisabledSlotsEnabled) => {
  const slots = {}
  const {
    disabledSlots,
    isAuthenticated, isSubscriptionActive,
    tempDate, userOrders,
    tempSlotId, deliveryDaysProps
  } = props
  let hasOrders = false
  let hasFullOrders = false
  let hasEmptyOrders = false
  let subLabelClassName = ''

  const deliveryDaysData = deliveryDaysProps && deliveryDaysProps.map(deliveryDay => {
    const date = deliveryDay.get('date')

    const orderIds = userOrders.toArray().filter(order => (
      moment(date).isSame(moment(order.get('deliveryDate'))))
    ).map(order => order.get('id'))

    const hasOrdersToday = orderIds.length > 0

    let icon = hasOrdersToday ? 'full-box' : ''
    let userOrder
    const orderId = hasOrdersToday ? orderIds[0] : ''

    if (orderId) {
      userOrder = userOrders.find(order => order.get('id') === orderId)
      const recipeItemsSize = userOrder.get('recipeItems').size
      hasFullOrders = recipeItemsSize > 0
      icon = recipeItemsSize === 0 ? 'empty-box' : icon
      hasEmptyOrders = recipeItemsSize === 0
    }

    if (orderIds.length > 0) {
      hasOrders = true
    }

    slots[date] = deliveryDay.get('slots').map(slot => getSlotProps({
      slot,
      disabledSlots,
      userOrder,
      isAuthenticated,
      isSubscriptionActive,
      isSubscriberDisabledSlotsEnabled,
      tempDate,
    })).toArray()

    // disabled if either are true:
    // * delivery day has an alternate delivery day
    // * all slots on the delivery day are disabled AND user is not authenticated (due to a business decision to treat signup differently than transactional customers)
    let disabled = deliveryDay.get('alternateDeliveryDay') !== null || (slots[date] && slots[date].every(slot => slot.disabled) && !isAuthenticated)
    let legacyData = {}

    if (!isAuthenticated) {
      subLabelClassName = (hasOrdersToday) ? 'boxIcon' : ''
      legacyData = { label: moment(date).format('ddd D MMM'), ordered: hasOrdersToday }
      disabled = disabled || hasOrdersToday
    }

    return {
      ...legacyData,
      date,
      value: date,
      disabled,
      icon,
      orderId,
      orderEmpty: hasEmptyOrders,
    }
  })

  const deliveryDays = deliveryDaysData && deliveryDaysData.toArray().sort((a, b) => moment.utc(a.value).diff(moment.utc(b.value)))

  let chosen
  let hasActiveSlotsForSelectedDate = true
  if (slots[newDate]) {
    hasActiveSlotsForSelectedDate = slots[newDate].some(slot => !slot.disabled)
    const slot = slots[newDate].filter(sl => sl.value === tempSlotId)
    chosen = slot.length > 0
  }

  return {
    slots,
    deliveryDays,
    chosen,
    hasOrders,
    hasEmptyOrders,
    hasFullOrders,
    subLabelClassName,
    hasActiveSlotsForSelectedDate,
  }
}
