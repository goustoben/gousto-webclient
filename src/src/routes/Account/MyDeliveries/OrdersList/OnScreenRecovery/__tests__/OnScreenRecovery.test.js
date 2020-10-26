import React from 'react'
import { shallow } from 'enzyme'

import { OnScreenRecovery } from '../OnScreenRecovery'

jest.mock('components/Overlay', () => 'Overlay')

describe('Order Skip Recovery Modal', () => {
  let wrapper
  const keepOrder = jest.fn()
  const cancelPendingOrder = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Initial Render', () => {
    beforeAll(() => {
      wrapper = shallow(
        <OnScreenRecovery
          title="modal title"
          onKeep={keepOrder}
          onConfirm={cancelPendingOrder}
          keepCopy="keep"
          confirmCopy="confirm"
        />
      )
    })
  })

  describe('Alternative Render', () => {
    const getRecoveryContent = jest.fn()

    describe('when triggered is set from false to true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <OnScreenRecovery
            triggered={false}
            getRecoveryContent={getRecoveryContent}
          />
        )

        wrapper.setProps({
          triggered: true,
        })

        wrapper.update()
      })

      test('should call getRecoveryContent', () => {
        expect(getRecoveryContent).toHaveBeenCalled()
      })
    })

    describe('when triggered is set from true to false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <OnScreenRecovery
            triggered
            getRecoveryContent={getRecoveryContent}
          />
        )

        wrapper.setProps({
          triggered: false,
        })

        wrapper.update()
      })

      test('should NOT call getRecoveryContent', () => {
        expect(getRecoveryContent).not.toHaveBeenCalled()
      })
    })
  })
})
