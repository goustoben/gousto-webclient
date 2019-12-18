import moment from 'moment'
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
  //date_slotStartTime-slotEndTime
  //05-02-2019_08-19

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
    deliveryDays
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const tempOrderId = state.temp.get('orderId', landing.orderId)

  return { deliveryDays, tempDate, tempSlotId, tempOrderId }
}

export const getDeliveryDaysAndSlots = (newDate, props) => {
  const slots = {}
  const {
    disabledSlots,
    isAuthenticated, isSubscriptionActive, tempDate, userOrders,
    disableNewDatePicker, tempSlotId, deliveryDays: deliveryDaysFromProps
  } = props
  let hasOrders = false
  let hasFullOrders = false
  let hasEmptyOrders = false
  let subLabelClassName = ''

  const deliveryDaysData = deliveryDaysFromProps.map(deliveryDay => {
    const date = deliveryDay.get('date')
    slots[date] = deliveryDay.get('slots').map(slot => {
      // TODO: Write tests for the isSlotDisabled logic below
      const isSlotDisabled = disabledSlots && disabledSlots.includes(slot.get('disabledSlotId')) ? true : false

      return {
        label: formatDeliveryTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
        subLabel: (slot.get('deliveryPrice') === '0.00') ? 'Free' : `£${slot.get('deliveryPrice')}`,
        value: slot.get('id'),
        coreSlotId: slot.get('coreSlotId'),
        disabled: isSlotDisabled && isAuthenticated && isSubscriptionActive === 'inactive'
      }
    }).toArray()

    const orderIds = userOrders.toArray().filter(order => (
      moment(date).isSame(moment(order.get('deliveryDate'))))
    ).map(order => order.get('id'))

    const hasOrdersToday = orderIds.length > 0
    let icon = hasOrdersToday > 0 ? 'full-box' : ''
    const orderId = hasOrdersToday > 0 ? orderIds[0] : ''

    if (orderId) {
      const recipeItemsSize = userOrders.find(order => order.get('id') === orderId).get('recipeItems').size
      hasFullOrders = recipeItemsSize > 0
      icon = recipeItemsSize === 0 ? 'empty-box' : ''
      hasEmptyOrders = recipeItemsSize === 0
    }

    if (orderIds.length > 0) {
      hasOrders = true
    }

    let disabled = deliveryDay.get('alternateDeliveryDay') !== null
    let legacyData = {}

    if (disableNewDatePicker) {
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

  const deliveryDays = deliveryDaysData.toArray().sort((a, b) => moment.utc(a.value).diff(moment.utc(b.value)))

  let chosen
  if (slots[newDate]) {
    const slot = slots[newDate].filter(sl => sl.value === tempSlotId)
    chosen = slot.length > 0
  }

  return { slots, deliveryDays, chosen, hasOrders, hasEmptyOrders, hasFullOrders, subLabelClassName }
}
