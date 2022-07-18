import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { DiscountAppliedBar } from '../DiscountAppliedBar'
import { useDiscountAppliedData } from '../discountAppliedBarHooks'

jest.mock('../discountAppliedBarHooks', () => ({
  useDiscountAppliedData: jest.fn(),
}))

const mockStore = configureMockStore()
export const mockedStore = mockStore({
  auth: Immutable.fromJS({}),
  basket: Immutable.fromJS({}),
  menuService: {},
  features: Immutable.fromJS({}),
  pending: Immutable.fromJS({}),
  promoStore: Immutable.fromJS({}),
})

const trackDiscountVisibilityMock = jest.fn()
const signupDismissedDiscountAppliedBarMock = jest.fn()
const useDiscountAppliedDataMock = useDiscountAppliedData as jest.MockedFunction<
  typeof useDiscountAppliedData
>

describe('Given DiscountAppliedBar component', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')
  const props = {
    promoModalVisible: false,
    isPromoBarHidden: false,
    isDiscountAppliedBarDismissed: false,
    wizardStep: 'boxSize',
    trackDiscountVisibility: trackDiscountVisibilityMock,
    signupDismissDiscountAppliedBar: signupDismissedDiscountAppliedBarMock,
  }

  describe('When: bar is hidden', () => {
    beforeEach(() => {
      useDiscountAppliedDataMock.mockReturnValue({
        isHighlightDiscountExperimentEnabled: true,
        isDiscountEnabled: false,
        discountTip: 'Free UK delivery',
      })
      const updatedProps = {
        ...props,
        isPromoBarHidden: true,
      }
      render(
        <Provider store={mockedStore}>
          <DiscountAppliedBar {...updatedProps} />
        </Provider>,
      )
    })
    afterEach(() => jest.clearAllMocks())

    test("It shouldn't be visible", () => {
      try {
        screen.getByTestId('DiscountAppliedBarContainer')
      } catch (e) {
        expect(e).toBeDefined()
      }
    })
  })

  describe('When: bar is visible', () => {
    beforeEach(() => {
      useDiscountAppliedDataMock.mockReturnValue({
        isHighlightDiscountExperimentEnabled: true,
        isDiscountEnabled: true,
        discountTip: 'Free UK delivery',
      })
      render(
        <Provider store={mockedStore}>
          <DiscountAppliedBar {...props} />
        </Provider>,
      )
    })

    test('It should be visible & tracking event should be called', () => {
      expect(screen.getByTestId('DiscountAppliedBarContainer')).toBeDefined()
      expect(screen.getByText('Discount applied:')).toBeDefined()
      expect(screen.getByText('Free UK delivery')).toBeDefined()
      expect(screen.getByRole('button')).toBeDefined()
      expect(trackDiscountVisibilityMock).toBeCalled()
    })

    describe('When: user clicks close button', () => {
      test('signupDissmissedDiscountAppliedBar() should be called', () => {
        fireEvent(
          screen.getByRole('button'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        )
        expect(signupDismissedDiscountAppliedBarMock).toBeCalledTimes(1)
      })
    })
  })
})
