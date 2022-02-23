import { hashLinkScroll } from 'routes/hashLinkScroll'
import sinon from 'sinon'
import { canUseWindow } from 'utils/browserEnvironment'

const windowUtils = require('utils/window')

jest.mock('utils/browserEnvironment')

describe('hashLinkScroll', () => {
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
    canUseWindow.mockReturnValue(true)
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should call scrollIntoView when # is found in window location', () => {
    windowLocationStub = sandbox
      .stub(windowUtils, 'windowLocation')
      .returns({ hash: '#openings' })
    const hl = hashLinkScroll()
    expect(hl).toEqual(true)
  })

  test('should not call scrollIntoView when # is not found in window location', () => {
    windowLocationStub = sandbox
      .stub(windowUtils, 'windowLocation')
      .returns({ hash: '' })
    const hl = hashLinkScroll()
    expect(hl).toEqual(false)
  })

  test('should return false if window is not available', () => {
    canUseWindow.mockReturnValue(false)

    expect(hashLinkScroll()).toEqual(false)
  })
})
