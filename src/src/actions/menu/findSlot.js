export function findSlot(deliveryDays, coreSlotId) {
  let slotId
  deliveryDays.some(deliveryDay => {
    const matchedSlot = deliveryDay.get('slots').find(slot => {
      if (String(slot.get('coreSlotId')) === String(coreSlotId)) {
        return true
      }

      return false
    })

    if (matchedSlot) {
      slotId = matchedSlot.get('id')

      return true
    }

    return false
  })

  return slotId
}
