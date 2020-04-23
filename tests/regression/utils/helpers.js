export const updateDatesForDeliveryOptions = (deliveries) => {
  const today = new Date()
  for (let i = 0; i < deliveries.data.length; i++) {
    const whenCutOff = Cypress.moment(today).add(i, 'days').toISOString()
    const newSlotDay = Cypress.moment(today).add(i + 3, 'days')
    deliveries.data[i].date = Cypress.moment(newSlotDay).format('YYYY-MM-DD')
    deliveries.data[i].slots[0].when_cutoff = whenCutOff
    deliveries.data[i].day_slots[0].when_cutoff = whenCutOff
  }

  return deliveries
}
