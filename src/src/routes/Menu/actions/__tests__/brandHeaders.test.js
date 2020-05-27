import logger from 'utils/logger'
import { getBrandMenuHeaders } from '../brandHeaders'
import * as brandApi from '../../../../apis/brand'
import { safeJestMock } from '../../../../_testing/mocks'

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

    beforeEach(() => {
      dispatch = jest.fn()
      safeJestMock(brandApi, 'fetchBrandMenuHeaders').mockResolvedValue({
        data: {
          data: [menuHeaderData],
          included: [headerData]
        }
      })
    })

    test('should dispatch MENU_COLLECTIONS_HEADERS_RECEIVED', async () => {
      await getBrandMenuHeaders()(dispatch)
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
    const loggerErrorSpy = safeJestMock(logger, 'error')

    test('should not dispatch', async () => {
      safeJestMock(brandApi, 'fetchBrandMenuHeaders').mockReturnValue(() => Promise.reject())
      await getBrandMenuHeaders()(dispatch)
      expect(dispatch).not.toHaveBeenCalled()
    })

    test('should dispatch logger error with message', async () => {
      await getBrandMenuHeaders()(dispatch)
      expect(loggerErrorSpy).toHaveBeenCalledWith({ message: 'Fetch Menu Headers failed'})
    })
  })
})
