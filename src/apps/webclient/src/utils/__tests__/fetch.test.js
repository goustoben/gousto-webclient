import Immutable from 'immutable'
import MockDate from 'mockdate'
import PromiseTimeout from 'promise-timeout'
import { isServer } from 'utils/serverEnvironment'
import { isProd } from 'utils/isomorphicEnvironment'

const mockFetch = jest.fn()
const mockGetState = jest.fn()

jest.mock('isomorphic-fetch', () => ({
  __esModule: true,
  default: mockFetch
}))

jest.mock('store', () => ({
  getStore: () => ({
    getState: mockGetState
  })
}))

jest.mock('utils/serverEnvironment')

jest.mock('utils/isomorphicEnvironment')

let processEnv

describe('fetch', () => {
  beforeAll(() => {
    processEnv = process.env

    process.env.API_TOKEN = 'mock-api-token'
    process.env.ENVIRONMENT = 'local'
  })

  afterAll(() => {
    process.env = processEnv
  })
  // this require here is needed, rather than an import
  // so that the jest.mocks are set up in time
  const {
    fetch,
    cacheDefault,
    headerDefault,
    timeoutDefault,
    includeCookiesDefault,
    useMenuServiceDefault,
  // eslint-disable-next-line global-require
  } = require('../fetch')

  const setMockFetchResult = (data, status = 200) => (
    mockFetch.mockResolvedValue({
      text: () => data,
      status,
    })
  )

  beforeEach(() => {
    mockGetState.mockReturnValue({
      features: Immutable.fromJS({})
    })
  })

  afterEach(() => {
    MockDate.reset()
    mockFetch.mockReset()
    mockGetState.mockReset()
  })

  test('should return with JSON', async () => {
    const data = {
      status: 'ok',
      data: {
        recipe_title: 'Test',
        meat_ingredients: [
          'chicken',
          'prawn_with_shell',
        ],
        nutInfo: {
          e_nergy: 100,
        },
      },
    }

    const expected = {
      recipeTitle: 'Test',
      meatIngredients: [
        'chicken',
        'prawn_with_shell',
      ],
      nutInfo: {
        eNergy: 100,
      },
    }

    setMockFetchResult(JSON.stringify(data))

    const result = await fetch('token', 'test')
    expect(result).toEqual({ data: expected, meta: null })
  })

  test('should return with error if response has not ok status', async () => {
    const data = {
      status: 'error',
      error: 'test error',
    }

    setMockFetchResult(JSON.stringify(data))

    try {
      await fetch('token', 'test')
    } catch (err) {
      expect(err.message).toEqual('test error')
    }
  })

  describe('when handling 204 response ', () => {
    describe('when there is a response body', () => {
      const data = {
        status: 'ok',
        data: {
          recipe_title: 'Test',
          meat_ingredients: [
            'chicken',
            'prawn_with_shell',
          ],
          nutInfo: {
            e_nergy: 100,
          },
        },
      }
      const expected = {
        recipeTitle: 'Test',
        meatIngredients: [
          'chicken',
          'prawn_with_shell',
        ],
        nutInfo: {
          eNergy: 100,
        },
      }

      it('should return response object', async () => {
        setMockFetchResult(JSON.stringify(data), 204)

        const result = await fetch('token', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET')

        expect(result).toEqual({ data: expected, meta: null })
      })
    })

    describe('when the response body is empty', () => {
      it('should return valid empty response object', async () => {
        setMockFetchResult('', 204)

        const result = await fetch('token', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET')

        expect(result).toEqual({data: {}, meta: null})
      })
    })
  })

  test('should return with error if response is not in a recognised JSON format', async () => {
    const data = {
      something: '...',
    }

    setMockFetchResult(JSON.stringify(data))

    try {
      await fetch('token', 'test')
    } catch (err) {
      expect(err.message).toEqual('Response is malformed')
    }
  })

  test('should return with error if response is not a JSON string', async () => {
    setMockFetchResult('not json')

    try {
      await fetch('token', 'test')
    } catch (err) {
      expect(err.message).toEqual('An error occurred, please try again.')
    }
  })

  test('should not have body set for GET requests', async () => {
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }

    setMockFetchResult(JSON.stringify(data))

    const expectedRequest = {
      method: 'GET',
      headers: {},
      cache: 'default',
    }

    const result = await fetch('', 'test')

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith('test', expectedRequest)
  })

  test('should have correct querystring set for GET requests', async () => {
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }

    setMockFetchResult(JSON.stringify(data))

    const expectedRequest = {
      method: 'GET',
      headers: {},
      cache: 'default',
    }

    const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] })

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith('test?id=1&include%5B0%5D=test1&include%5B1%5D=test2', expectedRequest)
  })

  test('should have body and content-type set for non-GET requests', async () => {
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }

    setMockFetchResult(JSON.stringify(data))

    const expectedRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      cache: 'default',
      body: 'id=1&include%5B0%5D=test1&include%5B1%5D=test2',
    }

    const result = await fetch('', 'test', { id: 1, include: ['test1', 'test2'] }, 'POST')

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith('test', expectedRequest)
  })

  test('should append a unix timestamp to the request URL when cache mode is no-store', async () => {
    const cacheMode = 'no-store'
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }
    const expectedRequest = {
      method: 'GET',
      headers: {},
      cache: cacheMode,
    }
    const timestamp = 974851200000

    MockDate.set(timestamp)
    setMockFetchResult(JSON.stringify(data))

    const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith(
      `test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`,
      expectedRequest
    )
  })

  test('should append a unix timestamp to the request URL when cache mode is reload', async () => {
    const cacheMode = 'reload'
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }
    const expectedRequest = {
      method: 'GET',
      headers: {},
      cache: cacheMode,
    }
    const timestamp = 974851200000

    MockDate.set(timestamp)
    setMockFetchResult(JSON.stringify(data))

    const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith(
      `test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`,
      expectedRequest
    )
  })
  test('should append a unix timestamp to the request URL when cache mode is no-cache', async () => {
    const cacheMode = 'no-cache'
    const data = {
      status: 'ok',
      data: { recipe: 'Test Recipe' },
    }
    const expectedRequest = {
      method: 'GET',
      headers: {},
      cache: cacheMode,
    }
    const timestamp = 974851200000

    MockDate.set(timestamp)

    setMockFetchResult(JSON.stringify(data))

    const result = await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)

    expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
    expect(mockFetch).toHaveBeenCalledWith(
      `test?id=1&include%5B0%5D=test1&include%5B1%5D=test2&_=${timestamp}`,
      expectedRequest
    )
  })

  test('should throw a string if an Error is thrown from the fetch', async () => {
    const cacheMode = 'no-cache'

    setMockFetchResult('lol', 500)

    let errorThrown = false

    try {
      await fetch('', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode)
    } catch (err) {
      expect(err.message).toEqual('An error occurred, please try again.')
      errorThrown = true
    }

    expect(errorThrown).toEqual(true)
  })

  describe('timeout', () => {
    const cacheMode = 'no-cache'
    const data = {
      status: 'ok',
      data: {
        recipe_title: 'Test',
        meat_ingredients: [
          'chicken',
          'prawn_with_shell',
        ],
        nutInfo: {
          e_nergy: 100,
        },
      },
    }
    const expected = {
      recipeTitle: 'Test',
      meatIngredients: [
        'chicken',
        'prawn_with_shell',
      ],
      nutInfo: {
        eNergy: 100,
      },
    }

    beforeEach(() => {
      PromiseTimeout.timeout = jest.fn().mockResolvedValue({
        text: () => JSON.stringify(data),
        status: 200,
      })
    })

    test('should allow timeout to be sent', async () => {
      const timeout = 100
      const result = await fetch('token', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode, {}, timeout)
      expect(result).toEqual({ data: expected, meta: null })
      expect(PromiseTimeout.timeout.mock.calls[0][1]).toBe(100)
    })

    test('should apply a default timeout', async () => {
      const timeout = null
      const result = await fetch('token', 'test/', { id: 1, include: ['test1', 'test2'] }, 'GET', cacheMode, {}, timeout)
      expect(result).toEqual({ data: expected, meta: null })

      expect(PromiseTimeout.timeout.mock.calls[0][1]).toBe(50000)
    })
  })

  describe('useOverwriteRequestMethod', () => {
    const data = {
      status: 'ok',
      data: {
        recipe_title: 'Test',
        meat_ingredients: [
          'chicken',
          'prawn_with_shell',
        ],
        nutInfo: {
          e_nergy: 100,
        },
      },
    }
    const expected = {
      recipeTitle: 'Test',
      meatIngredients: [
        'chicken',
        'prawn_with_shell',
      ],
      nutInfo: {
        eNergy: 100,
      },
    }

    beforeEach(() => {
      PromiseTimeout.timeout = jest.fn().mockResolvedValue({
        text: () => JSON.stringify(data),
        status: 200,
      })
    })

    test('should allow requests for PUT to be sent', async () => {
      const useOverwriteRequestMethod = false

      const result = await fetch(
        'token',
        'url/',
        { id: 1, include: ['test1', 'test2'] },
        'PUT',
        cacheDefault,
        headerDefault,
        timeoutDefault,
        includeCookiesDefault,
        useMenuServiceDefault,
        useOverwriteRequestMethod
      )

      expect(result).toEqual({ data: expected, meta: null })
      expect(mockFetch).toHaveBeenCalledWith('url', {
        body: 'id=1&include%5B0%5D=test1&include%5B1%5D=test2',
        cache: 'default',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'PUT'
      })
    })
  })

  describe('in the browser', () => {
    beforeEach(() => {
      isServer.mockReturnValue(false)
    })

    test('does not set API-Token request header', async () => {
      await fetch('token', 'test')

      expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
        cache: 'default',
        headers: {
          Authorization: 'Bearer token',
        },
        method: 'GET',
      })
    })
  })

  describe('when on server', () => {
    beforeEach(() => {
      isServer.mockReturnValue(true)
    })

    describe('in production', () => {
      beforeEach(() => {
        isProd.mockReturnValue(true)
      })

      test('sets API-Token request header', async () => {
        await fetch('token', 'test')

        expect(mockFetch).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            headers: expect.objectContaining({
              'API-Token': 'mock-api-token'
            })
          })
        )
      })
    })

    describe('not in production', () => {
      beforeEach(() => {
        isProd.mockReturnValue(false)
      })

      test('does not set API-Token request header', async () => {
        await fetch('token', 'test')

        expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
          cache: 'default',
          headers: {
            Authorization: 'Bearer token',
          },
          method: 'GET',
        })
      })
    })
  })
})
