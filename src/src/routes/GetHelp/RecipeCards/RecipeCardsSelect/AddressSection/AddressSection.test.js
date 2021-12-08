import React from 'react'
import { mount } from 'enzyme'
import actual from 'actual'
import { AddressSection } from './AddressSection'

jest.mock('actual', () => jest.fn())

jest.mock('goustouicomponents', () => ({
  Card: ({ children}) => children,
  Modal: ({ children}) => children,
  ModalHeader: ({ children}) => children
}))
jest.mock('./AddressesList', () => ({
  AddressesListContainer: () => <div />
}))

describe('The AddressSection component', () => {
  let wrapper

  const ADDRESS_LONDON = {
    id: '1111',
    name: 'London Address',
    line1: 'london1',
    line2: 'london2',
    line3: 'london3',
    postcode: 'londonpost',
    town: 'London'
  }

  const loadShippingAddresses = jest.fn()

  describe('When screen desktop', () => {
    beforeEach(() => {
      actual.mockReturnValue(1024)
    })

    describe('And only one address', () => {
      beforeEach(() => {
        wrapper = mount(
          <AddressSection
            loadShippingAddresses={loadShippingAddresses}
            selectedAddress={ADDRESS_LONDON}
            showChangeButton={false}
          />
        )
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('calls loadShippingAddresses on mount', () => {
        expect(loadShippingAddresses).toHaveBeenCalled()
      })

      test('does not render Change button', () => {
        expect(wrapper.find('.changeAddress').exists()).toBe(false)
      })

      test('renders the title "Delivery Address"', () => {
        expect(wrapper.find('Card').find('p.title').text()).toBe('Delivery Address')
      })

      test('renders the selected address', () => {
        const address = wrapper.find('Card').find('Address')
        expect(address.prop('name')).toBe(ADDRESS_LONDON.name)
        expect(address.prop('line1')).toBe(ADDRESS_LONDON.line1)
        expect(address.prop('line2')).toBe(ADDRESS_LONDON.line2)
        expect(address.prop('line3')).toBe(ADDRESS_LONDON.line3)
        expect(address.prop('postcode')).toBe(ADDRESS_LONDON.postcode)
        expect(address.prop('town')).toBe(ADDRESS_LONDON.town)
      })

      describe('When selectedAddress is still loading', () => {
        beforeEach(() => {
          wrapper.setProps({ selectedAddress: null })
        })

        test('renders the Loading component', () => {
          expect(wrapper.find('Card').find('Loading').exists()).toBe(true)
        })
      })
    })

    describe('And more than one address', () => {
      beforeEach(() => {
        wrapper = mount(
          <AddressSection
            loadShippingAddresses={loadShippingAddresses}
            selectedAddress={ADDRESS_LONDON}
            showChangeButton
          />
        )
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      test('renders Change button', () => {
        expect(wrapper.find('.changeAddress').exists()).toBe(true)
      })

      describe('when click change', () => {
        beforeEach(() => {
          wrapper.find('.changeAddress').simulate('click')
        })

        test('renders AddressesListContainer', () => {
          expect(wrapper.find('AddressesListContainer').exists()).toBe(true)
        })
      })
    })
  })

  describe('When screen mobile', () => {
    beforeEach(() => {
      actual.mockReturnValue(639)
    })
    describe('And more than one address', () => {
      beforeEach(() => {
        wrapper = mount(
          <AddressSection
            loadShippingAddresses={loadShippingAddresses}
            selectedAddress={ADDRESS_LONDON}
            showChangeButton
          />
        )
      })

      describe('when click change', () => {
        beforeEach(() => {
          wrapper.find('.changeAddress').simulate('click')
        })

        test('renders mobile AddressesListContainer', () => {
          expect(wrapper.find('.mobileAddressesList').exists()).toBe(true)
        })
      })
    })
  })
})
