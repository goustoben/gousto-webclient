import { renderHook } from '@testing-library/react-hooks'
import { useStock } from './useStock'
import { useStockSWR } from './api'

jest.mock('./api')

const useStockSWRMock = useStockSWR as jest.MockedFn<typeof useStockSWR>

describe('recipe-tile > useStock', () => {
  const minimumThreshold = 10
  const accessToken = 'access-token'
  const authUserId = 'auth-user-id'

  beforeEach(() => {
    useStockSWRMock.mockReturnValue({
      isPending: false,
      stock: {},
      error: null,
    })
  })

  function renderUseStock() {
    const getFetcher = () => ({} as any)

    return renderHook(() =>
      useStock(
        {
          accessToken,
          authUserId,

          getFetcher,
          deliveryDayId: '123',
          coreUrl: 'core-url',
        },
        {
          minimumThreshold,
        },
      ),
    )
  }

  const buildStock = (recipeId: number, stockCount: number) => ({
    recipe_id: recipeId,
    committed: '1' as '0' | '1',
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
      [recipeId]: buildStock(1234, stockCount),
    }

    beforeEach(() => {
      useStockSWRMock.mockReturnValue({
        isPending: false,
        stock,
        error: null,
      })
    })

    test('getStockForRecipe should return correct stock', () => {
      const { result } = renderUseStock()

      expect(result.current.getStockForRecipe(recipeId, numPortions)).toEqual(stockCount)
    })

    test('isRecipeInStock should return true', () => {
      const { result } = renderUseStock()

      expect(result.current.isRecipeInStock(recipeId, numPortions)).toEqual(true)
    })
  })

  describe('when recipe out of stock', () => {
    const stockCount = 0
    const numPortions = 2
    const recipeId = '1234'
    const stock = {
      [recipeId]: buildStock(1234, stockCount),
    }

    beforeEach(() => {
      useStockSWRMock.mockReturnValue({
        isPending: false,
        stock,
        error: null,
      })
    })

    test('getStockForRecipe should return correct stock', () => {
      const { result } = renderUseStock()

      expect(result.current.getStockForRecipe(recipeId, numPortions)).toEqual(stockCount)
    })

    test('isRecipeInStock should return false', () => {
      const { result } = renderUseStock()

      expect(result.current.isRecipeInStock(recipeId, numPortions)).toEqual(false)
    })
  })

  describe('when recipe in stock but below threshold', () => {
    const stockCount = 8
    const numPortions = 2
    const recipeId = '1234'
    const stock = {
      [recipeId]: buildStock(1234, stockCount),
    }

    beforeEach(() => {
      useStockSWRMock.mockReturnValue({
        isPending: false,
        stock,
        error: null,
      })
    })

    test('getStockForRecipe should return correct stock', () => {
      const { result } = renderUseStock()

      expect(result.current.getStockForRecipe(recipeId, numPortions)).toEqual(stockCount)
    })

    test('isRecipeInStock should return false', () => {
      const { result } = renderUseStock()

      expect(result.current.isRecipeInStock(recipeId, numPortions)).toEqual(false)
    })
  })
})
