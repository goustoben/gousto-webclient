import Immutable from 'immutable'

import { mapStateToProps } from '../AboutYouContainer'

describe('Given mapStateToProps', () => {
  describe('When mapStateToProps is called', () => {
    let output
    const initialState = {
      request: Immutable.Map({
        browser: 'mobile',
      }),
      pending: Immutable.Map({
        USER_LOGIN: false,
      }),
      checkout: Immutable.fromJS({
        passwordInfo: {
          value: '',
          errorCodes: [],
        },
      }),
      form: Immutable.fromJS({
        account: {
          syncErrors: {
            account: {
              email: 'Please provide a valid email',
            },
          },
          values: {
            account: {
              email: 'qwerty',
            },
          },
        },
      }),
    }

    beforeEach(() => {
      output = mapStateToProps('account')(initialState)
    })

    test('Then should return proper values', () => {
      const expected = {
        sectionName: 'account',
        isMobile: true,
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})
