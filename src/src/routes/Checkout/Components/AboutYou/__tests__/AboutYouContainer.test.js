import Immutable from 'immutable'
import { mapStateToProps } from '../AboutYouContainer'

describe('Given mapStateToProps', () => {
  describe('When mapStateToProps is called', () => {
    let output
    const initialState = {
      features: Immutable.fromJS({
        isCheckoutOverhaulEnabled: { value: false },
        isPassStrengthEnabled: { value: false },
      }),
      request: Immutable.Map({
        browser: 'mobile',
      }),
      pending: Immutable.Map({
        USER_LOGIN: false,
      }),
      form: Immutable.fromJS({
        aboutyou: {
          syncErrors: {
            aboutyou: {
              password: ['error']
            }
          },
          values: {
            aboutyou: {
              password: 'qwerty'
            }
          }
        }
      })
    }

    beforeEach(() => {
      output = mapStateToProps('aboutyou')(initialState)
    })

    test('Then should return proper values', () => {
      const expected = {
        sectionName: 'aboutyou',
        isCheckoutOverhaulEnabled: false,
        isPassStrengthEnabled: false,
        isMobile: true,
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})
