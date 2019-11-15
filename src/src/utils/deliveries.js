import moment from 'moment'
import Immutable from 'immutable' /* eslint-disable new-cap */
import GoustoException from 'utils/GoustoException'
import { getDisabledSlots, getNDDFeatureValue } from 'selectors/features'
import { formatAndValidateDisabledSlots } from 'components/BoxSummary/DeliverySlot/deliverySlotHelper'

export const deliveryTariffTypes = {
  NON_NDD: '9037a447-e11a-4960-ae69-d89a029569af',
  FREE_NDD: '823b18ef-5ca0-4a15-8f0f-4a363b319e29',
  PAID_NDD: '435191b6-0fa0-422b-a5c0-0dc1dc65d888'
}

export function getSlot(deliveryDays, date, slotId) {
  if (deliveryDays && typeof deliveryDays.getIn === 'function') {
    const deliverySlots = deliveryDays.getIn([date, 'slots'])
    if (deliverySlots) {
      let chosenSlot = deliverySlots.get(0)
      if (slotId) {
        chosenSlot = deliverySlots.find(slot => slot.get('id') === slotId)
      }

      return chosenSlot
    }
  }

  return false
}

export const getSlotTimes = ({ date, deliveryDays, slotId }) => {
  const chosenSlot = getSlot(deliveryDays, date, slotId)

  if (!chosenSlot) {
    return ''
  }

  return `${moment(`${date} ${chosenSlot.get('deliveryStartTime')}`).format('ha')} - ${moment(`${date} ${chosenSlot.get('deliveryEndTime')}`).format('ha')} `
}

function getPrevBasketDate(basket) {
  return basket.get('prevDate') || basket.get('date')
}

export function getCutoffs(basket, boxSummaryDeliveryDays) {
  const slots = []

  const date = basket.get('date')
  const slotId = basket.get('slotId')

  const currentSlot = getSlot(boxSummaryDeliveryDays, date, slotId)
  const previousSlot = getSlot(boxSummaryDeliveryDays, getPrevBasketDate(basket), basket.get('prevSlotId'))

  if (currentSlot) {
    slots.push(currentSlot.get('whenCutoff'))
  } else if (previousSlot) {
    slots.push(previousSlot.get('whenCutoff'))
  }

  if (previousSlot) {
    slots.push(previousSlot.get('whenCutoff'))
  } else if (currentSlot) {
    slots.push(currentSlot.get('whenCutoff'))
  }

  return slots
}

export function getCutoffDateTime(state) {
  const basketDate = state.basket.get('date')
  const basketSlotId = state.basket.get('slotId')

  const slot = getSlot(state.boxSummaryDeliveryDays, basketDate, basketSlotId)

  if (basketDate && slot) {
    return slot.get('whenCutoff')
  }

  return ''
}

