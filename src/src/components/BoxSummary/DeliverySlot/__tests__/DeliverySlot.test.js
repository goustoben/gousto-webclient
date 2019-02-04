import React from 'react'
import { shallow, mount } from 'enzyme'
import DeliverySlot from 'BoxSummary/DeliverySlot/DeliverySlot.js'
import Immutable from 'immutable'

describe('DeliverySlot logic', () => {
  let deliveryDays, wrapper, limitedAvailabilitySlots, isAuthenticated, isSubscriptionActive

  beforeEach(() => {
    deliveryDays = Immutable.List([
      Immutable.Map({
        date: "2019-03-03", 
        id: "djhdhds", 
        slots: Immutable.List([
          Immutable.Map({
            deliveryStartTime: "08:00:00", 
            deliveryEndTime: "19:00:00",
            id: "123sddrdfst456",
            dateAndSlotCombined: '2019-03-03_08-19'
          }),
          Immutable.Map({
            deliveryStartTime: "18:00:00", 
            deliveryEndTime: "22:00:00",
            id: "987sddrdfst456",
            dateAndSlotCombined: '2019-03-03_18-22'
          })
        ])
      })
    ])
    limitedAvailabilitySlots = ['2019-03-03_08-19', '2019-02-04_08-12']
    isAuthenticated = true
    isSubscriptionActive = 'inactive'

  })

  describe('getDeliveryDaysAndSlots', () => {
    test('should return a disabled slot when slot is in disabled list, user logged in and subscription paused', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
        />) 
      const result = wrapper.instance().getDeliveryDaysAndSlots()
      const dateToCheck = '2019-03-03'
      const slotToCheck = result.slots[dateToCheck][0]
      expect(slotToCheck.disabled).toEqual(true)
    })

    test('should NOT return a disabled slot when slot is in disabled list, user logged in but subscription is ACTIVE', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={'active'} 
        />) 
      const result = wrapper.instance().getDeliveryDaysAndSlots()
      const dateToCheck = '2019-03-03'
      const slotToCheck = result.slots[dateToCheck][0]
      expect(slotToCheck.disabled).toEqual(false)
    })
    
    test('should NOT return a disabled slot when slot is in disabled list but user NOT logged in', () => { 
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={false} 
          isSubscriptionActive={isSubscriptionActive} 
        />) 
      const result = wrapper.instance().getDeliveryDaysAndSlots()
      const dateToCheck = '2019-03-03'
      const slotToCheck = result.slots[dateToCheck][0]
      expect(slotToCheck.disabled).toEqual(false)
    })
    
    test('should NOT return a disabled slot when slot is NOT in disabled list', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
        />) 
      const result = wrapper.instance().getDeliveryDaysAndSlots()
      const dateToCheck = '2019-03-03'
      const slotToCheck = result.slots[dateToCheck][1]
      expect(slotToCheck.disabled).toEqual(false)
    })
  })
  
  describe('handleDateChange', () => {
    test('should call setTempSlotId with the first slot in deliveryDays when first slot is not disabled', () => { 
      let tempSlotIdSpy = jest.fn()
      let tempDateSpy = jest.fn()
      let tempOrderIdSpy = jest.fn()
      limitedAvailabilitySlots=[]

      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
          setTempSlotId={tempSlotIdSpy}
          setTempDate={tempDateSpy}
          setTempOrderId={tempOrderIdSpy}
        />) 
      wrapper.instance().handleDateChange('2019-03-03')
      expect(tempSlotIdSpy).toHaveBeenCalledWith('123sddrdfst456')
    })
    
    test('should call setTempSlotId with the second slot in deliveryDays when first slot is disabled', () => { 
      let tempSlotIdSpy = jest.fn()
      let tempDateSpy = jest.fn()
      let tempOrderIdSpy = jest.fn()

      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
          setTempSlotId={tempSlotIdSpy}
          setTempDate={tempDateSpy}
          setTempOrderId={tempOrderIdSpy}
        />) 
      wrapper.instance().handleDateChange('2019-03-03')
      expect(tempSlotIdSpy).toHaveBeenCalledWith('987sddrdfst456')
    })
   
    test('should call setTempSlotId passing undefined when all slots are disabled', () => { 
      let tempSlotIdSpy = jest.fn()
      let tempDateSpy = jest.fn()
      let tempOrderIdSpy = jest.fn()
      limitedAvailabilitySlots = ['2019-03-03_08-19', '2019-03-03_18-22']

      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
          setTempSlotId={tempSlotIdSpy}
          setTempDate={tempDateSpy}
          setTempOrderId={tempOrderIdSpy}
        />) 
      wrapper.instance().handleDateChange('2019-03-03')
      expect(tempSlotIdSpy).toHaveBeenCalledWith(undefined)
    })
  })
  
  describe('Render Function', () => {
    test('should show limited availability text when doesDateHaveDisabledSlots is true, user is logged in and subscription is inactive', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={isSubscriptionActive} 
          tempDate='2019-03-03'
        />) 
      expect(wrapper.find('.limitedAvailabilityText').text()).toContain('Unavailable due to high demand')
    })
    
    test('should NOT show limited availability text when doesDateHaveDisabledSlots is true, user is logged in but subscription is ACTIVE', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={isAuthenticated} 
          isSubscriptionActive={'active'} 
          tempDate='2019-03-03'
        />) 
      expect(wrapper.find('.limitedAvailabilityText').length).toEqual(0)
    })
    
    test('should NOT show limited availability text when doesDateHaveDisabledSlots is true but user is NOT logged in', () => {
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={false} 
          isSubscriptionActive={isSubscriptionActive} 
          tempDate='2019-03-03'
        />) 
      expect(wrapper.find('.limitedAvailabilityText').length).toEqual(0)
    })
    
    test('should NOT show limited availability text when doesDateHaveDisabledSlots is false', () => {
      limitedAvailabilitySlots = []
      
      wrapper = shallow(
        <DeliverySlot 
          deliveryDays={deliveryDays} 
          limitedAvailabilitySlots={limitedAvailabilitySlots} 
          isAuthenticated={false} 
          isSubscriptionActive={isSubscriptionActive} 
          tempDate='2019-03-03'
        />) 
      expect(wrapper.find('.limitedAvailabilityText').length).toEqual(0)
    })
  })
})
