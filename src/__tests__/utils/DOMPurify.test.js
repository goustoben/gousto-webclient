import sinon from 'sinon'

import DOMPurify from 'dompurify'
import * as DOMPurifyUtil from 'utils/DOMPurify'
import globals from 'config/globals'

describe('DOMPurify util', () => {
  let sandbox
  let jsdomSpy

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    jsdomSpy = sandbox.spy(DOMPurifyUtil, 'getDOMPurify')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return DOMPurify by default', function() {
    expect(DOMPurifyUtil.default).toEqual(DOMPurify)
  })

  it('should not call jsdom if on client', function() {
    sinon.stub(globals, 'server').get(function() {
      return false
    })
    expect(jsdomSpy.callCount).toEqual(0)
  })

  it('should call jsdom once if on server', function() {
    sinon.stub(globals, 'server').get(function() {
      return true
    })
    DOMPurifyUtil.getDOMPurify()
    expect(jsdomSpy.callCount).toEqual(1)
  })
})
