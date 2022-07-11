import { renderHook } from '@testing-library/react-hooks'

import { useGetOptionsForRecipe } from './useGetOptionsForRecipe'
import { UseMenuSWRArgs } from './http'
import { COLLECTION_ALL_RECIPES_ID, COLLECTION_GLUTEN_FREE_ID, MENU_1_DATES, MOCK_MENU_RESPONSE, RECIPE_CORE_ID_1, RECIPE_CORE_ID_2, RECIPE_NAME_1, RECIPE_NAME_2 } from './_testing/mocks'
import { UseMenuDependencies } from './types'
import { useMenuSWR } from './http/useMenuSWR'

const useMenuSWRMock = useMenuSWR as jest.MockedFunction<typeof useMenuSWR>;

jest.mock('./http/useMenuSWR')

describe('useGetOptionsForRecipe', () => {
  const requestArgs: UseMenuSWRArgs = {
    accessToken: 'accessToken',
    authUserId: 'auth-user-id',
    getFetcher: () => MOCK_MENU_RESPONSE,
    endpointUrl: 'menus-endpoint',
    requestData: {

    },
  }

  const isRecipeInStock = jest.fn()
  const numPortions = 2

  function renderForTest(selectedRecipeVariants: UseMenuDependencies["selectedRecipeVariants"] = {}) {
    useMenuSWRMock.mockReturnValue({ error: null, isPending: false, response: MOCK_MENU_RESPONSE.result })

    return renderHook(() => useGetOptionsForRecipe(
      requestArgs,
      MENU_1_DATES.middle,
      { numPortions, selectedRecipeVariants, isRecipeInStock }
    ))
  }

  beforeEach(() => {
    jest.clearAllMocks()

    isRecipeInStock.mockReturnValue(true)
  })

  describe('when there is an in-stock alternative', () => {
    test('should return correct values', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID)

      const expected: typeof options = [
        {
          recipeId: RECIPE_CORE_ID_1,
          recipeName: RECIPE_NAME_1 + " (V)",
          isOnDetailScreen: false,
          isChecked: true,
          isOutOfStock: false,
          surcharge: 1
        },
        {
          recipeId: RECIPE_CORE_ID_2,
          recipeName: RECIPE_NAME_2,
          isOnDetailScreen: false,
          isChecked: false,
          isOutOfStock: false,
          surcharge: null
        }
      ]

      expect(options).toEqual(expected)
    })
  })

  describe('when one of the alternatives is out of stock', () => {
    beforeEach(() => {
      isRecipeInStock.mockImplementation((id) => {
        if (id === RECIPE_CORE_ID_2) {
          return false
        }

        return true
      })
    })

    test('should mark stock correctly in result', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID)

      expect(options).toHaveLength(2)
      expect(options[0].isOutOfStock).toEqual(false)
      expect(options[1].isOutOfStock).toEqual(true)
    })
  })

  describe('when one of the alternatives is selected', () => {
    const selectedRecipeId = RECIPE_CORE_ID_1

    test('should mark isChecked correctly in result', () => {
      const { result } = renderForTest()

      const options = result.current(selectedRecipeId, COLLECTION_ALL_RECIPES_ID)

      expect(options).toHaveLength(2)
      expect(options[0].isChecked).toEqual(true)
      expect(options[1].isChecked).toEqual(false)
    })
  })

  describe('when isOnDetailScreen is true', () => {
    const isOnDetailScreen = true

    test('should mark isOnDetailScreen correctly in result', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID, { isOnDetailScreen })

      expect(options).toHaveLength(2)
      expect(options[0].isOnDetailScreen).toEqual(true)
      expect(options[1].isOnDetailScreen).toEqual(true)
    })
  })

  describe('when isOnDetailScreen is false', () => {
    const isOnDetailScreen = false

    test('should mark isOnDetailScreen correctly in result', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID, { isOnDetailScreen })

      expect(options).toHaveLength(2)
      expect(options[0].isOnDetailScreen).toEqual(false)
      expect(options[1].isOnDetailScreen).toEqual(false)
    })
  })

  describe('when isOnDetailScreen is false', () => {
    const isOnDetailScreen = false

    test('should mark isOnDetailScreen correctly in result', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID, { isOnDetailScreen })

      expect(options).toHaveLength(2)
      expect(options[0].isOnDetailScreen).toEqual(false)
      expect(options[1].isOnDetailScreen).toEqual(false)
    })
  })

  describe('when in a collection with dietary claims', () => {
    // this is set up in `mocks.ts` to have the `gluten-free` slug
    const glutenFreeRecipeId = RECIPE_CORE_ID_1

    test('should only return matching recipes', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_GLUTEN_FREE_ID)

      expect(options).toHaveLength(1)
      expect(options[0].recipeId).toEqual(glutenFreeRecipeId)
    })
  })

  describe('when recipe has surcharges', () => {
    // this is set up in `mocks.ts` to have the `gluten-free` slug
    const recipeIdWithSurcharge = RECIPE_CORE_ID_1

    test('should only return matching recipes', () => {
      const { result } = renderForTest()

      const options = result.current(RECIPE_CORE_ID_1, COLLECTION_ALL_RECIPES_ID)

      const recipeWithSurcharge = options.find(r => r.recipeId === recipeIdWithSurcharge)
      expect(recipeWithSurcharge).toBeTruthy
      expect(recipeWithSurcharge!.surcharge).toEqual(1)
    })
  })
})
