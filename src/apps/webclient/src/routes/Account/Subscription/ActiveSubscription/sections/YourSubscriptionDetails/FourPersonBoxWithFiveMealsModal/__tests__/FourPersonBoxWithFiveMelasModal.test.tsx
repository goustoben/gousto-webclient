/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react'

import { ModalProvider } from '@gousto-internal/citrus-react'
import { screen, fireEvent, render } from '@testing-library/react'

import { SubscriptionContext } from '../../../../../context/index'
import { useSubscriptionToast } from '../../../../../hooks/useSubscriptionToast'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import { FourPersonBoxWithFiveMealsModal } from '../FourPersonBoxWithFiveMealsModal'

const dispatchSpy = jest.fn()

jest.mock('../../../../../hooks/useUpdateSubscription')
jest.mock('../../../../../hooks/useSubscriptionToast')

const renderState = (state: any, dispatch: any = () => {}) =>
  render(
    <ModalProvider>
      <SubscriptionContext.Provider value={{ state, dispatch } as any}>
        <FourPersonBoxWithFiveMealsModal accessToken="access-token" />
      </SubscriptionContext.Provider>
    </ModalProvider>,
  )

describe('<FourPersonBoxWithFiveMealsModal />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    ;(useUpdateSubscription as jest.Mock).mockReturnValue([false, true, false])
    ;(useSubscriptionToast as jest.MockedFn<typeof useSubscriptionToast>).mockReturnValue()
  })

  describe('Given a valid subscription setting state', () => {
    beforeEach(() => {
      renderState({ box: { subscriptionSettingsUnsupported: false } })
    })

    test('Then modal is not visible', () => {
      expect(screen.queryByText(`Change to a 4-person box`)).not.toBeInTheDocument()
    })
  })

  describe('Given an invalid subscription setting state', () => {
    beforeEach(() => {
      renderState({ box: { subscriptionSettingsUnsupported: true } }, dispatchSpy)
    })

    test('Then modal is visible with correct title and popup content', () => {
      expect(
        screen.queryByText(`Sorry! We don't offer 5 recipes on a 4-person box`),
      ).toBeInTheDocument()
      expect(screen.queryByText(`Want 5 recipes? Stay on a 2-person box.`)).toBeInTheDocument()
    })

    describe('And Cancel button is clicked', () => {
      beforeEach(async () => {
        fireEvent.click(await screen.findByText('Cancel and get 5 recipes'))
      })

      test('Then UPDATE_SELECTED_BOX_SIZE action is dispatched', async () => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: 'UPDATE_SELECTED_BOX_SIZE',
          data: { numPortions: '2' },
        })
      })

      test('Then API request is not send', async () => {
        expect(useUpdateSubscription).toHaveBeenCalledWith({
          accessToken: 'access-token',
          data: { num_portions: '4', num_recipes: '4' },
          settingName: 'modal_update_to_4x4',
          trigger: {
            setShouldRequest: expect.any(Function),
            shouldRequest: false,
          },
        })
      })
    })

    describe('And "4-person box" button is clicked', () => {
      beforeEach(async () => {
        fireEvent.click(await screen.findByText('Change to a 4-person box'))
      })

      test('Then SWITCH_TO_FOUR_MEALS_PER_BOX action is dispatched', async () => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: 'SWITCH_TO_FOUR_MEALS_PER_BOX',
        })
      })

      test('Then API request is made', () => {
        expect(useUpdateSubscription).toHaveBeenCalledTimes(2)
        expect(useUpdateSubscription).toHaveBeenNthCalledWith(1, {
          accessToken: 'access-token',
          data: { num_portions: '4', num_recipes: '4' },
          settingName: 'modal_update_to_4x4',
          trigger: {
            setShouldRequest: expect.any(Function),
            shouldRequest: false,
          },
        })
        expect(useUpdateSubscription).toHaveBeenNthCalledWith(2, {
          accessToken: 'access-token',
          data: { num_portions: '4', num_recipes: '4' },
          settingName: 'modal_update_to_4x4',
          trigger: {
            setShouldRequest: expect.any(Function),
            shouldRequest: true,
          },
        })
      })

      describe('And server returns success', () => {
        test('Then "useSubscriptionToast" hook is called with correct flags', async () => {
          expect(useSubscriptionToast).toHaveBeenNthCalledWith(2, true, false)
        })
      })
    })

    describe('And "4-person box" button is clicked', () => {
      describe('And server returns error', () => {
        beforeEach(async () => {
          ;(useUpdateSubscription as jest.Mock).mockReturnValue([false, false, true])
          fireEvent.click(await screen.findByText('Change to a 4-person box'))
        })

        test('Then "useSubscriptionToast" hook is called with correct flags', async () => {
          expect(useSubscriptionToast).toHaveBeenNthCalledWith(2, false, true)
        })
      })
    })
  })
})
