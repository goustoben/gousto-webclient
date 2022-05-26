import React from 'react'

import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { clickClaimDiscountPopup } from 'actions/trackingKeys'
import { promo } from 'config/home'

import {
  EnterPromoCodeManuallyPage,
  SuccessSection,
  FailureSection,
} from '../EnterPromoCodeManuallyPage'
import { proceedWithPromoCode } from '../enterPromoCodeManuallyUtils'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

jest.mock('../enterPromoCodeManuallyUtils', () => ({
  ...jest.requireActual('../enterPromoCodeManuallyUtils'),
  proceedWithPromoCode: jest.fn(),
}))

describe('EnterPromoCodeManuallyPage', () => {
  let rendered: RenderResult

  const mockStore = configureMockStore()
  const state = {
    basket: Immutable.fromJS({
      recipes: [],
    }),
    pending: Immutable.fromJS({}),
    auth: Immutable.fromJS({
      accessToken: 'test-access-token',
    }),
    menuService: {},
  }
  const mockedStore = mockStore(state)

  describe('when the empty state is rendered', () => {
    beforeEach(() => {
      rendered = render(
        <Provider store={mockedStore}>
          <EnterPromoCodeManuallyPage />
        </Provider>,
      )
    })

    test('then it renders correctly', () => {
      const { getByText, getByTestId } = rendered
      expect(getByText('Enter your discount code!')).toBeDefined()
      expect(getByTestId('enterPromoCodeManuallyInputField')).toBeDefined()
    })
  })

  describe('when the SuccessSection is rendered', () => {
    beforeEach(() => {
      rendered = render(<SuccessSection promoCodeCampaignTextHtml="<p>discount description</p>" />)
    })

    test('then it renders correctly', () => {
      const { getByText } = rendered
      expect(getByText('You got a discount!')).toBeDefined()
      expect(getByText('discount description')).toBeDefined()
    })
  })

  describe('when the FailureSection is rendered', () => {
    beforeEach(() => {
      rendered = render(
        <Provider store={mockedStore}>
          <FailureSection />
        </Provider>,
      )
    })

    test('then it renders correctly', () => {
      const { getByText } = rendered
      expect(getByText('Claim our welcome discount instead!')).toBeDefined()
      expect(getByText(promo.defaultDescriptionLines[0])).toBeDefined()
      expect(getByText('Claim welcome discount')).toBeDefined()
    })

    describe('and when the Claim welcome discount button is pressed', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText('Claim welcome discount'))
      })

      test('then it should proceed with the default promo code', () => {
        expect(proceedWithPromoCode).toHaveBeenCalledWith(
          expect.anything(),
          promo.defaultPromoCode,
          clickClaimDiscountPopup,
        )
      })
    })
  })
})
