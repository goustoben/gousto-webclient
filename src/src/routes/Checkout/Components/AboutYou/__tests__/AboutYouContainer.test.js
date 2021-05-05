import Immutable from 'immutable'
import { mapStateToProps } from '../AboutYouContainer'

describe('Given mapStateToProps', () => {
  describe('When mapStateToProps is called', () => {
    let output
    const initialState = {
      features: Immutable.fromJS({
        isPassStrengthEnabled: { value: false },
      }),
      request: Immutable.Map({
        browser: 'mobile',
      }),
      pending: Immutable.Map({
        USER_LOGIN: false,
      }),
      form: Immutable.fromJS({
        account: {
          syncErrors: {
            account: {
              password: ['error'],
            },
          },
          values: {
            account: {
              password: 'qwerty',
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
        isPassStrengthEnabled: false,
        isMobile: true,
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})
