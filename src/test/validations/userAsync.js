import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import userAsyncValidation from 'validations/userAsync'
import * as apiAuth from 'apis/auth'

chai.use(sinonChai)

describe('validations/userAsync', () => {
  const values = { aboutyou: { password: 'a-super-secret-pass' } }
  const sandbox = sinon.sandbox.create()
  let validateUserPasswordStub

  beforeEach(() => {
    validateUserPasswordStub = sandbox.stub(apiAuth, 'validateUserPassword').returns(new Promise(resolve => { resolve() }))
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should validate the password', () => {
    return userAsyncValidation(values).then(() => {
      expect(validateUserPasswordStub).to.have.been.calledOnce
      expect(validateUserPasswordStub).to.have.been.calledWithExactly('a-super-secret-pass')
    })
  })

  it('should pass validation', () => {
    return userAsyncValidation(values).catch(() => {
      throw new Error('but password validation failed')
    })
  })

  it('should not pass validation and return a spceific error object', () => {
    validateUserPasswordStub.returns(new Promise((resolve, reject) => { reject({ code: 'validation-error' }) }))

    return userAsyncValidation(values)
      .then(() => {
        throw new Error('but password validation succeded')
      })
      .catch(err => {
        expect(err).to.deep.equal({ aboutyou: { password: 'Your password is too easy to guess. Please choose another one.' } })
      })
  })
})
