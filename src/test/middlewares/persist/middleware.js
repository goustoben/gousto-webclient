import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('middlewares/persistenceMiddleware', function() {
  let persistSpy
  let getStateSpy
  let middleware
  let nextSpy
  let whitelist
  let state
  let cookie
  beforeEach(function() {
    persistSpy = sinon.spy()
    const persistenceMiddleware = require('inject-loader?./persistStore!middlewares/persist/middleware')({
      './persistStore': {
        persist: persistSpy,
      },
    }).default
    whitelist = { athing: 'anotherthing' }
    cookie = { cookie1: 'value' }
    middleware = persistenceMiddleware(whitelist, cookie)
    state = { basket: 'orsomething' }
    getStateSpy = sinon.stub().returns(state)
    nextSpy = sinon.spy()
  })
  describe('persistenceMiddleware', function() {
    it('should call the given next argument', async function() {
      await middleware({ getState: getStateSpy })(nextSpy)({})

      expect(nextSpy).to.have.been.calledOnce
    })
    it('should call persist with the state and whitelist', async function() {
      await middleware({ getState: getStateSpy })(nextSpy)(whitelist)

      expect(persistSpy).to.have.been.calledOnce
      expect(persistSpy.args[0][0]).to.deep.equal(state)
      expect(persistSpy.args[0][1]).to.deep.equal(whitelist)
      expect(persistSpy.args[0][2]).to.deep.equal(cookie)
    })
  })
})
