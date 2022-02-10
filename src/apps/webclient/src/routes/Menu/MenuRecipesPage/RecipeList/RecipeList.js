import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { CollectionLink } from '../../components/CollectionLink'
import { RecipeTile } from '../../components/RecipeTile'
import { RecipeContextProvider } from '../../context/recipeContext'
import { CTAToAllRecipesContainer } from '../../Recipe/CTAToAllRecipes'
import css from './RecipeList.css'
import { showDietaryCollectionLinks } from './showDietaryCollectionLinks'

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
    const { recipes, currentCollectionId, isDietaryCollectionLinksEnabled } = this.props

    return (
      <div className={css.emeRecipeList}>
        {recipes.map((value, index) => (
          <React.Fragment key={value.recipe.get('id')}>
            {isDietaryCollectionLinksEnabled && showDietaryCollectionLinks({collectionId: currentCollectionId, atIndex: index}) && <CollectionLink />}
            <RecipeContextProvider value={value.recipe}>
              <RecipeTile
                recipeId={value.recipe.get('id')}
                originalId={value.originalId}
                categoryId={currentCollectionId}
              />
            </RecipeContextProvider>
          </React.Fragment>
        ))}
        <CTAToAllRecipesContainer />
      </div>
    )
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired,
  isDietaryCollectionLinksEnabled: PropTypes.bool,
}

RecipeList.defaultProps = {
  isDietaryCollectionLinksEnabled: false,
}

export { RecipeList }
