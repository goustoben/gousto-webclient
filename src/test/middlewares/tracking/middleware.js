import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable'
import trackingMiddleware from 'middlewares/tracking/middleware'

describe('middlewares/trackingMiddleware', () => {
  let trackerSpy
  let getStateSpy
  let middleware
  let nextSpy
  beforeEach(() => {
    trackerSpy = sinon.spy()
    nextSpy = sinon.spy()
    middleware = trackingMiddleware(trackerSpy)
    getStateSpy = sinon.stub().returns({
      routing: {
        locationBeforeTransitions: {
          pathname: '/menu',
        },
      },
      user: Immutable.Map({
        goustoReference: '123-123-123',
      }),
    })
  })
  describe('trackingMiddleware', () => {
    it('should call the given next argument', () => {
      middleware({ getState: getStateSpy })(nextSpy)({})
      expect(nextSpy).to.have.been.calledOnce
    })
    it('should not call tracker if there\'s no tracking data on the action', () => {
      middleware({ getState: getStateSpy })(nextSpy)({})
      expect(nextSpy).to.have.been.calledOnce
      expect(trackerSpy).not.to.have.been.called
    })
    it('should call tracker if there is tracking data on the action', () => {
      middleware({ getState: getStateSpy })(nextSpy)({ trackingData: {} })
      expect(nextSpy).to.have.been.calledOnce
      expect(trackerSpy).to.have.been.called
    })
    it('should grab the pathname from the state and pass it to tracker if there is tracking data on the action before calling tracker', () => {
      middleware({ getState: getStateSpy })(nextSpy)({ trackingData: { a: 'b' } })
      expect(nextSpy).to.have.been.calledOnce
      expect(getStateSpy).to.have.been.calledOnce
      expect(trackerSpy).to.have.been.calledOnce
      expect(trackerSpy.getCall(0).args[0]).to.deep.equal({ a: 'b' })
      expect(trackerSpy.getCall(0).args[1]).to.deep.equal({ pathname: '/menu' })
    })
  })
})

describe('middlewares/trackingMiddleware Version 2', () => {
  let trackerSpy
  let getStateSpy
  let middleware
  let nextSpy
  beforeEach(() => {
    trackerSpy = sinon.spy()
    nextSpy = sinon.spy()
    middleware = trackingMiddleware(trackerSpy, 'v2')
    getStateSpy = sinon.stub().returns({
      routing: {
        locationBeforeTransitions: {
          pathname: '/menu',
        },
      },
      user: Immutable.Map({
        goustoReference: '123-123-123',
      }),
    })
  })

  it('should call the given next argument', () => {
    middleware({ getState: getStateSpy })(nextSpy)({})
    expect(nextSpy).to.have.been.calledOnce
    expect(trackerSpy).to.have.been.calledOnce
  })
})
