const formatDateAndSlot = (deliveryDays) => {
  return deliveryDays.map(deliveryDay => {
    const date = deliveryDay.get('date')
    const slots = deliveryDay.get('slots')

    const newSlots = slots.map((slot) => {
      const deliveryEndTime = slot.get('deliveryEndTime')
      const slotEndTime = deliveryEndTime && deliveryEndTime.substring(0, 2)
      const dateAndSlotCombined = `${date}_${slotEndTime}`

      return slot.set('dateAndSlotCombined', dateAndSlotCombined)
    })

    return deliveryDay.set('slots', newSlots)
  })
}

export {formatDateAndSlot}
