import sinon from 'sinon'

import globals from 'config/globals'
import Cookies from 'cookies-js'
import { Cookies as GoustoCookies } from 'utils/GoustoCookies'

Cookies.defaults = {
  ...Cookies.defaults,
  somethingElse: 'set',
}

describe('GoustoCookies', () => {
  let globalsStub

  beforeEach(() => {
    globalsStub = sinon.stub(globals, 'secure').get(() => true)
  })

  afterEach(() => {
    globalsStub.reset()
  })

  test('should return Cookies', () => {
    expect(GoustoCookies).toEqual(Cookies)
  })

  test('should set defaults.secure to correct value from config', () => {
    expect(GoustoCookies.defaults.secure).toEqual(true)
  })

  test('should set defaults.path to "/"', () => {
    expect(GoustoCookies.defaults.path).toEqual('/')
  })

  test('should not overried Cookies defaults', () => {
    expect(GoustoCookies.defaults.somethingElse).toEqual('set')
  })
})
