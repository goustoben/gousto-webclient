import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import Address from 'routes/Checkout/Components/Address/Address'
import { Button } from 'goustouicomponents'
import Postcode from 'routes/Checkout/Components/Address/Postcode'
import AddressInputs from 'routes/Checkout/Components/Address/AddressInputs'
import { fetchDeliveryDays } from 'apis/deliveries'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots } from 'utils/deliveries'

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [{id: '4'}, {id: '5'}, {id: '6'}]
  })
}))

jest.mock('utils/deliveries', () => ({
  transformDaySlotLeadTimesToMockSlots: jest.fn().mockReturnValue([
    { id: '4', daySlotLeadTimes: [] },
    { id: '5', daySlotLeadTimes: [] },
    { id: '6', daySlotLeadTimes: [] }
  ]),
  getAvailableDeliveryDays: jest.fn()
}))

describe('Address', () => {
  let wrapper

  beforeEach(() => {
    const selectedAddresses = Immutable.Map({})
    wrapper = shallow(< Address
      selectedAddress={selectedAddresses}
      registerField={jest.fn()}
      isNDDExperiment={false}
    />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('should not transform delivery days', () => {
    expect(transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
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
        deliveryTariffId={'some-uuid'}
      />)
    })

    describe('rendering', () => {
      beforeEach(() => {
        fetchDeliveryDays.mockClear()
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
      getAvailableDeliveryDays.mockReturnValue([{id: '5'}, {id: '6'}])

      const expectedReqData = {
        'filters[cutoff_datetime_from]': moment().startOf('day').toISOString(),
        'filters[cutoff_datetime_until]': moment().startOf('day').add(30, 'days').toISOString(),
        postcode: 'NW1 8RJ',
        ndd: 'true',
        delivery_tariff_id: 'some-uuid',
      }

      expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
      expect(fetchDeliveryDays.mock.calls[0][1]).toEqual(expectedReqData)
      expect(transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
      expect(getAvailableDeliveryDays).toHaveBeenCalledWith([
        { id: '4', daySlotLeadTimes: [] },
        { id: '5', daySlotLeadTimes: [] },
        { id: '6', daySlotLeadTimes: [] }
      ])
    })
  })
})
