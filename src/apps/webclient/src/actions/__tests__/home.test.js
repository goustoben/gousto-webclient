import Immutable from 'immutable'
import { homeGetStarted, applyPromoCodeAndShowModal } from 'actions/home'
import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import { promoChange, promoToggleModalVisibility } from 'actions/promos'

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/tracking', () => ({
  trackGetStarted: jest.fn(),
}))

jest.mock('actions/promos', () => ({
  promoChange: jest.fn(),
  promoToggleModalVisibility: jest.fn(),
}))

jest.mock('utils/home', () => ({
  getPromoBannerState: jest.fn(),
}))

describe('home actions', () => {
  const getState = jest.fn(() => ({
    auth: Immutable.fromJS({}),
  }))
  const dispatchSpy = jest.fn()
  const CTA_URI = '/ctaTest'
  const promoCode = 'DTI-test-home-actions'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given homeGetStarted is dispatched', () => {
    test('then it should redirect to the specified UrI', async () => {
      await homeGetStarted(CTA_URI)(dispatchSpy, getState)

      expect(redirect).toHaveBeenCalledWith(CTA_URI)
    })

    test('If sectionForTracking is supplied, then also the tracking event is sent', async () => {
      const sectionForTracking = 'testSection'

      await homeGetStarted(CTA_URI, sectionForTracking)(dispatchSpy, getState)

      expect(trackGetStarted).toHaveBeenCalledWith(sectionForTracking)
    })
  })

  describe('given applyPromoCodeAndShowModal is dispatched', () => {
    describe('when promo code is not applicable', () => {
      beforeEach(() => {
        getPromoBannerState.mockReturnValue({
          canApplyPromo: false,
          promoCode,
        })
      })

      test('then promo code is not applied', async () => {
        await applyPromoCodeAndShowModal(CTA_URI)(dispatchSpy, getState)

        expect(promoChange).not.toHaveBeenCalled()
        expect(promoToggleModalVisibility).not.toHaveBeenCalled()
      })
    })

    describe('when promo code is applicable', () => {
      beforeEach(() => {
        getPromoBannerState.mockReturnValue({
          canApplyPromo: true,
          promoCode,
        })
      })

      test('then promo code is applied and modal is shown', async () => {
        await applyPromoCodeAndShowModal(CTA_URI)(dispatchSpy, getState)

        expect(promoChange).toHaveBeenCalledWith(promoCode)
        expect(promoToggleModalVisibility).toHaveBeenCalledWith(true)
      })
    })

    describe('when promo code is applicable but promoChange raises an error', () => {
      beforeEach(() => {
        getPromoBannerState.mockReturnValue({
          canApplyPromo: true,
          promoCode,
        })

        promoChange.mockImplementation(() => {
          throw new Error('something went wrong')
        })
      })

      test('then the modal is not shown', async () => {
        await applyPromoCodeAndShowModal(CTA_URI)(dispatchSpy, getState)

        expect(promoToggleModalVisibility).not.toHaveBeenCalled()
      })
    })
  })
})