function getLandingOrder(userOrders, deliveryDays) {
  const futureOrders = userOrders.filter(order => moment(order.get('shouldCutoffAt') || order.get('whenCutoff')).isAfter(moment()))
  const futureEmptyOrders = futureOrders.filter(order => order.get('recipeItems').size === 0)
  const futureCutoffOrders = userOrders
    .filter(order => moment(order.get('deliveryDate')).isAfter(moment()))
    .filter(order => !moment(order.get('shouldCutoffAt') || order.get('whenCutoff')).isAfter(moment()))
  const currentWeeksCutoffOrders = futureCutoffOrders.filter(order => moment(order.get('deliveryDate')).isBefore(moment().add(1, 'week')))

  let nextEmptyOrder

  if (futureEmptyOrders) {
    nextEmptyOrder = futureEmptyOrders.first()
  }

  let foundDate
  let foundSlotId
  let day

  const currentWeeksOrders = futureOrders.filter(order => moment(order.get('deliveryDate')).isBefore(moment().add(1, 'week')))
  const followingWeeksOrders = futureOrders.filter(order => moment(order.get('deliveryDate')).isAfter(moment().add(1, 'week')))

  let currentWeekOrderFilled
  if (currentWeeksOrders.size > 0) {
    currentWeekOrderFilled = currentWeeksOrders.first().get('recipeItems').size > 0
  }

  let followingWeeksOrderFilled
  if (followingWeeksOrders.size > 0) {
    followingWeeksOrderFilled = followingWeeksOrders.first().get('recipeItems').size > 0
  }

  let correspondingDay
  let order

  if (nextEmptyOrder && currentWeeksOrders.size > 0) {
    order = nextEmptyOrder
    correspondingDay = moment(order.get('deliveryDate'))
  } else if (futureOrders.size !== 0) {
    if (currentWeekOrderFilled && followingWeeksOrders.size === 0) {
      order = currentWeeksOrders.first()
      correspondingDay = moment(order.get('deliveryDate')).add(1, 'week')
    }

    if (followingWeeksOrders.size > 0 && !followingWeeksOrderFilled) {
      correspondingDay = null
    }

    if (currentWeeksOrders.size === 0 && followingWeeksOrders.size > 0) {
      order = followingWeeksOrders.first()
      correspondingDay = moment(order.get('deliveryDate')).subtract(1, 'week')
    }

    if (followingWeeksOrders.size > 0 && currentWeeksOrders.size > 0 && followingWeeksOrderFilled && currentWeekOrderFilled) {
      correspondingDay = null
    }
  }

  const defaultDay = deliveryDays.find(deliveryDay => deliveryDay.get('isDefault'))
  let defaultDayOrder
  if (defaultDay) {
    defaultDayOrder = futureOrders.find(futureOrder => moment(futureOrder.get('deliveryDate')).isSame(moment(defaultDay.get('date'))))
  }
  let disableDefault
  if (currentWeeksCutoffOrders.size > 0 && currentWeeksOrders.size === 0) {
    foundDate = null
    foundSlotId = null
    day = null
    correspondingDay = null

    if (followingWeeksOrderFilled) {
      correspondingDay = null
    }
    if (followingWeeksOrders.size > 0 && !followingWeeksOrderFilled) {
      if ((defaultDay && !defaultDayOrder) || (defaultDay && defaultDayOrder && defaultDayOrder.get('recipeItems').size === 0)) {
        disableDefault = true
        order = followingWeeksOrders.first()
        correspondingDay = moment(order.get('deliveryDate'))
      }
      if (!defaultDay) {
        order = followingWeeksOrders.first()
        correspondingDay = moment(order.get('deliveryDate'))
      }
    }
    if (followingWeeksOrders.size === 0) {
      order = currentWeeksCutoffOrders.first()
      correspondingDay = moment(order.get('deliveryDate')).add(1, 'week')
    }
  }

  if (defaultDay && !disableDefault) {
    const possibleDeliveryDays = deliveryDays.sort((a, b) => moment(a.get('date')).diff(moment(b.get('date'))))
      .filter(deliveryDay => !deliveryDay.get('alternateDeliveryDay'))
      .filter(deliveryDay => !deliveryDay.get('isDefault'))
      .filter(deliveryDay => !userOrders.some(userOrder => moment(deliveryDay.get('date')).isSame(moment(userOrder.get('deliveryDate')))))

    if (defaultDayOrder) {
      const defaultDayOrderFilled = defaultDayOrder.get('recipeItems').size > 0
      if (!correspondingDay) {
        if (defaultDayOrderFilled) {
          let deliveryDay
          const hasFilledOrdersBeforeDefaultDay =
            futureOrders.filter(futureOrder => moment(futureOrder.get('deliveryDate')).isAfter(moment(defaultDay.get('date')))).size > 0

          if (hasFilledOrdersBeforeDefaultDay) {
            deliveryDay = possibleDeliveryDays
              .filter(dd => moment(dd.get('date')).isAfter(moment(defaultDay.get('date'))))
              .sort((a, b) => moment(a.get('date')).diff(moment(b.get('date'))))
              .first()
          } else {
            deliveryDay = possibleDeliveryDays.first()
          }
          if (deliveryDay) {
            correspondingDay = moment(deliveryDay.get('date'))
          }
        }
      } else if (defaultDayOrderFilled) {
        if (!followingWeeksOrderFilled) {
          const deliveryDay = possibleDeliveryDays
            .filter(dd => moment(dd.get('date')).isAfter(moment(defaultDay.get('date'))))
            .sort((a, b) => moment(a.get('date')).diff(moment(b.get('date'))))
            .first()

          if (deliveryDay) {
            correspondingDay = moment(deliveryDay.get('date'))
          }
        }
      }
    } else {
      if (currentWeeksCutoffOrders.size > 0 && followingWeeksOrders.size === 0) {
        correspondingDay = null
      }
      if (currentWeeksCutoffOrders.size > 0 && followingWeeksOrders.size > 0 && !followingWeeksOrderFilled) {
        correspondingDay = null
      }
      if (currentWeeksOrders.size === 0 && followingWeeksOrders.size > 0) {
        correspondingDay = null
      }
    }
  }

  if (defaultDay && defaultDayOrder && defaultDayOrder.get('recipeItems').size > 0
    && followingWeeksOrders.size > 0 && !followingWeeksOrderFilled
    && currentWeeksOrders.size > 0 && currentWeekOrderFilled) {
    order = followingWeeksOrders.first()
    correspondingDay = moment(order.get('deliveryDate'))
  }

  if (order && order.get('recipeItems').size > 0 && moment(order.get('deliveryDate')).isSame(correspondingDay)) {
    correspondingDay = null
  }

  if (!correspondingDay) {
    const okDays = deliveryDays
      .filter(deliveryDay => !deliveryDay.get('alternateDeliveryDay'))
      .filter(deliveryDay => !userOrders.some(userOrder => moment(deliveryDay.get('date')).isSame(moment(userOrder.get('deliveryDate')))))

    const okDefaultDay = okDays.find(deliveryDay => deliveryDay.get('isDefault'))

    if (okDefaultDay) {
      day = okDefaultDay
      correspondingDay = moment(day.get('date'))
    } else if (defaultDay) {
      day = okDays
        .filter(deliveryDay => moment(deliveryDay.get('date')).isAfter(moment(defaultDay.get('date'))))
        .sort((a, b) => moment(a.get('date')).diff(moment(b.get('date'))))
        .first()
      if (day) {
        correspondingDay = moment(day.get('date'))
      }
    }
    if (!correspondingDay) {
      day = okDays.sort((a, b) => moment(a.get('date')).diff(moment(b.get('date')))).first()
      correspondingDay = moment(day.get('date'))
    }
  }

  if (correspondingDay) {
    day = deliveryDays.find(deliveryDay => moment(deliveryDay.get('date')).isSame(correspondingDay))
    if (day) {
      foundDate = correspondingDay.format('YYYY-MM-DD')
      let foundSlot
      if (order) {
        const coreSlotId = order.getIn(['deliverySlot', 'id'])
        foundSlot = day.get('slots').find(slot => slot.get('coreSlotId') === coreSlotId)
      }
      if (foundSlot) {
        foundSlotId = foundSlot.get('id')
      } else {
        foundSlotId = day.get('slots').first().get('id')
      }
    }
  }

  return {
    foundDate,
    foundSlotId,
    day,
  }
}

