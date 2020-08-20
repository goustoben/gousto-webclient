import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantRecipeList.css'
import { VariantRecipeListItemContainer } from '../VariantRecipeListItem'

const compareCoreRecipeIds = (a, b) => a.coreRecipeId - b.coreRecipeId

class VariantRecipeList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRecipeId: ''
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
    } = this.props
    const view = isOnDetailScreen ? 'details' : 'grid'
    selectRecipeVariant(originalId, recipeId, collectionId, isOutOfStock, view)

    this.setState({
      selectedRecipeId: recipeId,
    })

    if (isOnDetailScreen) {
      menuRecipeDetailVisibilityChange(recipeId)
    }
  }

  preventPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    const { recipeVariants, selectedRecipe, isOnDetailScreen, isOnSidesModal } = this.props
    const { selectedRecipeId } = this.state

    if (!recipeVariants || recipeVariants.length === 0) {
      return null
    }

    const allVariants = isOnDetailScreen
      ? [selectedRecipe, ...recipeVariants]
      : (
        isOnSidesModal
          ? recipeVariants
          : [selectedRecipe, ...recipeVariants]
      ).sort(compareCoreRecipeIds)

    return (
      <div className={css.recipeList} role="button" tabIndex={-1} onClick={this.preventPropagation} onKeyPress={this.preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
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
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  selectedRecipe: PropTypes.shape({
    coreRecipeId: PropTypes.string,
    displayName: PropTypes.string
  }),
  isOnDetailScreen: PropTypes.bool,
  isOnSidesModal: PropTypes.bool,
  selectRecipeVariant: PropTypes.func.isRequired,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  trackVariantListDisplay: PropTypes.func.isRequired
}

VariantRecipeList.defaultProps = {
  recipeVariants: [],
  selectedRecipe: {},
  isOnDetailScreen: false,
  isOnSidesModal: false,
}
export { VariantRecipeList }
