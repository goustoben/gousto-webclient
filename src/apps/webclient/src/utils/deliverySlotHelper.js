import moment from 'moment'

import { createDisabledSlotId } from 'routes/Menu/selectors/boxSummary'
import { formatDeliveryTime } from './deliverySlot'
import { getLandingDay } from './deliveries'
// eslint-disable-next-line import/no-unresolved
import { formatDeliveryPrice } from './deliveryPrice'

/**
 * `addDisabledSlotIds` uses `set` so it will change
 * the resource provided to it and add the key `disabledSlotId`.
 */
// TODO: move to selector folder.
export const addDisabledSlotIds = deliveryDays => (
  deliveryDays.map(deliveryDay => {
    const date = deliveryDay.get('date')
    const slots = deliveryDay.get('slots')

    const formattedSlots = slots.map(slot => slot.set('disabledSlotId', createDisabledSlotId(slot, date)))

    return deliveryDay.set('slots', formattedSlots)
  })
)

// This method is never tested.
export const getTempDeliveryOptions = (state) => {
  const deliveryDays = addDisabledSlotIds(state.boxSummaryDeliveryDays)

  const landing = getLandingDay(
    state,
    {
      useCurrentSlot: true,
      useBasketDate: false
    }
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const tempOrderId = state.temp.get('orderId')

  return { deliveryDays, tempDate, tempSlotId, tempOrderId }
}

export const getDeliveryDaysAndSlots = (newDate, props) => {
  const slots = {}
  const {
    disabledSlots,
    isAuthenticated,
    tempDate, userOrders,
    tempSlotId, deliveryDaysProps
  } = props
  let hasOrders = false
  let hasFullOrders = false
  let hasEmptyOrders = false
  let subLabelClassName = ''

  const deliveryDaysData = deliveryDaysProps && deliveryDaysProps.map(deliveryDay => {
    const date = deliveryDay.get('date')
    slots[date] = deliveryDay.get('slots').map(slot => {
      const isSlotDisabled = !!(disabledSlots && disabledSlots.includes(slot.get('disabledSlotId')))

      return {
        label: formatDeliveryTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
        subLabel: isAuthenticated ? formatDeliveryPrice(slot.get('deliveryPrice')) : '',
        value: slot.get('id'),
        coreSlotId: slot.get('coreSlotId'),
        disabled: isSlotDisabled,
      }
    }).toArray()

    const orderIds = userOrders.toArray().filter(order => (
      moment(date).isSame(moment(order.get('deliveryDate'))))
    ).map(order => order.get('id'))

    const hasOrdersToday = orderIds.length > 0

    let icon = hasOrdersToday ? 'full-box' : ''
    const orderId = hasOrdersToday ? orderIds[0] : ''

    if (orderId) {
      const recipeItemsSize = userOrders.find(order => order.get('id') === orderId).get('recipeItems').size
      hasFullOrders = recipeItemsSize > 0
      icon = recipeItemsSize === 0 ? 'empty-box' : icon
      hasEmptyOrders = recipeItemsSize === 0
    }

    if (orderIds.length > 0) {
      hasOrders = true
    }

    // disabled if either are true:
    // * delivery day has an alternate delivery day
    // * all slots on the delivery day are disabled AND user is not authenticated (due to a business decision to treat signup differently than transactional customers)
    let disabled = deliveryDay.get('alternateDeliveryDay') !== null || (slots[date] && slots[date].every(slot => slot.disabled))
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
      orderId
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