export function isDaySlotLeadTimeActive(slot) {
  // if there is no day slot lead time key, this means it's an old slot. So assume it's active.
  return slot.get('daySlotLeadTimeActive', true)
}

export function isFreeSlotAvailable(slots) {
  return slots.filter(slot => isDaySlotLeadTimeActive(slot) && slot.get('deliveryPrice', 0) == 0).size > 0
}

export function getLandingDay(state, currentSlot, cantLandOnOrderDate, deliveryDaysWithDisabledSlotIds) {
  const date = state.basket.get('date')
  const defaultDate = state.features.getIn(['default_day', 'value'])
  const deliveryDays = deliveryDaysWithDisabledSlotIds || state.boxSummaryDeliveryDays
  const userOrders = state.user.get('orders')
  const slotId = state.basket.get(currentSlot ? 'slotId' : 'prevSlotId')
  const nonValidatedDisabledSlots = getDisabledSlots(state)
  const disabledSlots = formatAndValidateDisabledSlots(nonValidatedDisabledSlots)

  // try and find the delivery day
  let day
  let foundDate
  let foundSlotId

  if (deliveryDays && deliveryDays.size > 0) {
    if (date) {
      // if we have an explicit date use that
      day = deliveryDays.find(deliveryDay => deliveryDay.get('date') === date)
    }

    // if we have user orders
    if (!day && userOrders && userOrders.size > 0) {
      if (!cantLandOnOrderDate) { // if we're allowed to land on dates with orders
        const landingOrder = getLandingOrder(userOrders, deliveryDays)
        foundDate = landingOrder.foundDate
        foundSlotId = landingOrder.foundSlotId
        day = landingOrder.day
      } else { // if we're not allowed to land on dates with orders
        let hasOrderOnSelectedDay
        if (day) {
          // check if the current date has an order on
          hasOrderOnSelectedDay = userOrders.find(order =>
            (moment(day.get('date')).isSame(moment(order.get('deliveryDate'))))
          )
        }
        // if we don't have aan explicit day set OR we do have an explicit day set and that day has orders
        if (!day || (day && hasOrderOnSelectedDay)) {
          // get the first day which doesn't have an order
          day = deliveryDays
            .sort((a, b) => moment(a.get('date')).diff(moment(b.get('date'))))
            .filter(deliveryDay => !deliveryDay.get('alternateDeliveryDay'))
            .filter(deliveryDay => !userOrders.some(order => moment(deliveryDay.get('date')).isSame(moment(order.get('deliveryDate')))))
            .first()
        }
      }
    }

    // fall back to our feature-set default date, if we have one
    if (!day && defaultDate) {
      day = deliveryDays.find(deliveryDay => deliveryDay.get('date') === defaultDate)
    }

    // if we don't have user orders or an explicit date fall back to the default date
    if (!day) {
      day = deliveryDays.find(deliveryDay => deliveryDay.get('isDefault'))
    }

    // if we have none of the above get the first one
    if (!day) {
      day = deliveryDays
        .filter(deliveryDay => !deliveryDay.get('alternateDeliveryDay'))
        .sort(
          (comparisonDay1, comparisonDay2) => {
            const diffToD1 = moment(comparisonDay1.get('date')).diff(Date.now(), 'days')
            const diffToD2 = moment(comparisonDay2.get('date')).diff(Date.now(), 'days')

            // we want to order all free slot to the begining and the rest at the end
            const day1 = diffToD1 + (isFreeSlotAvailable(comparisonDay1.get('slots', [])) ? 0 : 9999)
            const day2 = diffToD2 + (isFreeSlotAvailable(comparisonDay2.get('slots', [])) ? 0 : 9999)

            return day1 > day2 ? 1 : -1
          }
        )
        .first()
    }
  }

  if (day) {
    const alternate = day.get('alternateDeliveryDay')
    day = alternate ? deliveryDays.get(alternate.get('date')) : day
    foundDate = day.get('date')
  }

  // try and find the slot
  // if we found a day
  if (day && !foundSlotId) {
    // if we have a slot ID try and find that on the day
    if (slotId) {
      const slotDay = day.get('slots').find(slot => (
        slot.get('id') === slotId
      ))
      if (slotDay) {
        foundSlotId = slotDay.get('id')
      }
    } else {
      // try to find the default slot for that day
      let foundSlot = day.get('slots', Immutable.List([])).find(slot => {
        return (!disabledSlots || !disabledSlots.includes(slot.get('disabledSlotId'))) && slot.get('isDefault')
      })

      if (!foundSlot) {
        // otherwise choose the first non disabled slot on that day
        foundSlot = day.get('slots', Immutable.List([])).find(slot => {
          return (!disabledSlots || !disabledSlots.includes(slot.get('disabledSlotId'))) && slot
        })
      }

      if (foundSlot) {
        foundSlotId = foundSlot.get('id')
      }
    }
  }

  return {
    date: foundDate,
    slotId: foundSlotId,
  }
}

