import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { Address } from 'routes/Checkout/Components/Address/Address'
import { AddressInputs } from 'routes/Checkout/Components/Address/AddressInputs'
import { fetchDeliveryDays } from 'apis/deliveries'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots } from 'utils/deliveries'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton'

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [{ id: '4' }, { id: '5' }, { id: '6' }],
  }),
}))

jest.mock('utils/deliveries', () => ({
  transformDaySlotLeadTimesToMockSlots: jest.fn().mockReturnValue([
    { id: '4', daySlotLeadTimes: [] },
    { id: '5', daySlotLeadTimes: [] },
    { id: '6', daySlotLeadTimes: [] },
  ]),
  getAvailableDeliveryDays: jest.fn(),
}))

describe('Address', () => {
  let wrapper

  beforeEach(() => {
    const selectedAddresses = Immutable.Map({})
    wrapper = shallow(
      <Address
        selectedAddress={selectedAddresses}
        registerField={jest.fn()}
        isNDDExperiment={false}
      />,
    )
  })

  test('should not transform delivery days', () => {
    expect(transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
  })

  describe('rendering', () => {
    beforeEach(() => {
      const selectedAddresses = Immutable.Map({})
      wrapper = shallow(
        <Address
          selectedAddress={selectedAddresses}
          registerField={jest.fn()}
          isNDDExperiment={false}
          isDelivery
        />,
      )
      wrapper.setState({ addressSaved: false })
    })

    test('should not render <AddressInputs> component(s)', () => {
      expect(wrapper.find(AddressInputs)).toHaveLength(0)
    })

    test('should render 1 <Button> component(s)', () => {
      expect(wrapper.find(CheckoutButton)).toHaveLength(1)
    })
  })

  describe('with NDD prop', () => {
    beforeEach(() => {
      const selectedAddresses = Immutable.Map({})
      wrapper = shallow(
        <Address
          selectedAddress={selectedAddresses}
          registerField={jest.fn()}
          checkoutAddressLookup={jest.fn()}
          isNDDExperiment
          initialPostcode="NW1 8RJ"
          deliveryDate="2019-09-01"
          isDelivery
          deliveryTariffId="some-uuid"
        />,
      )
    })

    describe('rendering', () => {
      beforeEach(() => {
        fetchDeliveryDays.mockClear()
        wrapper.setState({ addressSaved: false })
      })

      test('should not render <AddressInputs> component(s)', () => {
        expect(wrapper.find(AddressInputs)).toHaveLength(0)
      })
    })

    test('should fetch next day delivery days)', () => {
      getAvailableDeliveryDays.mockReturnValue([{ id: '5' }, { id: '6' }])

      const cutOfFrom = moment().startOf('day').toISOString()
      const cutOfUntil = moment().startOf('day').add(30, 'days').toISOString()
      const postcode = 'NW1 8RJ'
      const ndd = true
      const deliveryTariffId = 'some-uuid'

      expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
      expect(fetchDeliveryDays).toHaveBeenNthCalledWith(
        1,
        null,
        cutOfFrom,
        cutOfUntil,
        ndd,
        deliveryTariffId,
        postcode,
      )
      expect(transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
      expect(getAvailableDeliveryDays).toHaveBeenCalledWith([
        { id: '4', daySlotLeadTimes: [] },
        { id: '5', daySlotLeadTimes: [] },
        { id: '6', daySlotLeadTimes: [] },
      ])
    })
  })
})
