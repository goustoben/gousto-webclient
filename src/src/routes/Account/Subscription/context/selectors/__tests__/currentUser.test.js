import { getCurrentUserPostcode } from '../currentUser'

describe('currentUser selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      currentUser: {
        shippingAddress: {
          postcode: 'W1A',
        }
      }
    }
  })

  describe('getCurrentUserPostcode', () => {
    test('should return postcode', () => {
      expect(getCurrentUserPostcode(contextState)).toEqual('W1A')
    })
  })
})
