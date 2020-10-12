import { homeActions } from 'actions/home'
import { redirect } from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { getPromoBannerState } from 'utils/home'
import promoActions from 'actions/promos'

const { promoChange, promoToggleModalVisibility } = promoActions

jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

jest.mock('actions/tracking', () => ({
  trackGetStarted: jest.fn()
}))

jest.mock('actions/promos', () => ({
  promoChange: jest.fn(),
  promoToggleModalVisibility: jest.fn()
}))

jest.mock('utils/home', () => ({
  getPromoBannerState: jest.fn()
}))

describe('home actions', () => {
  const getState = jest.fn()
  const dispatchSpy = jest.fn()
  const CTA_URI = '/ctaTest'

  describe('Given homeGetStarted is dispatched', () => {
    const { homeGetStarted } = homeActions

    describe('When promo code is not applied', () => {
      beforeEach(() => {
        getPromoBannerState.mockReturnValue({
          hide: false,
          canApplyPromo: true
        })
      })

      describe('And sectionForTracking is not supplied', () => {
        test('Then redirect to the next step', async () => {
          await homeGetStarted(CTA_URI)(dispatchSpy, getState)

          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(trackGetStarted).not.toHaveBeenCalled()
        })
      })

      describe('And sectionForTracking is supplied', () => {
        test('Then redirect and send tracking event', async () => {
          const sectionForTracking = 'testSection'

          await homeGetStarted(CTA_URI, sectionForTracking)(dispatchSpy, getState)

          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(trackGetStarted).toHaveBeenCalledWith(sectionForTracking)
        })
      })
    })

    describe('When promo code is applied', () => {
      const promoCode = 'DTI-test-home-actions'

      describe('And promo banner is hidden', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          getPromoBannerState.mockReturnValue({
            hide: true,
            canApplyPromo: false,
            promoCode
          })
        })

        test('Then promo code is not applied', async () => {
          await homeGetStarted(CTA_URI)(dispatchSpy, getState)

          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(promoChange).not.toHaveBeenCalled()
          expect(promoToggleModalVisibility).not.toHaveBeenCalled()
        })
      })

      describe('When promo code is not applicable', () => {
        beforeEach(() => {
          getPromoBannerState.mockReturnValue({
            hide: false,
            canApplyPromo: false,
            promoCode
          })
        })

        test('Then promo code is not applied', async () => {
          await homeGetStarted(CTA_URI)(dispatchSpy, getState)

          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(promoChange).not.toHaveBeenCalled()
          expect(promoToggleModalVisibility).not.toHaveBeenCalled()
        })
      })

      describe('When promo banner is shown and promo code is applicable', () => {
        beforeEach(() => {
          jest.clearAllMocks()

          getPromoBannerState.mockReturnValue({
            hide: false,
            canApplyPromo: true,
            promoCode
          })
        })

        test('Then promo code is applied and modal is shown', async () => {
          await homeGetStarted(CTA_URI)(dispatchSpy, getState)

          expect(promoChange).toHaveBeenCalledWith(promoCode)
          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(promoToggleModalVisibility).toHaveBeenCalledWith(true)
          expect(trackGetStarted).not.toHaveBeenCalled()
        })

        test('If sectionForTracking is supplied, then also the tracking event is sent', async () => {
          const sectionForTracking = 'testSection'

          await homeGetStarted(CTA_URI, sectionForTracking)(dispatchSpy, getState)

          expect(promoChange).toHaveBeenCalledWith(promoCode)
          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(promoToggleModalVisibility).toHaveBeenCalledWith(true)
          expect(trackGetStarted).toHaveBeenCalledWith(sectionForTracking)
        })

        test('When promoChange fails, redirect without showing the modal', async () => {
          promoChange.mockImplementation(() => {
            throw new Error('something went wrong')
          })

          await homeGetStarted(CTA_URI)(dispatchSpy, getState)

          expect(redirect).toHaveBeenCalledWith(CTA_URI)
          expect(promoToggleModalVisibility).not.toHaveBeenCalled()
          expect(trackGetStarted).not.toHaveBeenCalled()
        })
      })
    })
  })
})
