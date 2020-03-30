import Immutable from 'immutable'
import MockDate from 'mockdate'
import PromiseTimeout from 'promise-timeout'

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

describe('fetch', () => {
  // this require here is needed, rather than an import
  // so that the jest.mocks are set up in time
  const { fetch } = require('../fetch')

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

  describe('experiments in fetch parameters', () => {
    beforeEach(() => {
      const data = {
        status: 'ok',
        data: { recipe: 'Test Recipe' },
      }

      setMockFetchResult(JSON.stringify(data))
      mockGetState.mockReturnValue({
        features: Immutable.fromJS({
          feature1: {
            value: 'feature1Value',
            experiment: true,
          },
          feature2: {
            value: 'feature2Value',
            experiment: false,
          },
          feature3: {
            value: true,
            experiment: true,
          },
        }),
      })
    })
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

      expect(PromiseTimeout.timeout.mock.calls[0][1]).toBe(5000)
    })
  })
})
