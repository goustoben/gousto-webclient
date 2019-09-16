import Immutable from 'immutable'
import MockDate from 'mockdate'

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

describe('fetch', function () {
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

  afterEach(function () {
    MockDate.reset()
    mockFetch.mockReset()
    mockGetState.mockReset()
  })

  test('should return with JSON', async function () {
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

  test('should return with error if response has not ok status', async function () {
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

  test('should return with error if response is not in a recognised JSON format', async function () {
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

  test('should return with error if response is not a JSON string', async function () {
    setMockFetchResult('not json')

    try {
      await fetch('token', 'test')
    } catch (err) {
      expect(err.message).toEqual('An error occurred, please try again.')
    }
  })

  test('should not have body set for GET requests', async function () {
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

  test('should have correct querystring set for GET requests', async function () {
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

  describe('experiments in fetch parameters', function () {
    beforeEach(function () {
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

    test('should include features flagged as experiments in querystring by default', async function () {
      const result = await fetch('', 'test/')

      expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
      const expectedRequest = {
        method: 'GET',
        headers: {},
        cache: 'default',
      }
      expect(mockFetch).toHaveBeenCalledWith(
        'test?experiments%5Bfeature1%5D=feature1Value&experiments%5Bfeature3%5D=true',
        expectedRequest
      )
    })

    test('should NOT include features flagged as experiments in querystring if indicated so', async function () {
      const result = await fetch('', 'test/', {}, 'GET', 'default', {}, null, false, false)

      expect(result).toEqual({ data: { recipe: 'Test Recipe' }, meta: null })
      const expectedRequest = {
        method: 'GET',
        headers: {},
        cache: 'default',
      }

      expect(mockFetch).toHaveBeenCalledWith('test', expectedRequest)
    })
  })

  test('should have body and content-type set for non-GET requests', async function () {
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

  test('should append a unix timestamp to the request URL when cache mode is no-store', async function () {
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

  test('should append a unix timestamp to the request URL when cache mode is reload', async function () {
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
  test('should append a unix timestamp to the request URL when cache mode is no-cache', async function () {
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

  test('should throw a string if an Error is thrown from the fetch', async function () {
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
})
