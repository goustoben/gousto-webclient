import React from 'react'
import PropTypes from 'prop-types'
import { useMenu } from 'routes/Menu/domains/menu'
import { VariantRecipeListItem } from '../VariantRecipeListItem/VariantRecipeListItem'
import css from './RecipeAlternativeOptions.css'
import { useTrackVariantListDisplay } from './useTracking'

export const RecipeAlternativeOptions = ({
  recipeId: currentRecipeId,
  originalId,
  categoryId,
  closeOnSelection,
  isOnDetailScreen = false,
  onChangeCheckedRecipe,
}) => {
  const { getAlternativeOptionsForRecipe } = useMenu()
  const recipeWithAlternativeOptions = getAlternativeOptionsForRecipe({
    originalId,
    recipeId: currentRecipeId,
    isOnDetailScreen,
    isFromShowcaseMenu: false,
    categoryId,
    closeOnSelection,
  })

  // alternative options include the recipe itself
  const ALTERNATIVE_OPTIONS_STARTING_LENGTH = 1

  const hasAlternativeOptions = recipeWithAlternativeOptions.length > ALTERNATIVE_OPTIONS_STARTING_LENGTH

  useTrackVariantListDisplay({
    hasAlternativeOptions,
    view: isOnDetailScreen ? 'details' : 'grid',
  })

  const preventPropagation = (e) => e.stopPropagation()

  if (!hasAlternativeOptions) {
    return null
  }

  return (
    <>
      <div className={css.recipeList} role="button" tabIndex={-1} onClick={preventPropagation} onKeyPress={preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
        <ul className={css.recipeListText}>
          {recipeWithAlternativeOptions.map(({ recipeId, recipeName, changeCheckedRecipe, isChecked, isFromShowcaseMenu, isOutOfStock, surcharge, allergenInfo}) => (
            <VariantRecipeListItem
              key={recipeId}
              recipeId={recipeId}
              recipeName={recipeName}
              changeCheckedRecipe={(...args) => {
                if (onChangeCheckedRecipe) {
                  onChangeCheckedRecipe({
                    nextRecipeId: recipeId,
                    previousRecipeId: currentRecipeId,
                  })
                }

                return changeCheckedRecipe(...args)
              }}
              isChecked={isChecked}
              isOnDetailScreen={isOnDetailScreen}
              isFromShowcaseMenu={isFromShowcaseMenu}
              isOutOfStock={isOutOfStock}
              surcharge={surcharge}
              allergenInfo={allergenInfo}
            />
          )
          )}
        </ul>
      </div>
    </>
  )
}

RecipeAlternativeOptions.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string,
  closeOnSelection: PropTypes.bool,
  isOnDetailScreen: PropTypes.bool,
  /**
  * Optional Function to be called upon switching recipes.
  */
  onChangeCheckedRecipe: PropTypes.func,
}

RecipeAlternativeOptions.defaultProps = {
  categoryId: null,
  closeOnSelection: false,
  isOnDetailScreen: false,
  onChangeCheckedRecipe: null,
}
