import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import css from './VariantRecipeList.css'
import { VariantRecipeListItemContainer } from '../VariantRecipeListItem'

const compareCoreRecipeIds = (a, b) => a.coreRecipeId - b.coreRecipeId
const hasRecipeInBasket = (basketRecipes, recipeId) => basketRecipes.get(recipeId, 0) !== 0

class VariantRecipeList extends React.PureComponent {
  componentDidMount() {
    const { trackVariantListDisplay, isOnDetailScreen, recipeVariants } = this.props
    const view = isOnDetailScreen ? 'details' : 'grid'

    if (recipeVariants) {
      trackVariantListDisplay(view)
    }
  }

  changeCheckedRecipe = (checkedRecipeId, isOutOfStock) => {
    const {
      originalId,
      selectedRecipe,
      basketRecipes,

      selectRecipeVariant,
      collectionId,
      menuRecipeDetailVisibilityChange,
      isOnDetailScreen,
      recipeVariants,
      selectRecipeSide,
      unselectRecipeSide,
      basketRecipeAdd,
      basketRecipeRemove,
      trackSelectSide,
      trackDeselectSide
    } = this.props

    const view = isOnDetailScreen ? 'details' : 'grid'
    const hasSides = recipeVariants && recipeVariants.type === 'sides'

    if (hasSides) {
      const selectedRecipeId = selectedRecipe ? selectedRecipe.coreRecipeId : null
      const sideWasUnchecked = (selectedRecipeId === checkedRecipeId)

      if (sideWasUnchecked) {
        unselectRecipeSide(originalId)
        trackDeselectSide(originalId, checkedRecipeId, isOnDetailScreen ? 'detail' : 'grid')

        if (hasRecipeInBasket(basketRecipes, checkedRecipeId)) {
          basketRecipeRemove(checkedRecipeId)
          basketRecipeAdd(originalId)
        }
      } else {
        selectRecipeSide(originalId, checkedRecipeId)
        trackSelectSide(originalId, checkedRecipeId, isOnDetailScreen ? 'detail' : 'grid')

        if (hasRecipeInBasket(basketRecipes, originalId)) {
          basketRecipeRemove(originalId)
          basketRecipeAdd(checkedRecipeId)
        }
      }
    } else {
      selectRecipeVariant(originalId, checkedRecipeId, collectionId, isOutOfStock, view)

      if (isOnDetailScreen) {
        menuRecipeDetailVisibilityChange(checkedRecipeId)
      }
    }
  }

  preventPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    const {
      selectedRecipe,
      recipeVariants,
      recipeVariantsArray,
      isOnDetailScreen,
      isOnSidesModal,
    } = this.props
    const variantsType = recipeVariants ? recipeVariants.type : null

    if (!recipeVariants || recipeVariantsArray.length === 0) {
      return null
    }

    const selectedRecipeId = selectedRecipe ? selectedRecipe.coreRecipeId : null

    const hasSides = variantsType === 'sides'
    const detailScreenVariants = hasSides ? recipeVariantsArray.sort(compareCoreRecipeIds) : [selectedRecipe, ...recipeVariantsArray].sort(compareCoreRecipeIds)
    const allVariants = isOnDetailScreen
      ? detailScreenVariants
      : (
        isOnSidesModal
          ? recipeVariantsArray
          : [selectedRecipe, ...recipeVariantsArray]
      ).sort(compareCoreRecipeIds)
    const variantsTitle = hasSides ? 'Add a side' : 'Variants available'

    return (
      <div className={css.recipeList} role="button" tabIndex={-1} onClick={this.preventPropagation} onKeyPress={this.preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>{variantsTitle}</h2>}
        <ul className={css.recipeListText}>
          {allVariants.map(({ coreRecipeId, displayName }) => (
            <VariantRecipeListItemContainer
              key={coreRecipeId}
              recipeId={coreRecipeId}
              recipeName={displayName}
              changeCheckedRecipe={this.changeCheckedRecipe}
              isChecked={selectedRecipeId === coreRecipeId}
              isOnDetailScreen={isOnDetailScreen}
              isOnSidesModal={isOnSidesModal}
              hasSides={hasSides}
            />
          )
          )}
        </ul>
      </div>
    )
  }
}

VariantRecipeList.propTypes = {
  originalId: PropTypes.string.isRequired,

  basketRecipes: ImmutablePropTypes.map.isRequired,

  collectionId: PropTypes.string.isRequired,
  recipeVariants: PropTypes.shape({
    type: PropTypes.string,
    variantsList: PropTypes.arrayOf(PropTypes.shape),
    alternatives: PropTypes.arrayOf(PropTypes.shape),
    sides: PropTypes.arrayOf(PropTypes.shape),
  }),
  recipeVariantsArray: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedRecipe: PropTypes.shape({
    coreRecipeId: PropTypes.string,
    displayName: PropTypes.string
  }),
  isOnDetailScreen: PropTypes.bool,
  isOnSidesModal: PropTypes.bool,
  selectRecipeVariant: PropTypes.func.isRequired,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  trackVariantListDisplay: PropTypes.func.isRequired,
  trackSelectSide: PropTypes.func.isRequired,
  trackDeselectSide: PropTypes.func.isRequired,
  selectRecipeSide: PropTypes.func.isRequired,
  unselectRecipeSide: PropTypes.func.isRequired,
  basketRecipeAdd: PropTypes.func.isRequired,
  basketRecipeRemove: PropTypes.func.isRequired,
}

VariantRecipeList.defaultProps = {
  recipeVariants: null,
  selectedRecipe: {},
  isOnDetailScreen: false,
  isOnSidesModal: false,
}
export { VariantRecipeList }
