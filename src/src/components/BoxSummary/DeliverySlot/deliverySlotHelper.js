export const addDisabledSlotIds = deliveryDays => (
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

export const formatAndValidateDisabledSlots = (disabledSlots = '') => {
  //date_slotStartTime-slotEndTime
  //2019-05-02_08-19
  const validFormat = /\d{4}-([0-][0-9]|(1)[0-2])-([0-2][0-9]|(3)[0-1])_([0-1][0-9]|(2)[0-4])-([0-1][0-9]|(2)[0-4])/

  return disabledSlots
    .split(/,\s+|\s+,|,/)
    .filter((slot) => slot.match(validFormat))

}
