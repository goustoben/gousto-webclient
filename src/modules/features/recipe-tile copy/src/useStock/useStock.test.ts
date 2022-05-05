import { renderHook } from '@testing-library/react-hooks'
import { useStock } from './useStock'
import { NumberOfPortions } from './types'
import { useStockSWR } from './api'

jest.mock('./api')

const useStockSWRMock = useStockSWR as jest.MockedFn<typeof useStockSWR>

describe('recipe-tile > useStock', () => {
  beforeEach(() => {
    useStockSWRMock.mockReturnValue({
      isPending: false,
      stock: {},
      error: null,
    })
  })

  function renderUseStock(numPortions: NumberOfPortions) {
    const getFetcher = () => ({} as any)

    return renderHook(() => useStock({
      numPortions,

      getFetcher,
      deliveryDayId: '123',
      coreUrl: 'core-url',
    }))
  }

  const buildStock = (recipeId: number, stockCount: number) => ({
    recipe_id: recipeId,
    committed: '1' as ('0' | '1'),
    number: stockCount,
    family_number: stockCount,
    period_id: 50,
    slot_number: '7',
  })

  describe('when recipe in stock', () => {
    const stockCount = 100
    const numPortions = 2
    const recipeId = '1234'
    const stock = {
      [recipeId]: buildStock(1234, stockCount)
    }

    beforeEach(() => {
      useStockSWRMock.mockReturnValue({
        isPending: false,
        stock,
        error: null,
      })
    })

    test('getStockForRecipe should return correct stock', () => {
      const { result } = renderUseStock(numPortions)

      expect(result.current.getStockForRecipe(recipeId)).toEqual(stockCount)
    })


    test('isRecipeOutOfStock should return false', () => {
      const { result } = renderUseStock(numPortions)

      expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(false)
    })
  })

  describe('when recipe out of stock', () => {
    const stockCount = 0
    const numPortions = 2
    const recipeId = '1234'
    const stock = {
      [recipeId]: buildStock(1234, stockCount)
    }

    beforeEach(() => {
      useStockSWRMock.mockReturnValue({
        isPending: false,
        stock,
        error: null,
      })
    })

    test('getStockForRecipe should return correct stock', () => {
      const { result } = renderUseStock(numPortions)

      expect(result.current.getStockForRecipe(recipeId)).toEqual(stockCount)
    })


    test('isRecipeOutOfStock should return true', () => {
      const { result } = renderUseStock(numPortions)

      expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(true)
    })
  })
})
