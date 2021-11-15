import * as fetchModule from 'utils/fetch'
import * as cookieHelper from 'utils/cookieHelper2'
import Cookies from 'cookies-js'
import { fetchMenus } from "routes/Menu/fetchData/apis/fetchMenus"
import { fetchMenusWithUserId } from "routes/Menu/fetchData/apis/fetchMenusWithUserId"
import { fetchSimpleMenu } from "routes/Menu/fetchData/apis/fetchSimpleMenu"

const mockFetchResult = { data: [1, 2, 3] }

jest.mock('config/routes', () => ({
  version: {
    menu: 'v1',
  },
  menu: {
    menus: '/menus'
  }
}))

describe('menus', () => {
  let fetchRawSpy
  let cookieGetSpy

  beforeEach(() => {
    fetchRawSpy = jest.spyOn(fetchModule, 'fetchRaw').mockImplementation(() => {
      const getData = async () => (mockFetchResult)

      return getData()
    })

    cookieGetSpy = jest.spyOn(cookieHelper, 'get').mockReturnValue('session_id')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchMenus', () => {
    let query
    beforeEach(() => {
      query = {}
    })

    test('should fetch the correct url', async () => {
      await fetchMenus('token', query)

      expect(cookieGetSpy).toBeCalledWith(Cookies, 'gousto_session_id', false, false)
      expect(fetchRawSpy).toHaveBeenCalledTimes(1)
      expect(fetchRawSpy).toHaveBeenCalledWith('https://production-api.gousto.co.uk/menu/v1/menus',
        { addAlternatives: true, include: 'ingredients' },
        {
          accessToken: 'token',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session_id',
          },
          includeCookies: false,
          method: 'GET',
          timeout: null,
          useMenuService: true,
        })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenus('token', query)

      expect(result).toEqual(mockFetchResult)
    })

    describe('when query has preview information', () => {
      const previewMenuId = '1234'
      const previewAuthUserId = 'aaaa-aaaa'
      const previewExpiry = 12345
      const previewSignature = 'asdaudhad'

      beforeEach(() => {
        query['preview[menu_id]'] = previewMenuId
        query['preview[auth_user_id]'] = previewAuthUserId
        query['preview[expiry]'] = previewExpiry
        query['preview[signature]'] = previewSignature
      })

      test('should pass preview query information', async () => {
        await fetchMenus('token', query)

        expect(fetchRawSpy).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            'preview[menu_id]': previewMenuId,
            'preview[auth_user_id]': previewAuthUserId,
            'preview[expiry]': previewExpiry,
            'preview[signature]': previewSignature
          }),
          expect.any(Object)
        )
      })
    })

    describe('when query has tasteProfileId', () => {
      const tasteProfileId = '1234'

      beforeEach(() => {
        query.tasteProfileId = tasteProfileId
      })

      test('should pass tasteProfileId', async () => {
        await fetchMenus('token', query)

        expect(fetchRawSpy).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            tasteProfileId
          }),
          expect.any(Object)
        )
      })
    })
  })

  describe('fetchMenusWithUserId', () => {
    let query
    beforeEach(() => {
      query = {}
    })

    test('should fetch the correct url', async () => {
      await fetchMenusWithUserId('token', query, 'user_id')

      expect(cookieGetSpy).toBeCalledWith(Cookies, 'gousto_session_id', false, false)
      expect(fetchRawSpy).toHaveBeenCalledTimes(1)
      expect(fetchRawSpy).toHaveBeenCalledWith('https://production-api.gousto.co.uk/menu/v1/menus',
        { addAlternatives: true, include: 'ingredients', userId: 'user_id' },
        {
          accessToken: 'token',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session_id',
            'x-gousto-user-id': 'user_id',
          },
          includeCookies: false,
          method: 'GET',
          timeout: null,
          useMenuService: true,
        })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenusWithUserId('token', query, 'user_id')
      expect(result).toEqual(mockFetchResult)
    })

    describe('when query has tasteProfileId', () => {
      const tasteProfileId = '1234'

      beforeEach(() => {
        query.tasteProfileId = tasteProfileId
      })

      test('should pass tasteProfileId', async () => {
        await fetchMenusWithUserId('token', query, 'user_id')

        expect(fetchRawSpy).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            tasteProfileId
          }),
          expect.any(Object)
        )
      })
    })
  })

  describe('fetchSimpleMenu', () => {
    test('should fetch the correct url', async () => {
      await fetchSimpleMenu('token', 'user_id')

      expect(cookieGetSpy).toBeCalledWith(Cookies, 'gousto_session_id', false, false)
      expect(fetchRawSpy).toHaveBeenCalledTimes(1)
      expect(fetchRawSpy).toHaveBeenCalledWith('https://production-api.gousto.co.uk/menu/v1/menus',
        {
          includeMenuRelationships: false,
          userId: 'user_id', },
        {
          accessToken: 'token',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json',
            'x-gousto-device-id': 'session_id',
            'x-gousto-user-id': 'user_id',
          },
          includeCookies: false,
          method: 'GET',
          timeout: null,
          useMenuService: true,
        })
    })
  })
})
