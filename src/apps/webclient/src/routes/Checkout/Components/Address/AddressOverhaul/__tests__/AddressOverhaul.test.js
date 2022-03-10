import React from 'react'
import { shallow } from 'enzyme'
import { AddressOverhaul } from '../AddressOverhaul'

describe('Given AddressOverhaul', () => {
  let wrapper
  const onEnterAddressManuallyClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <AddressOverhaul
        isEditingManually={false}
        onEnterAddressManuallyClick={onEnterAddressManuallyClick}
      />
    )
  })

  describe('When component is mounted', () => {
    test('Then should be rendered correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
      expect(wrapper.find('Postcode').exists()).toBeTruthy()
      expect(wrapper.find('.enterAddressManually').exists()).toBeTruthy()
      expect(wrapper.find('AddressInputs').exists()).toBeFalsy()
    })
  })

  describe('When address is selected', () => {
    beforeEach(() => {
      wrapper.setProps({
        isAddressSelected: true,
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

    test('Then onEnterAddressManuallyClick should be called', () => {
      expect(onEnterAddressManuallyClick).toHaveBeenCalled()
    })
  })

  describe('When isEditingManually prop is not set', () => {
    beforeEach(() => {
      wrapper.setProps({
        isEditingManually: false,
      })
    })

    test('Then should render div with enterAddressManually class', () => {
      expect(wrapper.find('.enterAddressManually').exists()).toBeTruthy()
    })

    describe('And user clicks on "Enter address manually"', () => {
      beforeEach(() => {
        wrapper.setProps({
          onEnterAddressManuallyClick,
        })
        wrapper.find('.editAddressLink').simulate('click')
      })

      test('Then onEnterAddressManuallyClick should be called', () => {
        expect(onEnterAddressManuallyClick).toHaveBeenCalled()
      })
    })
  })

  describe('When isEditingManually prop is set', () => {
    beforeEach(() => {
      wrapper.setProps({
        isEditingManually: true,
      })
    })

    test('Then should show the address inputs', () => {
      expect(wrapper.find('AddressInputs').exists()).toBeTruthy()
    })
  })
})
