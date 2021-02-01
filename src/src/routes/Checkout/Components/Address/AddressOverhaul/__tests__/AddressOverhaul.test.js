import React from 'react'
import { shallow } from 'enzyme'
import { AddressOverhaul } from '../AddressOverhaul'

describe('Given AddressOverhaul', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddressOverhaul />)
  })

  describe('When component is mounted', () => {
    test('Then should be rendered correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.find('Postcode').exists()).toBeTruthy()
      expect(wrapper.find('.enterAddressManually').exists()).toBeTruthy()
    })
  })

  describe('When address is selected and "edit address" is not clicked', () => {
    beforeEach(() => {
      wrapper.setProps({
        isAddressSelected: true
      })
    })

    test('Then should render DeliveryCard component', () => {
      expect(wrapper.find('DeliveryCard').exists()).toBeTruthy()
    })
  })

  describe('When "edit address" is clicked', () => {
    beforeEach(() => {
      wrapper.find('.editAddressLink').simulate('click')
    })

    test('Then should not render DeliveryCard component', () => {
      expect(wrapper.find('DeliveryCard').exists()).toBeFalsy()
    })

    test('Then isEditAddressClicked state should be true', () => {
      expect(wrapper.state('isEditAddressClicked')).toBeTruthy()
    })

    test('Then should not render AddressInputs component', () => {
      expect(wrapper.find('AddressInputs').exists()).toBeTruthy()
    })
  })

  describe('When notFound props is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        notFound: false
      })
    })

    test('Then should render div with enterAddressManually class', () => {
      expect(wrapper.find('.enterAddressManually').exists()).toBeTruthy()
    })

    describe('And user clicks on "Enter address manually"', () => {
      const onEnterAddressManuallyClick = jest.fn()

      beforeEach(() => {
        wrapper.setProps({
          onEnterAddressManuallyClick
        })
        wrapper.find('.editAddressLink').simulate('click')
      })

      test('Then isEditAddressClicked state should be true', () => {
        expect(wrapper.state('isEditAddressClicked')).toBeTruthy()
      })

      test('Then onEnterAddressManuallyClick should be called', () => {
        expect(onEnterAddressManuallyClick).toHaveBeenCalled()
      })
    })
  })
})
