import { experiment_setMenuServiceSegment } from './experiment_setMenuServiceSegment'

const COOKIE_NAME = 'gousto_useNewMenuService'
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const TWELVE_HOURS_IN_MS = ONE_DAY_IN_MS / 2

let mockSetCookie
let cookieValue
let useNewMenuService
const getContext = (url, userAgent, {querystring} = {}) => ({
  request: {
    url,
    querystring,
    header: {
      'user-agent': userAgent,
    },
  },
  redirect: jest.fn(),
  cookies: {
    get: () => {
      return cookieValue
    },
    set: mockSetCookie
  },
  query: {
    useNewMenuService: useNewMenuService,
  }
})

describe('experiment_setMenuServiceSegment', () => {
  let ctx
  let next

  beforeEach(() => {
    next = jest.fn()
    mockSetCookie = jest.fn()
    useNewMenuService = 'true'
    cookieValue = undefined
  })

  test('when cookie is undefined it should set the cookie', () => {
    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalled()
  })

  test('when cookie is defined but is an empty string it should set the cookie', () => {
    cookieValue = ''
    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalled()
  })

  test('when cookie is defined and a query string is passed in as "true" then the cookie value will be true', () => {
    cookieValue = 'false'
    useNewMenuService = 'true'

    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalledWith(COOKIE_NAME, 'true', {
      maxAge: TWELVE_HOURS_IN_MS,
      httpOnly: false,
    })
  })

  test('when cookie is defined and a query string is passed in as "false" then the cookie value will be false', () => {
    cookieValue = 'true'
    useNewMenuService = 'false'

    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalledWith(COOKIE_NAME, 'false', {
      maxAge: TWELVE_HOURS_IN_MS,
      httpOnly: false,
    })
  })

  test('when cookie is defined and a query string is passed in as "mouse" then the cookie value will not change', () => {
    cookieValue = 'true'
    useNewMenuService = 'mouse'

    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).not.toHaveBeenCalled()
  })

  test('when useMenuService query is true set the cookie to true', () => {
    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalledWith(COOKIE_NAME, 'true', { maxAge: TWELVE_HOURS_IN_MS, "httpOnly": false, })
  })

  test('when useMenuService query is false set the cookie to false', () => {
    useNewMenuService = 'false'
    ctx = getContext('/', 'N/A')
    experiment_setMenuServiceSegment(ctx, next)

    expect(next).toHaveBeenCalled()
    expect(mockSetCookie).toHaveBeenCalledWith(COOKIE_NAME, 'false', { maxAge: TWELVE_HOURS_IN_MS, "httpOnly": false, })
  })
})
