import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantRecipeList.module.css'
import { VariantRecipeListItemContainer } from '../VariantRecipeListItem'

const compareCoreRecipeIds = (a, b) => a.coreRecipeId - b.coreRecipeId

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

      selectRecipeVariant,
      collectionId,
      menuRecipeDetailVisibilityChange,
      isOnDetailScreen,
      closeOnSelection
    } = this.props

    const view = isOnDetailScreen ? 'details' : 'grid'

    selectRecipeVariant(originalId, checkedRecipeId, collectionId, isOutOfStock, view, closeOnSelection)

    if (isOnDetailScreen) {
      menuRecipeDetailVisibilityChange(checkedRecipeId)
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
      isFromShowcaseMenu
    } = this.props
    if (!recipeVariants || recipeVariantsArray.length === 0) {
      return null
    }

    const selectedRecipeId = selectedRecipe ? selectedRecipe.coreRecipeId : null
    const variants = ([selectedRecipe, ...recipeVariantsArray]).sort(compareCoreRecipeIds)

    return (
      <div className={css.recipeList} role="button" tabIndex={-1} onClick={this.preventPropagation} onKeyPress={this.preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
        <ul className={css.recipeListText}>
          {variants.map(({ coreRecipeId, displayName }) => (
            <VariantRecipeListItemContainer
              key={coreRecipeId}
              recipeId={coreRecipeId}
              recipeName={displayName}
              changeCheckedRecipe={this.changeCheckedRecipe}
              isChecked={selectedRecipeId === coreRecipeId}
              isOnDetailScreen={isOnDetailScreen}
              isFromShowcaseMenu={isFromShowcaseMenu}
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
  selectRecipeVariant: PropTypes.func.isRequired,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  trackVariantListDisplay: PropTypes.func.isRequired,
  closeOnSelection: PropTypes.bool,
  isFromShowcaseMenu: PropTypes.bool,
}

VariantRecipeList.defaultProps = {
  recipeVariants: null,
  selectedRecipe: {},
  isOnDetailScreen: false,
  closeOnSelection: true,
  isFromShowcaseMenu: false,
}
export { VariantRecipeList }