export function cutoffDateTimeNow() {
  return (
    moment()
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .add(2, 'hours')
      .toISOString()
  )
}

export function getAvailableDeliveryDays(deliveryDays, cutoffDatetimeFrom, usersOrderDaySlotLeadTimeIds = []) {
  const cutoffDatetimeFromMoment = moment(cutoffDatetimeFrom)

  if (!deliveryDays || deliveryDays instanceof Error) {
    throw new GoustoException(deliveryDays)
  }

  const availableDeliveryDays = deliveryDays
    .map(day => ({
      ...day,
      slots: day.slots.filter(slot => isDeliverySlotAvailable(slot, cutoffDatetimeFromMoment, usersOrderDaySlotLeadTimeIds))
    }))
    .filter(day => day.slots.length > 0)

  if (!availableDeliveryDays || availableDeliveryDays.length === 0) {
    throw new GoustoException('do-not-deliver')
  }

  return availableDeliveryDays.reduce((daysMap, day) => ({ ...daysMap, [day.date]: day }), {})
}

export function isDeliverySlotAvailable(slot, cutoffDatetimeFromMoment, usersOrderDaySlotLeadTimeIds) {
  return (isSlotActive(slot) || userHasOrderWithDSLT(usersOrderDaySlotLeadTimeIds, slot)) &&
    isSlotBeforeCutoffTime(slot, cutoffDatetimeFromMoment)
}

