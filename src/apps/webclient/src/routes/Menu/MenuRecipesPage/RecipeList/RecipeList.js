import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { RecipeTile } from '../../components/RecipeTile'
import css from './RecipeList.css'
import { RecipeContextProvider } from '../../context/recipeContext'
import { CTAToAllRecipesContainer } from '../../Recipe/CTAToAllRecipes'

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
    const { recipes, trackRecipeOrderDisplayed } = this.props

    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))

    trackRecipeOrderDisplayed(recipeIds.toJS())
  }

  render() {
    const { recipes, currentCollectionId } = this.props

    return (
      <div className={css.emeRecipeList}>
        {recipes.map((value) => (
          <RecipeContextProvider key={value.recipe.get('id')} value={value.recipe}>
            <RecipeTile
              recipeId={value.recipe.get('id')}
              originalId={value.originalId}
              categoryId={currentCollectionId}
            />
          </RecipeContextProvider>
        ))}
        <CTAToAllRecipesContainer />
      </div>
    )
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired
}

export { RecipeList }
