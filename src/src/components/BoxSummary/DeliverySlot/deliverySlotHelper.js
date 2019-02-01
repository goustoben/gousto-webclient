const formatDateAndSlot = (deliveryDays) => {
  return deliveryDays.map(dd => {
    const date = dd.get('date')
    const slots = dd.get('slots')

    const newSlots = slots.map((slot) => {
      const slotEndTime = slot.get('deliveryEndTime').substring(0, 2)
      const dateAndSlotCombined = `${date}_${slotEndTime}`

      return slot.set('dateAndSlotCombined', dateAndSlotCombined)
    })

    return dd.set('slots', newSlots)
  })
}

export {formatDateAndSlot}
