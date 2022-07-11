import * as useAuth from '../../../domains/auth/useAuth'
import { CollectionSlug } from '../../../domains/collections'
import * as useCollectionQuerySlug from '../../../domains/collections/internal/useCollectionQuerySlug'
import { useShouldRemoveMerchandisingBanner } from '../useShouldRemoveMerchandisingBanner'

const useCollectionQuerySlugMock = jest.spyOn(useCollectionQuerySlug, 'useCollectionQuerySlug')
const useAuthMock = jest.spyOn(useAuth, 'useAuth')

describe('useShouldRemoveMerchandisingBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
