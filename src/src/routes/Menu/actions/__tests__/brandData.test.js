import Immutable from 'immutable'
import { logger } from 'utils/logger'
import { Cookies } from 'utils/GoustoCookies'
import { getBrandMenuHeaders, getBrandInfo, brandDataReceived } from '../brandData'
import * as brandApi from '../../../../apis/brand'
import { safeJestMock } from '../../../../_testing/mocks'

const mockedCookieGet = safeJestMock(Cookies, 'get')

describe('brandDataReceived', () => {
  test('should return an action with the correct response', () => {
    const testResponse = { testData: 'some brand' }

    const result = brandDataReceived(testResponse)

    expect(result).toEqual({
      type: 'BRAND_DATA_RECEIVED',
      response: { testData: 'some brand' },
    })
  })
})

describe('getBrandMenuHeaders', () => {
  describe('when brandHeaders returns data', () => {
    const menuHeaderData = {
      id: '342',
      type: 'menu',
      relationships: {
        collections: {
          data: [{
            header: 'header-wave-id',
            id: 'collection-id',
            type: 'collection'
          }]
        }
      }
    }

    const headerData = {
      attributes: {},
      id: 'header-wave-id',
      type: 'wave-link-header'
    }

    let dispatch
    let state
    const getState = () => state

    beforeEach(() => {
      dispatch = jest.fn()
      state = {
        auth: Immutable.Map({
          accessToken: 'access-token',
          id: 'user-id',
        })
      }

      mockedCookieGet.mockReturnValue('mock-session-id')

      safeJestMock(brandApi, 'fetchBrandMenuHeaders').mockResolvedValue({
        data: {
          data: [menuHeaderData],
          included: [headerData]
        }
      })
    })

    test('should call fetchBrandMenuHeaders with access token', async () => {
      await getBrandMenuHeaders()(dispatch, getState)
      expect(brandApi.fetchBrandMenuHeaders).toHaveBeenCalledWith('access-token', 'mock-session-id', 'user-id')
    })

    test('should dispatch MENU_COLLECTIONS_HEADERS_RECEIVED', async () => {
      await getBrandMenuHeaders()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'MENU_COLLECTIONS_HEADERS_RECEIVED',
        payload: {
          collectionHeaders: {
            collectionsPerMenu: [menuHeaderData],
            headers: [headerData]
          }
        }
      })
    })
  })

  describe('when brandHeaders returns no data', () => {
    const dispatch = jest.fn()
    const getState = () => ({
      auth: Immutable.Map({
        accessToken: ''
      })
    })
    const loggerErrorSpy = safeJestMock(logger, 'error')

    test('should not dispatch', async () => {
      safeJestMock(brandApi, 'fetchBrandMenuHeaders').mockReturnValue(() => Promise.reject())
      await getBrandMenuHeaders()(dispatch, getState)
      expect(dispatch).not.toHaveBeenCalled()
    })

    test('should dispatch logger error with message', async () => {
      await getBrandMenuHeaders()(dispatch, getState)
      expect(loggerErrorSpy).toHaveBeenCalledWith({ message: 'Fetch Menu Headers failed'})
    })
  })
})
describe('getBrandInfo', () => {
  describe('when calling getBrandInfo', () => {
    let dispatch
    let state
    const getState = () => state

    beforeEach(() => {
      dispatch = jest.fn()
      state = {
        auth: Immutable.Map({
          accessToken: 'access-token',
          id: 'user-id',
        })
      }

      mockedCookieGet.mockReturnValue('mock-session-id')
      safeJestMock(brandApi, 'fetchBrandInfo').mockResolvedValue({
        data: {
        }
      })
    })

    test('should call fetchBrandInfo with access token, sessionId and userId', async () => {
      await getBrandInfo()(dispatch, getState)
      expect(brandApi.fetchBrandInfo).toHaveBeenCalledWith('access-token', 'mock-session-id', 'user-id')
    })
  })
})