export function isSlotActive (slot) {
  return "daySlotLeadTimeActive" in slot ? slot.daySlotLeadTimeActive : true
}

export function userHasOrderWithDSLT(usersOrderDaySlotLeadTimeIds, slot) {
  return usersOrderDaySlotLeadTimeIds.indexOf(slot.daySlotLeadTimeId) > -1
}

export function isSlotBeforeCutoffTime(slot, cutoffDatetimeFromMoment) {
  return moment(slot.whenCutoff).isAfter(cutoffDatetimeFromMoment)
}

export function transformDaySlotLeadTimesToMockSlots(daysWithDSLTs) {
  if (!daysWithDSLTs || daysWithDSLTs instanceof Error) {
    throw new GoustoException(daysWithDSLTs)
  }

  return daysWithDSLTs.map(dayWithDSLTs => {
    const { id, date, isDefault, coreDayId, unavailableReason, alternateDeliveryDay } = dayWithDSLTs

    return {
      id,
      date,
      isDefault,
      coreDayId,
      unavailableReason,
      alternateDeliveryDay,
      slots: dayWithDSLTs.daySlotLeadTimes.map(dslt => ({
        whenCutoff: dslt.shouldCutoffAt,
        deliveryEndTime: dslt.endTime,
        deliveryPrice: dslt.deliveryPrice,
        isDefault: dslt.isSlotDefault,
        coreSlotId: dslt.coreSlotId,
        deliveryStartTime: dslt.startTime,
        id: dslt.slotId,
        daySlotLeadTimeId: dslt.id,
        daySlotLeadTimeActive: dslt.active
        // fields not available in current DSLT and not used in webclient:
        // - cutoffTime
        // - cutoffDay
        // - defaultDay
      }))
    }
  })
}

// Used both when users first arrive on the site and do not have a delivery_tariff_id
// and by returning users with a delivery_tariff_id
export function getDeliveryTariffId(user, nddExperimentVal) {
  const validTariffTypes = Object.values(deliveryTariffTypes)
  // If the user has a delivery tariff, use it - otherwise use experiment value.
  const deliveryTariffId = (user && user.get('deliveryTariffId')) ? user.get('deliveryTariffId') : nddExperimentVal

  // This acts a fallback in case optimisely isn't running and the user doesn't have a persisted delivery tariff ID.
  return validTariffTypes.includes(deliveryTariffId) ? deliveryTariffId : deliveryTariffTypes.NON_NDD
}

// Used to determine whether to show and use NDD features for a new user without a delivery_tariff_id
// or returning users with a delivery_tariff_id
export function getNDDFeatureFlagVal(state) {
  const { user } = state
  const nddExperimentVal = getNDDFeatureValue(state)
  const deliveryTariffId = getDeliveryTariffId(user, nddExperimentVal)

  return (deliveryTariffId !== deliveryTariffTypes['NON_NDD'])
}
