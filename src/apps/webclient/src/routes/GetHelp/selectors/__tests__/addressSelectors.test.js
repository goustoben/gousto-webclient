import { fromJS } from 'immutable'

import {
  getShippingAddresses,
  getSelectedAddress,
  getOrderShippingAddress
} from '../addressSelectors'

const ADDRESS = {
  id: '1',
  line1: 'Flat 6',
  line2: '8 Some Road',
  line3: '',
  name: 'New Home',
  postcode: 'W5 3PB',
  town: 'London',
}

const ADDRESSES = [
  ADDRESS,
  {
    id: '2',
    line1: 'Flat 7',
    line2: '9 Some Road',
    line3: '',
    name: 'New Home',
    postcode: 'W5 3PB',
    town: 'London',
  },
]

const DEFAULT_SHIPPING_ADDRESS_ID = '1234'

const STATE = {
  getHelp: fromJS({
    order: {
      shippingAddress: ADDRESS,
    },
    shippingAddresses: ADDRESSES,
    selectedAddress: ADDRESS,
  }),
  user: fromJS({
    shippingAddressId: DEFAULT_SHIPPING_ADDRESS_ID,
  }),
}

describe('addressSelectors', () => {
  let result

  describe.each([
    ['getShippingAddresses', getShippingAddresses, ADDRESSES],
    ['getOrderShippingAddress', getOrderShippingAddress, ADDRESS],
    ['getSelectedAddress', getSelectedAddress, ADDRESS],
  ])('Given %s is called', (_selectorName, selector, expectedResult, newState = {}) => {
    beforeEach(() => {
      result = selector({
        ...STATE,
        ...newState
      })
    })

    test('gets the corresponding value from the store', () => {
      expect(result).toEqual(expectedResult)
    })
  })
})
