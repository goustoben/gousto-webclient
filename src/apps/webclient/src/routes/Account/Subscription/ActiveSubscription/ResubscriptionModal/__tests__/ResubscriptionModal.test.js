import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../context'
import { ResubscriptionModal } from '../ResubscriptionModal'
import { getShowResubscriptionModal } from '../../../context/selectors/subscription'

import { flushPromises } from '../../../../../../_testing/utils'

let wrapper

const mockDispatch = jest.fn()
jest.mock('../../../context/selectors/subscription')

const mountWithPropsAndState = (props, state = { subscription: {} }) => {
  wrapper = mount(
    <ResubscriptionModal {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state, dispatch: mockDispatch } }
    }
  )

  wrapper.update()
}

describe('Given ResubscriptionModal is rendered', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    getShowResubscriptionModal.mockReturnValue(true)
    mountWithPropsAndState({}, { currentUser: { nameFirst: 'mock-name' }, subscription: {}})
  })

  test('Then the expected first name is displayed', () => {
    const headerWrapper = wrapper.find('[data-testing="resub-modal-header"]')

    expect(headerWrapper.text()).toEqual('mock-name, you\'re a subscriber')
  })

  describe('When I click the Choose recipes CTA', () => {
    beforeEach(async () => {
      mountWithPropsAndState()

      await act(async () => {
        wrapper
          .find('[data-testing="choose-recipes-cta"]')
          .simulate('click')

        // Have to wait for setTimeout on dispatch to complete
        // Required to avoid setting state on unmounted component
        await flushPromises()
      })

      wrapper.update()
    })

    test('Then the expected action is dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SUBSCRIPTION_HIDE_RESUBSCRIPTION_MODAL'
      })
    })
  })
})
