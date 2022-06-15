import { Dispatch } from 'redux'

import { RecipeChangeHandler, makeOnCheckRecipe } from './useMakeOnCheckRecipe'

jest.mock('routes/Menu/actions/menuRecipeDetails', () => ({
  selectRecipeVariant: (payload: any) => ({
    type: 'mock_selectRecipeVariant',
    payload,
  }),
  menuRecipeDetailVisibilityChange: (payload: any) => ({
    type: 'mock_menuRecipeDetailVisibilityChange',
    payload,
  }),
}))

describe('useOnCheckRecipe', () => {
  const args: {
    dispatch: Dispatch
    callback: RecipeChangeHandler | null
    isOnDetailScreen: boolean
    recipeId: string
    categoryId: string
    closeOnSelection: boolean
  } = {
    dispatch: jest.fn(),
    callback: null,
    isOnDetailScreen: false,
    recipeId: '222',
    categoryId: '111',
    closeOnSelection: false,
  }

  const recipeReference = 'reference'
  const isOutOfStock = false
  const nextRecipeId = 'new-id'

  beforeEach(() => {
    args.dispatch = jest.fn()
    args.callback = null
    args.isOnDetailScreen = false
  })

  function makeFunctionUnderTest() {
    return makeOnCheckRecipe(args.dispatch, {
      categoryId: args.categoryId,
      originalId: args.recipeId,
      currentRecipeId: args.recipeId,
      closeOnSelection: args.closeOnSelection,
      isOnDetailScreen: args.isOnDetailScreen,
      onChangeCheckedRecipe: args.callback,
    })
  }

  describe('when callback is provided', () => {
    beforeEach(() => {
      args.callback = jest.fn()
    })

    test('should call callback', () => {
      const fn = makeFunctionUnderTest()

      fn(recipeReference, nextRecipeId, isOutOfStock)()

      expect(args.callback).toHaveBeenCalledWith({
        nextRecipeId,
        previousRecipeId: args.recipeId,
      })
    })
  })

  describe('when on details screen', () => {
    beforeEach(() => {
      args.isOnDetailScreen = true
    })

    test('should dispatch correct view in selectRecipeVariant', () => {
      const fn = makeFunctionUnderTest()

      fn(recipeReference, nextRecipeId, isOutOfStock)()

      expect(args.dispatch).toHaveBeenCalledWith({
        type: 'mock_selectRecipeVariant',
        payload: expect.objectContaining({
          view: 'details',
        }),
      })
    })

    test('should dispatch menuRecipeDetailVisibilityChange', () => {
      const fn = makeFunctionUnderTest()

      fn(recipeReference, nextRecipeId, isOutOfStock)()

      expect(args.dispatch).toHaveBeenCalledWith({
        type: 'mock_menuRecipeDetailVisibilityChange',
        payload: nextRecipeId,
      })
    })
  })

  test('should dispatch selectRecipeVariant', () => {
    const fn = makeFunctionUnderTest()

    fn(recipeReference, nextRecipeId, isOutOfStock)()

    expect(args.dispatch).toHaveBeenCalledWith({
      type: 'mock_selectRecipeVariant',
      payload: {
        originalRecipeId: args.recipeId,
        variantId: nextRecipeId,
        collectionId: args.categoryId,
        variantOutOfStock: isOutOfStock,
        view: 'grid',
        close: args.closeOnSelection,
        recipeReference,
      },
    })
  })

  test('should not dispatch menuRecipeDetailVisibilityChange', () => {
    const fn = makeFunctionUnderTest()

    fn(recipeReference, nextRecipeId, isOutOfStock)()

    expect(args.dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'mock_menuRecipeDetailVisibilityChange',
      }),
    )
  })
})
