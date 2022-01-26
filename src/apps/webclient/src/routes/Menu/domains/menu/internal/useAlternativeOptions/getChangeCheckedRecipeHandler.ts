import {
  menuRecipeDetailVisibilityChange,
  selectRecipeVariant,
} from 'routes/Menu/actions/menuRecipeDetails'
import { useDispatch } from 'react-redux'

type GetChangeCheckedRecipeHandlerArgs = {
  dispatch: ReturnType<typeof useDispatch>
  isOnDetailScreen: boolean
  originalId: string
  collectionId: string
  closeOnSelection?: boolean
}

/**
 *  Produces a handler to be called upon selecting of given recipe alternative
 */
export const getChangeCheckedRecipeHandler =
  ({
    dispatch,
    isOnDetailScreen,
    originalId,
    collectionId,
    closeOnSelection,
  }: GetChangeCheckedRecipeHandlerArgs) =>
  (checkedRecipeId: string, isOutOfStock: boolean): void => {
    const view = isOnDetailScreen ? 'details' : 'grid'

    dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectRecipeVariant(
        originalId,
        checkedRecipeId,
        collectionId,
        isOutOfStock,
        view,
        closeOnSelection
      ) as any
    )

    if (isOnDetailScreen) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        menuRecipeDetailVisibilityChange(checkedRecipeId) as any
      )
    }
  }
