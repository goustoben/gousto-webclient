import React from 'react'

import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import {
  menuRecipeDetailVisibilityChange,
  selectRecipeVariant,
} from 'routes/Menu/actions/menuRecipeDetails'

export type RecipeChangeHandler = (_: { previousRecipeId: string; nextRecipeId: string }) => void

type OnCheckRecipeArgs = {
  originalId: string
  currentRecipeId: string
  categoryId: string | undefined
  isOnDetailScreen: boolean
  closeOnSelection: boolean
  onChangeCheckedRecipe: RecipeChangeHandler | null
}

// export this function outside of the useCallback to allow for easier testing
export function makeOnCheckRecipe(
  dispatch: Dispatch,
  {
    originalId,
    currentRecipeId,
    categoryId,
    isOnDetailScreen,
    closeOnSelection,
    onChangeCheckedRecipe: callback,
  }: OnCheckRecipeArgs,
) {
  return (recipeReference: string | null, checkedRecipeId: string, isOutOfStock: boolean) => () => {
    if (callback) {
      callback({
        nextRecipeId: checkedRecipeId,
        previousRecipeId: currentRecipeId,
      })
    }

    const view = isOnDetailScreen ? 'details' : 'grid'

    dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectRecipeVariant({
        originalRecipeId: originalId,
        variantId: checkedRecipeId,
        collectionId: categoryId,
        variantOutOfStock: isOutOfStock,
        view,
        close: closeOnSelection,
        recipeReference,
      }) as any,
    )

    if (isOnDetailScreen) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        menuRecipeDetailVisibilityChange(checkedRecipeId) as any,
      )
    }
  }
}

export function useMakeOnCheckRecipe(args: OnCheckRecipeArgs) {
  const dispatch = useDispatch()

  return React.useCallback(
    makeOnCheckRecipe(dispatch, args),
    [args], // do we need a better check here?
  )
}
