import { fromJS } from 'immutable'

import {
  getShippingAddresses,
} from '../addressSelectors'

const ADDRESSES = [
  {
    id: '1',
    line1: 'Flat 6',
    line2: '8 Some Road',
    line3: '',
    name: 'New Home',
    postcode: 'W5 3PB',
    town: 'London',
  },
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

const STATE = {
  getHelp: fromJS({
    shippingAddresses: ADDRESSES,
  }),
}

describe('addressSelectors', () => {
  let result

  describe.each([
    ['getShippingAddresses', getShippingAddresses, ADDRESSES],
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
