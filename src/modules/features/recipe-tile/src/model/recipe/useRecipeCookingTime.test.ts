import { renderHook } from "@testing-library/react-hooks";
import { Recipe } from ".";
import { useRecipe } from "../context/recipe"
import { useRecipeCookingTime } from './useRecipeCookingTime'
import { useBasketHook } from "../context/useBasket"

jest.mock('../context/recipe')
jest.mock('../context/useBasket')

const useRecipeMock = useRecipe as jest.MockedFunction<typeof useRecipe>;
const useBasketHookMock = useBasketHook as jest.MockedFunction<typeof useBasketHook>;

describe('useRecipeCookingTime', () => {
  describe('when there is no recipe in context', () => {
    beforeEach(() => {
      useRecipeMock.mockImplementation(() => null as unknown as Recipe)
      useBasketHookMock.mockImplementation(() => () => ({ numPortions: 2 }) as any)
    })

    it('should return null', () => {
      const { result } = renderHook(() => useRecipeCookingTime())
      expect(result.current).toBeNull()
    })
  })

  describe('when there is a recipe in context', () => {
    const familyNumPortion = 4
    const defaultNumPortion = 2
    const recipe = { id: '123', cookingTimeFamily: 30, cookingTime: 20 }

    describe('when number of portions is for family', () => {
      beforeEach(() => {
        useRecipeMock.mockImplementation(() => recipe)
        useBasketHookMock.mockImplementation(() => () => ({ numPortions: familyNumPortion }) as any)
      })

      it('should return cooking time for a family', () => {
        const { result } = renderHook(() => useRecipeCookingTime())
        expect(result.current).toBe(30)
      })
    })

    describe('when number of portions is not for family', () => {
      beforeEach(() => {
        useRecipeMock.mockImplementation(() => recipe)
        useBasketHookMock.mockImplementation(() => () => ({ numPortions: defaultNumPortion }) as any)
      })

      it('should return default cooking time from a recipe', () => {
        const { result } = renderHook(() => useRecipeCookingTime())
        expect(result.current).toBe(20)
      })
    })
  })
})
