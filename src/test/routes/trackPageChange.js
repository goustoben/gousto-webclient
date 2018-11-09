import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('trackPageChange', function() {
  let pageChangeSpy
  let dispatchSpy
  let documentLocation
  let trackPageChange
  let store

  beforeEach(function() {
    pageChangeSpy = sinon.stub().returns('return from pageChangeSpy')
    dispatchSpy = sinon.spy()
    store = {
      dispatch: dispatchSpy,
    }
  })

  it('should dispatch a pageChange action with the href from the document location', function() {
    documentLocation = () => ({
      href: 'jklfds',
    })

    trackPageChange = require('inject-loader!routes/trackPageChange')({
      actions: {
        pageChange: pageChangeSpy,
      },
      'utils/window': {
        documentLocation,
      },
    }).default(store)

    trackPageChange
    expect(pageChangeSpy).to.have.been.calledOnce
    expect(dispatchSpy).to.have.been.calledOnce
    expect(pageChangeSpy.getCall(0).args[0]).to.equal('jklfds')
    expect(dispatchSpy.getCall(0).args[0]).to.equal('return from pageChangeSpy')
  })

  it('should not dispatch a pageChange action if documentLocation returns null', function() {
    documentLocation = () => null
    trackPageChange = require('inject-loader!routes/trackPageChange')({
      actions: {
        pageChange: pageChangeSpy,
      },
      'utils/window': {
        documentLocation,
      },
    }).default(store)
    trackPageChange
    expect(pageChangeSpy).not.to.have.been.called
    expect(dispatchSpy).not.to.have.been.called
  })
})
