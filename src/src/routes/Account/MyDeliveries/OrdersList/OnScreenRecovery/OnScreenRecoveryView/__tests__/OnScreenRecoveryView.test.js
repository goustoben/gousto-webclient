import React from 'react'
import { shallow, mount } from 'enzyme'

import { OnScreenRecoveryView } from '../OnScreenRecoveryView'

jest.mock('components/Overlay', () => 'Overlay')

describe('Order Skip Recovery Modal', () => {
  let wrapper
  let mountWrapper

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Alternative Render', () => {
    const getRecoveryContent = jest.fn()

    beforeEach(() => {
      wrapper = shallow(
        <OnScreenRecoveryView
          triggered={false}
          getRecoveryContent={getRecoveryContent}
          onConfirm={() => { }}
          onKeep={() => { }}
          onClick={() => { }}
          modalVisibilityChange={() => { }}
        />
      )
    })

    describe('when triggered is set from false to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          triggered: true,
        })

        wrapper.update()
      })

      test('should call getRecoveryContent', () => {
        expect(getRecoveryContent).toHaveBeenCalled()
      })

      describe('and modal X is clicked', () => {
        const mockModalVisibilityChange = jest.fn()

        beforeEach(() => {
          mountWrapper = mount(<OnScreenRecoveryView
            triggered={false}
            getRecoveryContent={getRecoveryContent}
            onConfirm={() => { }}
            onKeep={() => { }}
            onClick={() => { }}
            modalVisibilityChange={mockModalVisibilityChange}
          />)

          mountWrapper.setProps({
            triggered: true,
          })

          mountWrapper.update()

          mountWrapper
            .find('[data-testing="modal-close-button"]')
            .simulate('click')
        })

        test('then modalVisibilityChange is invoked as expected', () => {
          expect(mockModalVisibilityChange).toHaveBeenCalledWith({ modalVisibility: false })
        })
      })
    })

    describe('when triggered is set from true to false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <OnScreenRecoveryView
            triggered
            getRecoveryContent={getRecoveryContent}
            onConfirm={() => { }}
            onKeep={() => { }}
            onClick={() => { }}
            modalVisibilityChange={() => { }}
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
