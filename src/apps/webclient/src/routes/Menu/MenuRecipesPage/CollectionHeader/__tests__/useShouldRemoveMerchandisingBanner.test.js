import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import * as useAuth from '../../../domains/auth/useAuth'
import { CollectionSlug } from '../../../domains/collections'
import * as useCollectionQuerySlug from '../../../domains/collections/internal/useCollectionQuerySlug'
import { useShouldRemoveMerchandisingBanner } from '../useShouldRemoveMerchandisingBanner'

jest.mock('containers/OptimizelyRollouts', () => ({
  ...jest.requireActual('containers/OptimizelyRollouts'),
  isOptimizelyFeatureEnabledFactory: jest.fn(),
  useIsOptimizelyFeatureEnabled: jest.fn('beetroots_remove_merchandising_banner_web_enabled'),
}))
const useCollectionQuerySlugMock = jest.spyOn(useCollectionQuerySlug, 'useCollectionQuerySlug')
const useAuthMock = jest.spyOn(useAuth, 'useAuth')

describe('useShouldRemoveMerchandisingBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when an experiment is on', () => {
    beforeEach(() => {
      useIsOptimizelyFeatureEnabled.mockReturnValue(true)
    })

    describe('when user is not authenticated', () => {
      beforeEach(() => {
        useAuthMock.mockReturnValue({ isAuthenticated: false })
      })

      describe('when category is not calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.AllRecipes)
        })

        it('returns true', () => {
          expect(
            useIsOptimizelyFeatureEnabled('beetroots_remove_merchandising_banner_web_enabled'),
          ).toBe(true)
          expect(useIsOptimizelyFeatureEnabled).toHaveBeenCalledTimes(1)

          expect(useAuthMock().isAuthenticated).toBe(false)
          expect(useAuthMock).toHaveBeenCalledTimes(1)

          expect(useCollectionQuerySlugMock()).toBe(CollectionSlug.AllRecipes)
          expect(useCollectionQuerySlugMock).toHaveBeenCalledTimes(1)

          expect(useShouldRemoveMerchandisingBanner()).toBe(true)
        })
      })

      describe('when category is calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.CalorieControlled)
        })

        it('returns false', () => {
          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })
    })

    describe('when user is authenticated', () => {
      beforeEach(() => {
        useAuthMock.mockReturnValue({ isAuthenticated: true })
      })

      describe('when category is not calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.AllRecipes)
        })

        it('returns false', () => {
          expect(
            useIsOptimizelyFeatureEnabled('beetroots_remove_merchandising_banner_web_enabled'),
          ).toBe(true)
          expect(useIsOptimizelyFeatureEnabled).toHaveBeenCalledTimes(1)

          expect(useAuthMock().isAuthenticated).toBe(true)
          expect(useAuthMock).toHaveBeenCalledTimes(1)

          expect(useCollectionQuerySlugMock()).toBe(CollectionSlug.AllRecipes)
          expect(useCollectionQuerySlugMock).toHaveBeenCalledTimes(1)

          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })

      describe('when category is calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.CalorieControlled)
        })

        it('returns false', () => {
          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })
    })
  })

  describe('when an experiment is off', () => {
    beforeEach(() => {
      useIsOptimizelyFeatureEnabled.mockReturnValue(false)
    })

    describe('when user is not authenticated', () => {
      beforeEach(() => {
        useAuthMock.mockReturnValue({ isAuthenticated: true })
      })

      describe('when category is not calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.AllRecipes)
        })

        it('returns false', () => {
          expect(
            useIsOptimizelyFeatureEnabled('beetroots_remove_merchandising_banner_web_enabled'),
          ).toBe(false)
          expect(useIsOptimizelyFeatureEnabled).toHaveBeenCalledTimes(1)

          expect(useAuthMock().isAuthenticated).toBe(true)
          expect(useAuthMock).toHaveBeenCalledTimes(1)

          expect(useCollectionQuerySlugMock()).toBe(CollectionSlug.AllRecipes)
          expect(useCollectionQuerySlugMock).toHaveBeenCalledTimes(1)

          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })

      describe('when category is calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.CalorieControlled)
        })

        it('returns false', () => {
          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })
    })

    describe('when user is authenticated', () => {
      beforeEach(() => {
        useAuthMock.mockReturnValue({ isAuthenticated: true })
      })

      describe('when category is not calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.AllRecipes)
        })

        it('returns false', () => {
          expect(
            useIsOptimizelyFeatureEnabled('beetroots_remove_merchandising_banner_web_enabled'),
          ).toBe(false)
          expect(useIsOptimizelyFeatureEnabled).toHaveBeenCalledTimes(1)

          expect(useAuthMock().isAuthenticated).toBe(true)
          expect(useAuthMock).toHaveBeenCalledTimes(1)

          expect(useCollectionQuerySlugMock()).toBe(CollectionSlug.AllRecipes)
          expect(useCollectionQuerySlugMock).toHaveBeenCalledTimes(1)

          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })

      describe('when category is calorie-controlled', () => {
        beforeEach(() => {
          useCollectionQuerySlugMock.mockReturnValue(CollectionSlug.CalorieControlled)
        })

        it('returns false', () => {
          expect(useShouldRemoveMerchandisingBanner()).toBe(false)
        })
      })
    })
  })
})
