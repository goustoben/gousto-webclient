import Immutable from 'immutable'

import { getUserDetails } from '../subscription'

describe('getUserDetails', () => {
  let state
  beforeEach(() => {
    state = {
      user: Immutable.fromJS({
        nameFirst: 'Gousto',
        subscription: {
          state: 'active'
        }
      })
    }
  })

  test('then the correct data format should be returned', () => {
    const result = getUserDetails(state)
    const expectedResult = {
      userFirstName: 'Gousto',
      status: 'active'
    }

    expect(result).toEqual(expectedResult)
  })
})
