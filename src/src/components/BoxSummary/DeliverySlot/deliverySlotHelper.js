import moment from 'moment'

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate) => (
  `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${tempDate} ${deliveryEndTime}`).format('ha')} `
)

const deliverySlotHelper = (dd, blockedDateString, date, isAuthenticated, isSubscriptionActive, tempDate) => {

  return dd.get('slots').map(slot => {

    const isSlotBlocked = blockedDateString.includes(slot.get('dateAndSlotFormat')) ? true : false
 
    return {
      label: formatTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
      subLabel: (slot.get('deliveryPrice') === '0.00') ? 'Free' : `£${slot.get('deliveryPrice')}`,
      value: slot.get('id'),
      coreSlotId: slot.get('coreSlotId'), 
      disabled: isSlotBlocked && isAuthenticated && isSubscriptionActive === 'inactive'
    }
  }).toArray()
} 

const formatDateAndSlot = (deliveryDays) => {
  const result = deliveryDays.map(dd => {
    const date = dd.get('date')
    const slots = dd.get('slots')

    const newSlots = slots.map((slot) => {
      const slotEndTime = slot.get('deliveryEndTime').substring(0, 2)
      const dateAndSlotFormat = `${date}_${slotEndTime}`
      const newSlot = slot.set('dateAndSlotFormat', dateAndSlotFormat)

      return newSlot
    })

    const newDD = dd.set('slots', newSlots)

    return newDD
  })

  return result
}

export {deliverySlotHelper, formatDateAndSlot}
