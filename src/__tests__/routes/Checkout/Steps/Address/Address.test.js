import Immutable from 'immutable'

import React from 'react'
import {shallow} from 'enzyme'

import Address from 'routes/Checkout/Components/Address/Address'
import { Button } from 'goustouicomponents'
import Postcode from 'routes/Checkout/Components/Address/Postcode'
import AddressInputs from 'routes/Checkout/Components/Address/AddressInputs'
import { fetchDeliveryDays } from "apis/deliveries"
import { getAvailableDeliveryDays } from "utils/deliveries"

jest.mock('apis/deliveries')
jest.mock('utils/deliveries')

describe('Address', () => {
  let wrapper

  test('should return div', () => {
    const selectedAddresses = Immutable.Map({})
    wrapper = shallow(< Address
      selectedAddress={selectedAddresses}
      registerField={jest.fn()}
      isNDDExperiment={false}
    />)
    expect(wrapper.type()).toBe('div')
  })

  describe('rendering', () => {
    beforeEach(() => {
      const selectedAddresses = Immutable.Map({})
      wrapper = shallow(< Address
        selectedAddress={selectedAddresses}
        registerField={jest.fn()}
        isNDDExperiment={false}
      />)
      wrapper.setState({addressSaved: false})
    })

    test('should render 1 <Postcode> component(s)', () => {
      expect(wrapper.find(Postcode).length).toBe(1)
    })

    test('should not render <AddressInputs> component(s)', () => {
      expect(wrapper.find(AddressInputs)).toHaveLength(0)
    })

    test('should render 1 <Button> component(s)', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })

  describe('with NDD prop', () => {

    beforeEach(() => {
      const selectedAddresses = Immutable.Map({})
      wrapper = shallow(< Address
        selectedAddress={selectedAddresses}
        registerField={jest.fn()}
        checkoutAddressLookup={jest.fn()}
        isNDDExperiment
        initialPostcode={'NW1 8RJ'}
        deliveryDate={'2019-09-01'}
        isDelivery
      />)
    })

    describe('rendering', () => {
      beforeEach(() => {
        wrapper.setState({addressSaved: false})
      })

      test('should render 1 <Postcode> component(s)', () => {
        expect(wrapper.find(Postcode).length).toBe(1)
      })

      test('should not render <AddressInputs> component(s)', () => {
        expect(wrapper.find(AddressInputs)).toHaveLength(0)
      })

      test('should render 1 <Button> component(s)', () => {
        expect(wrapper.find(Button)).toHaveLength(1)
      })
    })
    test('should fetch next day delivery days)', () => {
      const fetchedDays = {data: [{id: '4'}, {id: '5'}, {id: '6'}]}

      fetchDeliveryDays.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          resolve(fetchedDays)
        })
      ))

      getAvailableDeliveryDays.mockImplementation(jest.fn().mockReturnValue(
        [{id: '5'}, {id: '6'}]
      ))

      const expectedReqData = {
        'filters[cutoff_datetime_from]': '2019-09-30T23:00:00.000Z',
        'filters[cutoff_datetime_until]': '2019-10-31T00:00:00.000Z',
        postcode: 'NW1 8RJ',
        ndd: 'true'
      }

      expect(fetchDeliveryDays).toHaveBeenCalledTimes(4)
      expect(fetchDeliveryDays.mock.calls[2][1]).toEqual(expectedReqData)
    })
  })
})
