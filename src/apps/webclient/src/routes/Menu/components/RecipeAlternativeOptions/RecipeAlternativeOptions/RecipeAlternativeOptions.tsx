import React from 'react'

import { useRecipeReference } from 'routes/Menu/context/recipeReferenceContext'
import { useMenu } from 'routes/Menu/domains/menu'

import { AlternativeOptionItem } from '../AlternativeOptionItem'
import { RecipeChangeHandler, useMakeOnCheckRecipe } from './useMakeOnCheckRecipe'
import { useTrackVariantListDisplay } from './useTracking'

import css from './RecipeAlternativeOptions.css'

type RecipeAlternativeOptionsProps = {
  recipeId: string
  originalId: string
  categoryId?: string
  closeOnSelection?: boolean
  isOnDetailScreen?: boolean
  /**
   * Optional Function to be called upon switching recipes.
   */
  onChangeCheckedRecipe?: RecipeChangeHandler | null
}

export const RecipeAlternativeOptions = ({
  recipeId: currentRecipeId,
  originalId,
  categoryId = undefined,
  closeOnSelection = false,
  isOnDetailScreen = false,
  onChangeCheckedRecipe = null,
}: RecipeAlternativeOptionsProps) => {
  const { getAlternativeOptionsForRecipe } = useMenu()
  const recipeWithAlternativeOptions = getAlternativeOptionsForRecipe({
    recipeId: currentRecipeId,
    isOnDetailScreen,
    categoryId,
  })
  const recipeReference = useRecipeReference()
  const onChange = useMakeOnCheckRecipe({
    originalId,
    currentRecipeId,
    categoryId,
    isOnDetailScreen,
    closeOnSelection,
    onChangeCheckedRecipe,
  })

  // alternative options include the recipe itself
  const ALTERNATIVE_OPTIONS_STARTING_LENGTH = 1

  const hasAlternativeOptions =
    recipeWithAlternativeOptions.length > ALTERNATIVE_OPTIONS_STARTING_LENGTH

  useTrackVariantListDisplay({
    hasAlternativeOptions,
    view: isOnDetailScreen ? 'details' : 'grid',
  })

  const preventPropagation = (e: React.SyntheticEvent) => e.stopPropagation()

  if (!hasAlternativeOptions) {
    return null
  }

  return (
    <div
      className={css.recipeList}
      role="button"
      tabIndex={-1}
      onClick={preventPropagation}
      onKeyPress={preventPropagation}
    >
      {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
      <ul className={css.recipeListText}>
        {recipeWithAlternativeOptions.map(
          ({ recipeId, recipeName, isChecked, isOutOfStock, surcharge }) => (
            <AlternativeOptionItem
              key={recipeId}
              recipeId={recipeId}
              recipeName={recipeName}
              changeCheckedRecipe={onChange(recipeReference, recipeId, isOutOfStock)}
              isChecked={isChecked}
              isOnDetailScreen={isOnDetailScreen}
              isOutOfStock={isOutOfStock}
              surcharge={surcharge === undefined ? null : surcharge}
            />
          ),
        )}
      </ul>
    </div>
  )
}
