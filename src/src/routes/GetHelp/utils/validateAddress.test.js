import { getValidAddressForOrder } from './validateAddress'

const ADDRESS = {
  id: '123',
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
    id: '2345',
    line1: 'Flat 7',
    line2: '9 Some Road',
    line3: '',
    name: 'New Home',
    postcode: 'W5 3PB',
    town: 'London',
  },
]
const DEFAULT_SHIPPING_ADDRESS_ID = '123'

const DELETED_ORDER_ADDRESS = {
  id: '345',
  line1: 'Flat 8',
  line2: '8 Some Road',
  line3: '',
  name: 'New Home',
  postcode: 'W5 3PB',
  town: 'London',
}
describe('Given getValidAddressForOrder is called', () => {
  let result
  describe.each([
    ['And userAddresses is null', null, [], ADDRESS, DEFAULT_SHIPPING_ADDRESS_ID],
    ['And the defaultShippingAddressId is null', null, ADDRESS, ADDRESS, null],
    ['And orderAddress is null ', null, ADDRESS, null, DEFAULT_SHIPPING_ADDRESS_ID],
    ['And orderAddress is existing', ADDRESS, ADDRESSES, ADDRESS, DEFAULT_SHIPPING_ADDRESS_ID],
    ['And orderAddress has been deleted ', ADDRESS, ADDRESSES, DELETED_ORDER_ADDRESS, DEFAULT_SHIPPING_ADDRESS_ID],
  ])('%s', (_testCase, expectedResult, userAddresses, orderAddress, defaultShippingAddressId) => {
    beforeEach(() => {
      result = getValidAddressForOrder(userAddresses, orderAddress, defaultShippingAddressId)
    })

    test(`returns ${!expectedResult ? null : 'the valid address'}`, () => {
      expect(result).toEqual(expectedResult)
    })
  })
})
