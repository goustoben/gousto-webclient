const addDisabledSlotIds = deliveryDays => (
  deliveryDays.map(deliveryDay => {
    const date = deliveryDay.get('date')
    const slots = deliveryDay.get('slots')

    const formattedSlots = slots.map(slot => {
      const deliveryStartTime = slot.get('deliveryStartTime')
      const deliveryEndTime = slot.get('deliveryEndTime')

      let disabledSlotId = ''
      if( deliveryStartTime && deliveryEndTime) {
        const slotStartTime = deliveryStartTime.substring(0, 2)
        const slotEndTime = deliveryEndTime.substring(0, 2)
        disabledSlotId = `${date}_${slotStartTime}-${slotEndTime}`
      }

      return slot.set('disabledSlotId', disabledSlotId)
    })

    return deliveryDay.set('slots', formattedSlots)
  })
)

export { addDisabledSlotIds }
