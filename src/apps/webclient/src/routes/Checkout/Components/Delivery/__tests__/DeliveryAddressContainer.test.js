import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { DeliveryAddressContainer } from '../DeliveryAddress/DeliveryAddressContainer'

const deliveryDays = Immutable.fromJS({
  '2020-02-14': {
    date: '2020-02-14',
    isDefault: false,
    alternateDeliveryDay: null,
    slots: [
      {
        id: '1',
        coreSlotId: '1',
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        isDefault: true,
        deliveryStartTime: '08:00:00',
        disabledSlotId: '2020-02-14_08-19',
      },
      {
        id: '2',
        coreSlotId: '2',
        deliveryEndTime: '12:00:00',
        deliveryPrice: '2.99',
        isDefault: false,
        deliveryStartTime: '08:00:00',
        disabledSlotId: '2020-02-14_08-12',
      },
    ],
  },
  '2020-02-15': {
    date: '2020-02-15',
    isDefault: false,
    alternateDeliveryDay: null,
    slots: [
      {
        id: '3',
        coreSlotId: '1',
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        isDefault: true,
        deliveryStartTime: '08:00:00',
        disabledSlotId: '2020-02-15_08-19',
      },
      {
        id: '4',
        coreSlotId: '2',
        deliveryEndTime: '12:00:00',
        deliveryPrice: '2.99',
        isDefault: false,
        deliveryStartTime: '08:00:00',
        disabledSlotId: '2020-02-15_08-12',
      },
    ],
  },
})

describe('DeliveryAddressContainer', () => {
  let wrapper
  const initialState = {
    pending: Immutable.Map({
      CHECKOUT_ADDRESSES_RECEIVE: true,
    }),
    request: Immutable.Map({
      browser: 'mobile',
    }),
    basket: Immutable.Map({
      postcode: '',
      date: '2020-02-15',
      slotId: '',
    }),
    boxSummaryDeliveryDays: deliveryDays,
    features: Immutable.fromJS({
      ndd: { value: false },
    }),
  }
  const mockStore = configureMockStore()
  const store = mockStore(initialState)

  beforeEach(() => {
    wrapper = shallow(<DeliveryAddressContainer store={store} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      isMobile: true,
    }
    expect(wrapper.find('Address').props()).toEqual(expect.objectContaining(expected))
  })
})
