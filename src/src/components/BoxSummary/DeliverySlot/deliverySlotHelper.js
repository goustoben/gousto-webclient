import moment from 'moment'

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate) => (
  `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${tempDate} ${deliveryEndTime}`).format('ha')} `
)

const deliverySlotHelper = (dd, blockedDateString, date, isAuthenticated, isSubscriptionActive, tempDate) => {
  return dd.get('slots').map(slot => {
    let isSlotBlocked = false
    blockedDateString.map(dateToBlock => {
              
      const blockedDate = dateToBlock.slice(0, 10)
      const blockedSlotNumber = dateToBlock.slice(-2)
      const slotEndTime = slot.get('deliveryEndTime').substring(0, 2)
      if (date === blockedDate) {
        if (slotEndTime === blockedSlotNumber) {
          isSlotBlocked = true
        }
      }
    })
    
    return {
      label: formatTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
      subLabel: (slot.get('deliveryPrice') === '0.00') ? 'Free' : `£${slot.get('deliveryPrice')}`,
      value: slot.get('id'),
      coreSlotId: slot.get('coreSlotId'), 
      disabled: isSlotBlocked && isAuthenticated && isSubscriptionActive === 'inactive'
    }
  }).toArray()
} 

export {deliverySlotHelper}
