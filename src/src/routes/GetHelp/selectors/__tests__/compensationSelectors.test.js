import { fromJS } from 'immutable'

import {
  getCompensation,
  getIsMultiComplaints,
} from '../compensationSelectors'

const COMPENSATION = {
  amount: 5,
  type: 'credit'
}

const STATE = {
  getHelp: fromJS({
    compensation: COMPENSATION,
  }),
}

const STATE_WITH_MULTI_COMPENSATION = {
  getHelp: fromJS({
    compensation: {
      ...COMPENSATION,
      totalAmount: 2
    },
  }),
}
describe('compensationSelectors', () => {
  let result

  describe.each([
    ['getCompensation', getCompensation, COMPENSATION],
    ['getIsMultiComplaints', getIsMultiComplaints, false],
    ['getIsMultiComplaints', getIsMultiComplaints, true, STATE_WITH_MULTI_COMPENSATION],
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
