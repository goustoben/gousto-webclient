import React from 'react'
import { shallow, mount } from 'enzyme'
import DeliverySlot from 'BoxSummary/DeliverySlot/DeliverySlot.js'
import Immutable from 'immutable'

describe('DeliverySlot logic', () => {
  // const deliveryDay
  // const slots

  const deliveryDays = Immutable.List([Immutable.Map({date: "2019-03-03", id: "djhdhds", slots: Immutable.List([Immutable.Map({
    deliveryStartTime: "08:00:00",
    deliveryEndTime: "19:00:00",
    id: "123sddrdfst456",
    dateAndSlotCombined: '2019-03-03_08-19'
  })])})])
  const limitedAvailabilitySlots = ['2019-03-03_08-19', '2019-02-04_08-12']
  const isAuthenticated = true
  const isSubscriptionActive = 'inactive'
  const wrapper = shallow(<DeliverySlot deliveryDays={deliveryDays} limitedAvailabilitySlots={limitedAvailabilitySlots} isAuthenticated={isAuthenticated} isSubscriptionActive={isSubscriptionActive} />)

  describe('getDeliveryDaysAndSlots', () => {
    test('returns slots object with a disabled property', () => { 
      const result = wrapper.instance().getDeliveryDaysAndSlots()
      const date = '2019-03-03'
      expect(result.slots[date][0].disabled).toEqual(true)
    })
  })
  
  describe('Render Function', () => {
    
    test('shows correct address name', () => { 

    })
  
    test('if logged in show new date picker', () => {

    })

    test('if logged out shows old date picker', () => {
    })

    test('show limited availability callout if on a day with disabled slots, and customer is logged in and a transactional customer', () => {
    })
  })
})
