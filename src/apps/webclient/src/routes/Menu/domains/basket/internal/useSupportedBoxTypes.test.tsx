// FYI: this will be rolled back after the 5 recipes for prospects experiment
import React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'

import { getFiveRecipesEnabledFromCache } from 'hooks/useIsFiveRecipesEnabled'
import { createMockStore } from 'routes/Menu/_testing/createMockStore'

import { useMenuBox } from './useMenuBox'
import { useSupportedBoxTypes } from './useSupportedBoxTypes'

jest.mock('./useMenuBox')

const useMenuBoxMock = useMenuBox as jest.MockedFunction<typeof useMenuBox>
const useIsFiveRecipesEnabledMock = getFiveRecipesEnabledFromCache as jest.MockedFunction<
  typeof getFiveRecipesEnabledFromCache
>

const store = createMockStore()
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

jest.mock('hooks/useIsFiveRecipesEnabled', () => ({
  getFiveRecipesEnabledFromCache: jest.fn(),
}))

describe('useSupportedBoxTypes', () => {
  beforeEach(() => {
    useMenuBoxMock.mockReturnValue({
      'SKU-GMT-2-2': {
        type: 'box',
        id: 'SKU-GMT-2-2',
        attributes: { number_of_portions: 2, number_of_recipes: 2 },
      },
      'SKU-GMT-2-4': {
        type: 'box',
        id: 'SKU-GMT-2-4',
        attributes: { number_of_portions: 4, number_of_recipes: 2 },
      },
      'SKU-GMT-3-2': {
        type: 'box',
        id: 'SKU-GMT-3-2',
        attributes: { number_of_portions: 2, number_of_recipes: 3 },
      },
      'SKU-GMT-3-4': {
        type: 'box',
        id: 'SKU-GMT-3-4',
        attributes: { number_of_portions: 4, number_of_recipes: 3 },
      },
      'SKU-GMT-4-2': {
        type: 'box',
        id: 'SKU-GMT-4-2',
        attributes: { number_of_portions: 2, number_of_recipes: 4 },
      },
      'SKU-GMT-4-4': {
        type: 'box',
        id: 'SKU-GMT-4-4',
        attributes: { number_of_portions: 4, number_of_recipes: 4 },
      },
      'SKU-GMT-5-2': {
        type: 'box',
        id: 'SKU-GMT-5-2',
        attributes: { number_of_portions: 2, number_of_recipes: 5 },
      },
    })
    useIsFiveRecipesEnabledMock.mockReturnValue({
      isFiveRecipesEnabled: true,
      isFiveRecipesExperimentEnabled: true,
    })
  })

  describe('allowedPortionSizes ', () => {
    it('returns supported portion sizes', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().allowedPortionSizes(), { wrapper })
      expect(result.current).toMatchObject([2, 4])
    })
  })

  describe('maxRecipesForPortion', () => {
    it('returns max recipe limit when portion size is not given', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().maxRecipesForPortion(), {
        wrapper,
      })
      expect(result.current).toBe(5)
    })

    it('returns max recipe limit for portion size 4', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().maxRecipesForPortion(4), {
        wrapper,
      })
      expect(result.current).toBe(4)
    })

    describe('when five recipes experiment disables 5 recipes for prospects', () => {
      beforeEach(() => {
        useIsFiveRecipesEnabledMock.mockReturnValue({
          isFiveRecipesEnabled: false,
          isFiveRecipesExperimentEnabled: false,
        })
      })

      it('returns max recipe limit when 5 recipes disabled', () => {
        const { result } = renderHook(() => useSupportedBoxTypes().maxRecipesForPortion(4), {
          wrapper,
        })
        expect(result.current).toBe(4)
      })
    })
  })

  describe('minRecipesForPortion', () => {
    it('returns min recipe count when portion size is not given', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().minRecipesForPortion(), {
        wrapper,
      })
      expect(result.current).toBe(2)
    })

    it('returns min recipe count for portion size 4', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().minRecipesForPortion(4), {
        wrapper,
      })
      expect(result.current).toBe(2)
    })
  })

  describe('isPortionSizeAllowedByRecipeCount', () => {
    it('returns false if portions size is not allowed for given number of recipes', () => {
      const { result } = renderHook(
        () => useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(5, 4),
        { wrapper },
      )
      expect(result.current).toBe(false)
    })

    it('returns true if portions size is allowed for given number of recipes', () => {
      const { result } = renderHook(
        () => useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(5, 2),
        { wrapper },
      )
      expect(result.current).toBe(true)
    })

    it('returns true if number of recipes is 0', () => {
      const { result } = renderHook(
        () => useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(0, 2),
        { wrapper },
      )
      expect(result.current).toBe(true)
    })
  })
})
