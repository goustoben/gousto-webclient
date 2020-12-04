import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../../context'
import { Resubscribe } from '../Resubscribe'
import { useFetch } from '../../../../../../../hooks/useFetch'

import { flushPromises } from '../../../../../../../_testing/utils'

let wrapper

const mockDispatch = jest.fn()

const mountWithProps = (props) => {
  wrapper = mount(
    <Resubscribe accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: mockDispatch } }
    }
  )

  wrapper.update()
}

jest.mock('../../../../../../../hooks/useFetch')
jest.mock('config/endpoint', () => () => 'localhost')

const mockSuccessfulResponse = { status: 'ok', result: { data: 'SUCCESS' } }
const mockErrorResponse = { status: 'ok', result: { data: 'ERROR' } }

describe('Resubscribe', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    useFetch.mockReturnValue([])
    mountWithProps()
  })

  describe('When I click the Resubscribe CTA', () => {
    beforeEach(async () => {
      useFetch.mockReturnValue([false, mockSuccessfulResponse, false])

      mountWithProps()

      await act(async () => {
        wrapper
          .find('[data-testing="resubscribe-cta"]')
          .simulate('click')

        // Have to wait for setTimeout on dispatch to complete
        // Required to avoid setting state on unmounted component
        await flushPromises()
      })

      wrapper.update()
    })

    test('Then useFetch is invoked as expected', () => {
      expect(useFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'localhost/user/current/subscription/activate',
          needsAuthorization: true,
          accessToken: 'foo',
          options: {
            method: 'PUT',
          },
        })
      )
    })

    describe('And the request is successful', () => {
      test('Then the expected action is dispatched', () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          data: 'SUCCESS',
          type: 'SUBSCRIPTION_STATUS_UPDATE_RECEIVED'
        })
      })
    })

    describe('And the request is unsuccessful', () => {
      beforeEach(async () => {
        useFetch.mockReturnValue([false, mockErrorResponse, false])

        mountWithProps()

        await act(async () => {
          wrapper
            .find('[data-testing="resubscribe-cta"]')
            .simulate('click')

          await flushPromises()
        })

        wrapper.update()
      })

      test('Then the expected action is dispatched', () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          data: 'ERROR',
          type: 'SUBSCRIPTION_STATUS_UPDATE_RECEIVED'
        })
      })
    })
  })
})
