import {
  getCurrentUserPostcode,
  getFirstName,
  getIsCurrentUserLoaded,
  getCurrentUserDeliveryTariffId,
  getCurrentUserId,
} from '../currentUser'

describe('currentUser selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      currentUser: {
        id: '12345',
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

  describe('getCurrentUserId', () => {
    test('should return nothing if state is not loaded', () => {
      expect(getCurrentUserId({})).toBeFalsy()
    })

    test('should return converted id if state is loaded', () => {
      expect(getCurrentUserId(contextState)).toEqual(12345)
    })
  })
})
