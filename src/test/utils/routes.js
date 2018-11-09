import Immutable from 'immutable'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { checkValidSession, checkGuest } from "../../src/utils/routes"
import { isPage, isOneOfPage } from 'utils/routes'

function reduxStoreMock(isAuthenticated) {
  return {
    getState() {
      return {
        auth: Immutable.fromJS({
          isAuthenticated: isAuthenticated
        })
      }
    }
  }
}

describe('utils/routes', () => {

  describe('check valid session behaviour when user is not logged in', () => {
    let mockStore, replaceSpy, nextSpy
    beforeEach(() => {
      mockStore = reduxStoreMock(false)
      replaceSpy = sinon.spy()
      nextSpy = sinon.spy()
    })

    it('call "replace" with a new url if user IS NOT authenticated', () => {
      const onEnterFn = checkValidSession(mockStore, '/')
      const nextLocation = {
        location: {
          pathname: '/menu'
        }
      }
      onEnterFn(nextLocation, replaceSpy, nextSpy)

      expect(replaceSpy.withArgs('/').calledOnce).to.be.true
      expect(nextSpy.calledOnce).to.be.true
    })

    xit('call replace adding a target query string', () => {
      const onEnterFn = checkValidSession(mockStore, '/menu', true)
      const nextLocation = {
        location: {
          pathname: '/my-subscription'
        }
      }
      onEnterFn(nextLocation, replaceSpy, nextSpy)
      expect(replaceSpy.withArgs("/menu?target=/my-subscription#login").calledOnce).to.be.true
      expect(nextSpy.calledOnce).to.be.true
    })
  })

  describe('checkGuest session', () => {
    let replaceSpy, nextSpy
    beforeEach(() => {
      replaceSpy = sinon.spy()
      nextSpy = sinon.spy()
    })
    it ('call replace with next location when the user is logged in', () => {
      const mockStore = reduxStoreMock(true)
      const onEnter = checkGuest(mockStore, '/menu')
      onEnter({}, replaceSpy, nextSpy)

      expect(replaceSpy).to.be.calledWith('/menu')
      expect(replaceSpy).to.be.calledOnce
      expect(nextSpy).to.be.calledOnce
    })

    it ('dont call when the user is not logged in', () => {
      const mockStore = reduxStoreMock(false)
      const onEnter = checkGuest(mockStore, '/menu')
      onEnter({}, replaceSpy, nextSpy)

      expect(replaceSpy.neverCalledWith('/menu')).to.be.true
      expect(replaceSpy).to.be.not.calledOnce
      expect(nextSpy).to.be.calledOnce
    })
  })

  describe('check valid session behaviour when user IS logged in', () => {
    let mockStore, replaceSpy, nextSpy
    beforeEach(() => {
      mockStore = reduxStoreMock(true)
      replaceSpy = sinon.spy()
      nextSpy = sinon.spy()
    })

    it('will just call next, because user is logged in', () => {
      const onEnterFn = checkValidSession(mockStore, '/')
      const nextLocation = {
        location: {
          pathname: '/menu',
        },
      }
      onEnterFn(nextLocation, replaceSpy, nextSpy)

      expect(replaceSpy.neverCalledWith('/')).to.be.true
      expect(replaceSpy.called).to.be.false
      expect(nextSpy.calledOnce).to.be.true
    })
  })

  describe('isPage', function() {
    it('should return true if pathName matches configured route with given pageKey', function() {
      expect(isPage('/my-deliveries', 'myDeliveries')).to.be.true
      expect(isPage('/my-gousto', 'myGousto')).to.be.true
    })

    it('should return false if pathName does NOT match configured route with given pageKey', function() {
      expect(isPage('/', 'myGousto')).to.be.false
      expect(isPage('/my-gousto-2', 'myGousto')).to.be.false
      expect(isPage('/any-url', 'nonexistent-key')).to.be.false
    })
  })

  describe('isOneOfPage', function() {
    it('should return true if pathName matches configured route with given pageKey for any item in pageKeys array', function() {
      expect(isOneOfPage('/my-deliveries', ['myDeliveries'])).to.be.true
      expect(isOneOfPage('/my-gousto', ['myDeliveries', 'myGousto'])).to.be.true
    })

    it('should return false if pathName does NOT match configured route with given pageKey for any items in pageKeys array', function() {
      expect(isOneOfPage('/my-gousto', ['myDeliveries'])).to.be.false
      expect(isOneOfPage('/', ['myDeliveries', 'myGousto'])).to.be.false
    })
  })
})
