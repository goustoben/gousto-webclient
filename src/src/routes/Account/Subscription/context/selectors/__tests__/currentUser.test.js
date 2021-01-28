import {
  getCurrentUserPostcode,
  getFirstName,
  getIsCurrentUserLoaded,
  getCurrentUserDeliveryTariffId
} from '../currentUser'

describe('currentUser selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      currentUser: {
        shippingAddress: {
          postcode: 'W1A',
        },
        nameFirst: 'Bob',
        deliveryTariffId: 'a1b2c3-d4e5f6'
      }
    }
  })

  describe('getCurrentUserPostcode', () => {
    test('should return postcode', () => {
      expect(getCurrentUserPostcode(contextState)).toEqual('W1A')
    })
  })

  describe('getCurrentUserDeliveryTariffId', () => {
    test('should return deliveryTariffId', () => {
      expect(getCurrentUserDeliveryTariffId(contextState)).toEqual('a1b2c3-d4e5f6')
    })
  })

  describe('getFirstName', () => {
    test('should return first name', () => {
      expect(getFirstName(contextState)).toEqual('Bob')
    })
  })

  describe('getIsCurrentUserLoaded', () => {
    test('should return true if user data is loaded', () => {
      expect(getIsCurrentUserLoaded({})).toEqual(false)
    })

    test('should return false if user data is not loaded', () => {
      expect(getIsCurrentUserLoaded(contextState)).toEqual(true)
    })
  })
})
