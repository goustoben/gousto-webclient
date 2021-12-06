import React from 'react'
import { mount } from 'enzyme'
import { AddressSection } from './AddressSection'

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

  beforeEach(() => {
    wrapper = mount(
      <AddressSection
        loadShippingAddresses={loadShippingAddresses}
        selectedAddress={ADDRESS_LONDON}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('it should call loadShippingAddresses on mount', () => {
    expect(loadShippingAddresses).toHaveBeenCalled()
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
