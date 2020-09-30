import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { EMERecipeTileContainer } from '../ElevatedMenuExperience/RecipeTile/EMERecipeTile'
import css from './RecipeList.css'

class RecipeList extends React.PureComponent {
  componentDidMount() {
    this.trackRecipeOrderDisplayed()
  }

  componentDidUpdate(prevProps) {
    const { currentCollectionId } = this.props
    if (currentCollectionId !== prevProps.currentCollectionId) {
      this.trackRecipeOrderDisplayed()
    }
  }

  trackRecipeOrderDisplayed() {
    const { originalOrderRecipeIds, recipes, trackRecipeOrderDisplayed } = this.props

    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))

    trackRecipeOrderDisplayed(
      originalOrderRecipeIds.toJS(),
      recipeIds.toJS()
    )
  }

  render() {
    const {
      recipes,
    } = this.props

    return (
      <div className={css.emeRecipeList}>
        {recipes.map((value) =>
          <EMERecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} />
        )}
      </div>
    )
  }
}

RecipeList.propTypes = {
  originalOrderRecipeIds: PropTypes.instanceOf(Immutable.List),
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired,
}

RecipeList.defaultProps = {
  originalOrderRecipeIds: Immutable.List([]),
}

export { RecipeList }
