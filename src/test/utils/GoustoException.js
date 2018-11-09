import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import GoustoException from 'utils/GoustoException'

describe('GoustoException', function() {
  it('should return an instance of Error', function() {
    expect(new GoustoException()).to.be.instanceof(Error)
  })

  it('should have name GoustoException', function() {
    const err = new GoustoException()
    expect(err.name).to.equal('GoustoException')
  })

  it('should have message set to empty string by default', function() {
    const err = new GoustoException()
    expect(err.message).to.equal('')
  })

  it('should have message set to value of 1st arg if provided', function() {
    const err = new GoustoException('An error message')
    expect(err.message).to.equal('An error message')
  })

  it('should have error set to empty string by default', function() {
    const err = new GoustoException('An error message')
    const err2 = new GoustoException('An error message', { level: 'warning' })

    expect(err.error).to.equal('')
    expect(err2.error).to.equal('')
  })

  it('should have error set to error passed into options if provided', function() {
    const err = new GoustoException('An error message', { error: 'some-error-key' })
    expect(err.error).to.equal('some-error-key')
  })

  it('should have level set to "error" by default', function() {
    const err = new GoustoException('An error message')
    const err2 = new GoustoException('An error message', { error: 'some-error-key-2' })
    expect(err.level).to.equal('error')
    expect(err2.level).to.equal('error')
  })

  it('should have level set to level passed into options if provided', function() {
    const err = new GoustoException('An error message', { level: 'warning' })
    expect(err.level).to.equal('warning')
  })

  it('should have data set to an empty object by default', function() {
    const err = new GoustoException('An error message')
    expect(err.data).to.deep.equal({})
  })

  it('should have data set to an object containing any additional argumments passed into options', function() {
    const err = new GoustoException('An error message', { level: 'info', a: 1, b: 2 })
    expect(err.data).to.deep.equal({ a: 1, b: 2 })
  })

  it('should have stack trace', function() {
    function traceE() {}

    function traceD() { throw new GoustoException() }

    function traceC() { traceD() }

    function traceB() { traceC(); traceE() }

    function traceA() { traceB() }

    let err

    try {
      traceA()
    } catch (e) {
      err = e
    }
    expect(err.stack).to.contains('GoustoException\n')
    expect(err.stack).to.contain('at traceA')
    expect(err.stack).to.contain('at traceB')
    expect(err.stack).to.contain('at traceC')
    expect(err.stack).to.contain('at traceD')
    expect(err.stack).not.to.contain('at traceE')
  })
})
