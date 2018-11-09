import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Immutable from 'immutable'

import * as clientAuthorise from 'utils/clientAuthorise'

import authActions from 'actions/auth'

chai.use(sinonChai)

describe('clientAuthorise', function () {
  describe('authorise', function () {
    let store
    let sandbox
    const cookies = {}
    let authValidateStub
    let userAuthenticatedStub

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      authValidateStub = sandbox.stub(authActions, 'authValidate')
      userAuthenticatedStub = sandbox.stub(authActions, 'userAuthenticated')
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should call authValidate when auth token is not falsy', async function () {
      store = {
        getState: () => ({ auth: Immutable.fromJS({ accessToken: 'a-token' }) }),
        dispatch: sinon.stub().returns(new Promise(resolve => {
          resolve()
        })),
      }

      await clientAuthorise.authorise(store, cookies)

      expect(authValidateStub).to.have.been.calledOnce
      expect(authValidateStub.getCall(0).args).to.deep.equal(['a-token', undefined, undefined])
    })

    it('should call authValidate when auth refresh token is not falsy', async function () {
      store = {
        getState: () => ({ auth: Immutable.fromJS({ refreshToken: 'r-token' }) }),
        dispatch: sinon.stub().returns(new Promise(resolve => {
          resolve()
        })),
      }

      await clientAuthorise.authorise(store, cookies)

      expect(authValidateStub).to.have.been.calledOnce
      expect(authValidateStub.getCall(0).args).to.deep.equal([undefined, 'r-token', undefined])
    })

    it('should NOT call authValidate when no auth or refresh token', async function () {
      store = {
        getState: () => ({ auth: Immutable.fromJS({}) }),
        dispatch: sinon.stub().returns(new Promise(resolve => {
          resolve()
        })),
      }

      await clientAuthorise.authorise(store, cookies)

      expect(authValidateStub).not.to.have.been.called
    })

    it('should clear the auth state if authValidate throws an error', async function () {
      store = {
        getState: () => ({ auth: Immutable.fromJS({ refreshToken: 'r-token' }) }),
        dispatch: sinon.stub().returns(new Promise((resolve, reject) => {
          reject()
        })),
      }

      await clientAuthorise.authorise(store, cookies)

      expect(authValidateStub).to.have.been.calledOnce
      expect(authValidateStub.getCall(0).args).to.deep.equal([undefined, 'r-token', undefined])
      expect(userAuthenticatedStub).to.have.been.calledOnce
    })
  })
})
