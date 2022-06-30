import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import * as subscriptionToast from '../../../hooks/useSubscriptionToast'
import { useUpdateSubscription } from '../../../hooks/useUpdateSubscription'
import { DummyModal } from '../DummyModal'

jest.mock('../../../hooks/useUpdateSubscription')

let wrapper
const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')

const mountWithProps = (props) => {
  wrapper = mount(
    <DummyModal {...props} accessToken="access_token" />,
    {
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )

  wrapper.update()
}

describe('Given Dummy is rendered', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    useUpdateSubscription.mockReturnValue([])
    mountWithProps()
  })

  describe('When I click the Save CTA', () => {
    describe('And when data is loaded', () => {
      beforeEach(() => {
        useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
        act(() => {
          wrapper
            .find('[data-testing="save-4x4-cta"]')
            .simulate('click')
        })

        wrapper.update()
      })

      test('Then useUpdateSubscription should be invoked', () => {
        const mockCalls = useUpdateSubscription.mock.calls
        const [lastMockArgs] = mockCalls[mockCalls.length - 1]

        expect(lastMockArgs.data).toEqual({
          num_recipes: '4',
          num_portions: '4'
        })

        expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
      })

      describe('And the update is a successful', () => {
        beforeEach(() => {
          useUpdateSubscription.mockReturnValueOnce([false, { data: '123' }, false])
        })

        test('Then useSubscriptionToast is invoked', () => {
          expect(useSubscriptionToastSpy).toHaveBeenCalledWith({ data: '123' }, false)
        })
      })

      describe('And the update errors', () => {
        beforeEach(() => {
          useUpdateSubscription.mockReturnValue([false, false, true])
          act(() => {
            wrapper
              .find('[data-testing="save-4x4-cta"]')
              .simulate('click')
          })

          wrapper.update()
        })

        test('Then useSubscriptionToast is invoked', () => {
          expect(useSubscriptionToastSpy).toHaveBeenCalledWith(false, true)
        })
      })
    })
  })
})
