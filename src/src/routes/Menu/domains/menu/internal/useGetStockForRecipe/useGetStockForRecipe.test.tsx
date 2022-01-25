import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { useGetStockForRecipe } from '.'

describe('useGetStockForRecipe', () => {
  const recipeId = 'recipe-one'
  const numPortions = 2
  const getMenuStock = () =>
    Immutable.fromJS({
      [recipeId]: {
        2: 100,
        4: 100,
        8: 0,
      },
    })

  /**
   * The test contains bunch of "ts-ignore" instruction as it checks for cases where the
   * interfaces defined in TypeScript are violated. (It is possible given not all WebClient
   * codebase is converted to TypeScript yet).
   */

  describe('when no recipe is provided', () => {
    it('should return null', () => {
      const menuRecipeStock = getMenuStock()
      const { result } = renderHook(() => useGetStockForRecipe({ menuRecipeStock, numPortions }))

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.current()).toEqual(null)
    })
  })

  describe('when no recipes stock was provided', () => {
    it('should return null', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { result } = renderHook(() => useGetStockForRecipe({ numPortions }))

      expect(result.current(recipeId)).toEqual(null)
    })
  })

  describe('when recipe stock was passed as non Immutable data structure', () => {
    it('should return null regardless', () => {
      const { result } = renderHook(() =>
        useGetStockForRecipe({
          menuRecipeStock: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [recipeId]: {
              2: 100,
              4: 100,
              8: 0,
            },
          },
          numPortions,
        })
      )

      expect(result.current(recipeId)).toEqual(null)
    })
  })

  describe('when recipe stock does not contain stock level data for given recipe', () => {
    it('should return 0', () => {
      const { result } = renderHook(() =>
        useGetStockForRecipe({
          menuRecipeStock: Immutable.fromJS({
            [recipeId]: {
              2: 0,
              4: 100,
              8: 0,
            },
          }),
          numPortions,
        })
      )

      expect(result.current(recipeId)).toEqual(0)
    })
  })

  describe('when recipe stock data is empty (the stock level data is not fetched from the API)', () => {
    it('should return null', () => {
      const { result } = renderHook(() =>
        useGetStockForRecipe({
          menuRecipeStock: Immutable.fromJS({}),
          numPortions,
        })
      )

      expect(result.current(recipeId)).toEqual(null)
    })
  })

  describe('when recipe data does not have stock level for given number of portions', () => {
    it('should return 0', () => {
      const menuRecipeStock = getMenuStock()
      const { result } = renderHook(() => useGetStockForRecipe({ menuRecipeStock, numPortions: 5 }))

      expect(result.current(recipeId)).toEqual(0)
    })
  })

  describe('when number of portions was not provided', () => {
    it('should return 0', () => {
      const menuRecipeStock = getMenuStock()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { result } = renderHook(() => useGetStockForRecipe({ menuRecipeStock }))

      expect(result.current(recipeId)).toEqual(0)
    })
  })

  describe('when recipe stock data includes provided recipe', () => {
    it('should return the stock level data', () => {
      const menuRecipeStock = getMenuStock()
      const { result } = renderHook(() => useGetStockForRecipe({ menuRecipeStock, numPortions }))

      expect(result.current(recipeId)).toEqual(100)
    })
  })
})
