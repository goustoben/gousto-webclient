import { renderHook } from '@testing-library/react-hooks'
import { useSupportedBoxTypes } from './useSupportedBoxTypes'
import { useMenuBox } from './useMenuBox'

jest.mock('./useMenuBox')

const useMenuBoxMock = useMenuBox as jest.MockedFunction<typeof useMenuBox>

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
  })

  describe('allowedPortionSizes ', () => {
    it('returns supported portion sizes', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().allowedPortionSizes())
      expect(result.current).toMatchObject([2, 4])
    })
  })

  describe('maxRecipesForPortion', () => {
    it('returns max recipe limit when portion size is not given', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().maxRecipesForPortion())
      expect(result.current).toBe(5)
    })

    it('returns max recipe limit for portion size 4', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().maxRecipesForPortion(4))
      expect(result.current).toBe(4)
    })
  })

  describe('minRecipesForPortion', () => {
    it('returns min recipe count when portion size is not given', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().minRecipesForPortion())
      expect(result.current).toBe(2)
    })

    it('returns min recipe count for portion size 4', () => {
      const { result } = renderHook(() => useSupportedBoxTypes().minRecipesForPortion(4))
      expect(result.current).toBe(2)
    })
  })

  describe('isPortionSizeAllowedByRecipeCount', () => {
    it('returns false if portions size is not allowed for given number of recipes', () => {
      const { result } = renderHook(() =>
        useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(5, 4),
      )
      expect(result.current).toBe(false)
    })

    it('returns true if portions size is allowed for given number of recipes', () => {
      const { result } = renderHook(() =>
        useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(5, 2),
      )
      expect(result.current).toBe(true)
    })

    it('returns true if number of recipes is 0', () => {
      const { result } = renderHook(() =>
        useSupportedBoxTypes().isPortionSizeAllowedByRecipeCount(0, 2),
      )
      expect(result.current).toBe(true)
    })
  })
})
