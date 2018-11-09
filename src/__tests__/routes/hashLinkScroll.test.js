import hashLink from 'routes/hashLinkScroll'
import sinon from 'sinon'

const windowUtils = require('utils/window')

describe('hashLink', () => {
  let sandbox
  // eslint-disable-next-line no-unused-vars
  let windowLocationStub
  // eslint-disable-next-line no-unused-vars
  let getElementStub

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    getElementStub = sandbox.stub(windowUtils, 'getDocumentElement').returns({
      scrollIntoView() {
        return true
      },
    })
  })
  afterEach(() => {
    sandbox.restore()
  })

  test('should call scrollIntoView when # is found in window location', () => {
    windowLocationStub = sandbox
      .stub(windowUtils, 'windowLocation')
      .returns({ hash: '#openings' })
    const hl = hashLink()
    expect(hl).toEqual(true)
  })

  test('should not call scrollIntoView when # is not found in window location', () => {
    windowLocationStub = sandbox
      .stub(windowUtils, 'windowLocation')
      .returns({ hash: '' })
    const hl = hashLink()
    expect(hl).toEqual(false)
  })
})
