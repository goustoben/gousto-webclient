import React from 'react'
import { shallow } from 'enzyme'
import { DeliverySupportingText } from '../DeliverySupportingText'

describe('DeliverySupportingText', () => {
  let hasEmptyOrders
  let hasFullOrders
  let doesDateHaveDisabledSlots
  let showWarning
  let tempDate
  let wrapper

  describe('when showWarning is true', () => {
    beforeEach(() => {
      hasEmptyOrders = false
      hasFullOrders = false
      doesDateHaveDisabledSlots = false
      showWarning = true
      tempDate = '2019-12-17'
      wrapper = shallow(<DeliverySupportingText
        hasEmptyOrders={hasEmptyOrders}
        hasFullOrders={hasFullOrders}
        doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
        showWarning={showWarning}
        tempDate={tempDate}
      />)
    })
    test('should show warning text', () => {
      expect(wrapper.find('WarningExistingOrder').exists()).toBe(true)
    })
  })

  describe('when showWarning is false ', () => {
    beforeEach(() => {
      hasEmptyOrders = false
      hasFullOrders = false
      doesDateHaveDisabledSlots = false
      showWarning = false
      tempDate = '2019-12-17'
      wrapper = shallow(<DeliverySupportingText
        hasEmptyOrders={hasEmptyOrders}
        hasFullOrders={hasFullOrders}
        doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
        showWarning={showWarning}
        tempDate={tempDate}
      />)
    })

    describe('when hasFullOrders is false', () => {
      test('should show default delivery copy text', () => {
        expect(wrapper.text()).toEqual('You choose how often you would like to receive boxes after checkout.')
      })
    })

    describe('when hasFullOrders is true', () => {
      beforeEach(() => {
        hasEmptyOrders = false
        hasFullOrders = true
        doesDateHaveDisabledSlots = false
        showWarning = false
        tempDate = '2019-12-17'
        wrapper = shallow(<DeliverySupportingText
          hasEmptyOrders={hasEmptyOrders}
          hasFullOrders={hasFullOrders}
          doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
          showWarning={showWarning}
          tempDate={tempDate}
        />)
      })
      test('should show Upcoming delivery delivery copy text', () => {
        expect(wrapper.text()).toContain('Upcoming delivery – recipes chosen')
      })
    })

    describe('when hasEmptyOrders is true', () => {
      beforeEach(() => {
        hasEmptyOrders = true
        hasFullOrders = false
        doesDateHaveDisabledSlots = false
        showWarning = false
        tempDate = '2019-12-17'
        wrapper = shallow(<DeliverySupportingText
          hasEmptyOrders={hasEmptyOrders}
          hasFullOrders={hasFullOrders}
          doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
          showWarning={showWarning}
          tempDate={tempDate}
        />)
      })
      test('should show default delivery copy text', () => {
        expect(wrapper.text()).toContain('Upcoming delivery – recipes not chosen')
      })
    })
  })

  describe('when doesDateHaveDisabledSlots is true', () => {
    beforeEach(() => {
      hasEmptyOrders = false
      hasFullOrders = false
      doesDateHaveDisabledSlots = true
      showWarning = false
      tempDate = '2019-12-17'
      wrapper = shallow(<DeliverySupportingText
        hasEmptyOrders={hasEmptyOrders}
        hasFullOrders={hasFullOrders}
        doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
        showWarning={showWarning}
        tempDate={tempDate}
      />)
    })
    test('should return high demand copy', () => {
      expect(wrapper.text()).toContain('Unavailable due to high demand')
    })
  })
})
