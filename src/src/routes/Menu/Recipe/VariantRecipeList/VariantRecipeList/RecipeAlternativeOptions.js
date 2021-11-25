import React from 'react'
import PropTypes from 'prop-types'
import { useMenu } from 'routes/Menu/domains/menu'
import { VariantRecipeListItem } from '../VariantRecipeListItem/VariantRecipeListItem'
import css from './VariantRecipeList.css'

/**
 *  Component that duplicates the VarianRecipeListContainer.
 *
 *  The difference is: it is powered through the hook interface.
 *
 *  It eventually would replace the VarianRecipeListContainer.
 */
export const RecipeAlternativeOptions = ({
  recipeId,
  originalId,
  categoryId,
  closeOnSelection,
  isOnDetailScreen = false,
}) => {
  const { getAlternativeOptionsForRecipe } = useMenu()
  const alternativeOptionsForRecipe = getAlternativeOptionsForRecipe({
    originalId,
    recipeId,
    isOnDetailScreen,
    isFromShowcaseMenu: false,
    categoryId,
    closeOnSelection,
  })

  const preventPropagation = (e) => e.stopPropagation()

  return (
    <>
      <div className={css.recipeList} role="button" tabIndex={-1} onClick={preventPropagation} onKeyPress={preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
        <ul className={css.recipeListText}>
          {alternativeOptionsForRecipe.map(({ recipeId: rId, recipeName, changeCheckedRecipe, isChecked, isFromShowcaseMenu, isOutOfStock, surcharge, allergenInfo}) => (
            <VariantRecipeListItem
              key={rId}
              recipeId={rId}
              recipeName={recipeName}
              changeCheckedRecipe={changeCheckedRecipe}
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
}

RecipeAlternativeOptions.defaultProps = {
  categoryId: null,
  closeOnSelection: false,
  isOnDetailScreen: false,
}
