import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantRecipeList.css'
import { VariantRecipeListItemContainer } from '../VariantRecipeListItem'

const compareCoreRecipeIds = (a, b) => a.coreRecipeId - b.coreRecipeId

class VariantRecipeList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRecipeId: '',
    }
  }

  componentDidMount() {
    const { selectedRecipe: { coreRecipeId }, trackVariantListDisplay, isOnDetailScreen, recipeVariants } = this.props
    const view = isOnDetailScreen ? 'details' : 'grid'
    this.setState({
      selectedRecipeId: coreRecipeId,
    })
    if (recipeVariants) {
      trackVariantListDisplay(view)
    }
  }

  changeCheckedRecipe = (recipeId, isOutOfStock) => {
    const {
      originalId,
      selectRecipeVariant,
      collectionId,
      menuRecipeDetailVisibilityChange,
      isOnDetailScreen,
      recipeVariants,
      selectRecipeSide,
      unselectRecipeSide,
      selectedRecipeSide,
      hasRecipeAddedToBasket,
      hasSideAddedToBasket,
      firstSideRecipeId,
      basketRecipeAdd,
      basketRecipeRemove,
    } = this.props
    const view = isOnDetailScreen ? 'details' : 'grid'
    const hasSides = recipeVariants && recipeVariants.type === 'sides'
    if (hasSides) {
      if (selectedRecipeSide || hasSideAddedToBasket) {
        if (hasSideAddedToBasket) {
          basketRecipeRemove(firstSideRecipeId)
          basketRecipeAdd(originalId)
        }
        unselectRecipeSide(originalId)
      } else {
        if (hasRecipeAddedToBasket) {
          basketRecipeRemove(originalId)
          basketRecipeAdd(firstSideRecipeId)
        }
        selectRecipeSide(originalId, recipeId)
      }
    } else {
      selectRecipeVariant(originalId, recipeId, collectionId, isOutOfStock, view)

      this.setState({
        selectedRecipeId: recipeId,
      })

      if (isOnDetailScreen) {
        menuRecipeDetailVisibilityChange(recipeId)
      }
    }
  }

  preventPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    const {
      recipeVariants,
      recipeVariantsArray,
      selectedRecipe,
      isOnDetailScreen,
      isOnSidesModal,
      selectedRecipeSide,
      hasSideAddedToBasket,
    } = this.props
    const { selectedRecipeId } = this.state
    const variantsType = recipeVariants ? recipeVariants.type : null

    if (!recipeVariants || recipeVariantsArray.length === 0) {
      return null
    }

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
              selectedRecipeSide={selectedRecipeSide}
              isOnDetailScreen={isOnDetailScreen}
              hasSides={hasSides}
              isOnSidesModal={isOnSidesModal}
              hasSideAddedToBasket={hasSideAddedToBasket}
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
  isOnSidesModal: PropTypes.bool,
  selectRecipeVariant: PropTypes.func.isRequired,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  trackVariantListDisplay: PropTypes.func.isRequired,
  selectRecipeSide: PropTypes.func.isRequired,
  unselectRecipeSide: PropTypes.func.isRequired,
  selectedRecipeSide: PropTypes.string,
  hasRecipeAddedToBasket: PropTypes.bool.isRequired,
  hasSideAddedToBasket: PropTypes.bool.isRequired,
  basketRecipeAdd: PropTypes.func.isRequired,
  basketRecipeRemove: PropTypes.func.isRequired,
  firstSideRecipeId: PropTypes.string.isRequired,
}

VariantRecipeList.defaultProps = {
  recipeVariants: null,
  selectedRecipe: {},
  isOnDetailScreen: false,
  isOnSidesModal: false,
  selectedRecipeSide: null,
}
export { VariantRecipeList }
