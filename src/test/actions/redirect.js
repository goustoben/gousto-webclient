/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'

describe('redirect actions', function() {
  describe('redirect', function() {
    it('should dispatch SERVER_REDIRECT action type, URL and clearCookies params if __SERVER__', function() {
      const redirectSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&utils/window!actions/redirect')({
        'config/globals': {
          client: false,
          server: true,
          legacy: () => false,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
      }).default

      const result = redirectActions.redirect('/menu', true)
      expect(result).to.deep.equal({
        type: actionTypes.SERVER_REDIRECT,
        url: '/menu',
        clearCookies: true,
      })

      expect(redirectSpy).not.to.have.been.called
    })

    it('should called react-router-redux::push if running in client side mode', function() {
      const redirectSpy = sinon.stub()
      const reduxRouterPushSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&react-router-redux&utils/window!actions/redirect')({
        'config/globals': {
          client: true,
          legacy: () => false,
        },
        'react-router-redux': {
          push: reduxRouterPushSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
      }).default

      redirectActions.redirect('/menu', true)
      expect(reduxRouterPushSpy).to.be.calledWithExactly('/menu')
      expect(redirectSpy).not.to.have.been.called
    })

    it('should fall back to calling the redirect util', function() {
      const redirectSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&utils/window!actions/redirect')({
        'config/globals': {
          client: undefined,
          server: undefined,
          legacy: () => undefined,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
      }).default

      redirectActions.redirect()
      expect(redirectSpy).to.have.been.calledOnce
    })
  })

  describe('replace', function() {
    it('should dispatch SERVER_REPLACE action type and URL if __SERVER__', function() {
      const replaceSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&utils/window!actions/redirect')({
        'config/globals': {
          client: false,
          server: true,
          legacy: () => false,
        },
        'utils/window': {
          redirect: replaceSpy,
        },
      }).default

      const result = redirectActions.replace('/menu', true)
      expect(result).to.deep.equal({
        type: actionTypes.SERVER_REPLACE,
        url: '/menu',
      })

      expect(replaceSpy).not.to.have.been.called
    })

    it('should called react-router-redux::replace if running in client side mode', function() {
      const replaceSpy = sinon.stub()
      const reduxRouterReplaceSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&react-router-redux&utils/window!actions/redirect')({
        'config/globals': {
          client: true,
          legacy: () => false,
        },
        'react-router-redux': {
          replace: reduxRouterReplaceSpy,
        },
        'utils/window': {
          replace: replaceSpy,
        },
      }).default

      redirectActions.replace('/menu', true)
      expect(reduxRouterReplaceSpy).to.be.calledWithExactly('/menu')
      expect(replaceSpy).not.to.have.been.called
    })

    it('should fall back to calling the replace util', function() {
      const replaceSpy = sinon.stub()
      const redirectActions = require('inject-loader?config/globals&utils/window!actions/redirect')({
        'config/globals': {
          client: undefined,
          server: undefined,
          legacy: () => undefined,
        },
        'utils/window': {
          replace: replaceSpy,
        },
      }).default

      redirectActions.replace()
      expect(replaceSpy).to.have.been.calledOnce
    })
  })
})
