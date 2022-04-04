import { getProtocol } from 'utils/isomorphicEnvironment'
import Cookies from 'cookies-js'

jest.mock('utils/isomorphicEnvironment')

Cookies.defaults = {
  ...Cookies.defaults,
  somethingElse: 'set',
}

describe('GoustoCookies', () => {
  let GoustoCookies

  beforeEach(() => {
    getProtocol.mockReturnValue(true)
    // eslint-disable-next-line global-require
    GoustoCookies = require('utils/GoustoCookies').default
  })

  afterEach(() => {
    getProtocol.mockReset()
  })

  test('should return Cookies', () => {
    expect(GoustoCookies).toEqual(Cookies)
  })

  test('should set defaults.path to "/"', () => {
    expect(GoustoCookies.defaults.path).toEqual('/')
  })

  test('should not overried Cookies defaults', () => {
    expect(GoustoCookies.defaults.somethingElse).toEqual('set')
  })
})
