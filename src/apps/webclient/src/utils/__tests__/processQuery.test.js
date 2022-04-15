import Immutable from 'immutable'
import { processQuery } from 'utils/processQuery'
import logger from 'utils/logger'
import { basketPromoCodeChange } from 'actions/basket'
import { signupSetGoustoOnDemandEnabled } from 'actions/signup'
import { promoApply, promoChange, promoToggleModalVisibility } from 'actions/promos'
import { setAffiliateSource, setTapjoyData, setRoktData } from 'actions/tracking'
import axe from '@axe-core/react'

jest.mock('actions/signup',() => ({
  signupSetGoustoOnDemandEnabled: jest.fn(),
}))

jest.mock('actions/basket',() => ({
  basketPromoCodeChange: jest.fn(),
}))

jest.mock('actions/tracking',() => ({
  setAffiliateSource: jest.fn(),
  setTapjoyData: jest.fn(),
  setRoktData: jest.fn(),
}))

jest.mock('actions/promos',() => ({
  promoChange: jest.fn(),
  promoToggleModalVisibility: jest.fn(),
  promoApply: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
}))

jest.mock('@axe-core/react')

describe('Given processQuery util function', () => {
  let mockStore
  let query

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
      getState: () => ({
        auth: Immutable.fromJS({
          isAuthenticated: false,
        })
      })
    }
  })

  describe('When no queries passed', () => {
    beforeEach(() => {
      processQuery(null, mockStore, {})
    })

    test('Then dispatch should not be invoked', () => {
      expect(mockStore.dispatch).not.toBeCalled()
    })
  })

  describe('When gousto_on_demand parameter exists', () => {
    beforeEach(() => {
      query = {
        gousto_on_demand: 1,
      }
      processQuery(query, mockStore, {})
    })

    test('Then should dispatch signupSetGoustoOnDemandEnabled', () => {
      expect(signupSetGoustoOnDemandEnabled).toHaveBeenCalledWith(true)
    })
  })

  describe('When promo_code parameter exists', () => {
    beforeEach(() => {
      query = {
        promo_code: 'DTI-PROMO-CODE',
      }
      processQuery(query, mockStore, {})
    })

    test('Then should dispatch promoChange', () => {
      expect(promoChange).toHaveBeenCalledWith('DTI-PROMO-CODE')
    })
  })

  describe('When promo_code parameter exists, but couldn\'t be applied', () => {
    beforeEach(() => {
      mockStore = {
        dispatch: jest.fn().mockRejectedValue(new Error('Error fetching promo code')),
      }
      query = {
        promo_code: 'DTI-PROMO-CODE',
        gousto_on_demand: 1,
      }
      processQuery(query, mockStore, {})
    })

    test('Then should dispatch proper actions', () => {
      expect(basketPromoCodeChange).toHaveBeenCalledWith('')
      expect(signupSetGoustoOnDemandEnabled).toHaveBeenCalledWith(false)
      expect(logger.warning).toBeCalled()
    })
  })

  describe('When there are no errors', () => {
    describe('And noPromoModal parameter exists', () => {
      beforeEach(() => {
        query = {
          promo_code: 'DTI-PROMO-CODE',
          noPromoModal: 'true',
        }
        processQuery(query, mockStore, {})
      })

      test('Then should dispatch promoApply', () => {
        expect(promoApply).toBeCalled()
      })
    })

    describe('And noPromoModal parameter doesn\'t exist and user is authenticated', () => {
      beforeEach(() => {
        query = {
          promo_code: 'DTI-PROMO-CODE',
        }
        mockStore = {
          ...mockStore,
          getState: () => ({
            auth: Immutable.fromJS({
              isAuthenticated: true,
            })
          })
        }
        processQuery(query, mockStore, {})
      })

      test('Then should dispatch promoToggleModalVisibility', () => {
        expect(promoToggleModalVisibility).toHaveBeenCalledWith(true)
      })
    })

    describe('And noPromoModal parameter doesn\'t exist and user is not authenticated', () => {
      beforeEach(() => {
        query = {
          promo_code: 'DTI-PROMO-CODE',
        }
        processQuery(query, mockStore, { hashTag: 'login' })
      })

      test('Then should dispatch basketPromoCodeChange', () => {
        expect(basketPromoCodeChange).toHaveBeenCalledWith('DTI-PROMO-CODE')
      })
    })
  })

  describe('When asource parameter exists', () => {
    beforeEach(() => {
      query = {
        asource: 'www.source.com',
      }
      processQuery(query, mockStore, {})
    })

    test('Then should dispatch setAffiliateSource', () => {
      expect(setAffiliateSource).toHaveBeenCalledWith('www.source.com')
    })
  })

  describe('when axe parameter is supplied', () => {
    beforeEach(() => {
      query = {
        axe: 1,
      }
      processQuery(query, mockStore, {})
    })

    test('then it should enable the Axe engine', () => {
      expect(axe).toHaveBeenCalled()
    })
  })

  describe('when sid parameter is supplied', () => {
    beforeEach(() => {
      query = {
        sid: 'Tapjoy',
        tapjoy_transaction_id: 'fake_transaction_id',
        tapjoy_publisher_id: 'fake_publisher_id',
      }

      processQuery(query, mockStore, {})
    })

    test('then should dispatch setTapjoyData', () => {
      expect(setTapjoyData).toHaveBeenCalledWith('fake_transaction_id', 'fake_publisher_id')
    })
  })

  describe('when utm_source is rokt and rokt_tracking_id parameter is supplied', () => {
    describe('when utm_source is a string', () => {
      test('then should dispatch setRoktData', () => {
        query = {
          utm_source: 'Rokt',
          rokt_tracking_id: 'fake_rokt_id',
        }

        processQuery(query, mockStore, {})

        expect(setRoktData).toHaveBeenCalledWith('fake_rokt_id')
      })
    })

    describe('when utm_source is an array', () => {
      test('then should dispatch setRoktData', () => {
        query = {
          utm_source: ['Rokt', 'Bing'],
          rokt_tracking_id: 'fake_rokt_id',
        }

        processQuery(query, mockStore, {})

        expect(setRoktData).toHaveBeenCalledWith('fake_rokt_id')
      })
    })
  })
})
