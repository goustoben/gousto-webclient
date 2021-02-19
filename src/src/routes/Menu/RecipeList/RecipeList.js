import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'
import { RecipeTileContainer } from '../components/RecipeTile'
import { CategoryScrollTrackerContainer } from '../components/CategoryScrollTracker'
import { CategoryCarouselsListContainer } from './CategoryCarouselsList'
import { ViewAllRecipesButtonContainer } from './ViewAllRecipesButton'
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
      browserType,
      query
    } = this.props

    return (
      <div>
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled>
          <Fragment>
            {browserType === 'mobile' && !query.collection
              ? (
                <div>
                  <CategoryCarouselsListContainer />
                  <ViewAllRecipesButtonContainer />
                </div>
              )
              : (
                <div className={css.emeRecipeList}>
                  {recipes.map((value) =>
                    <RecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} originalId={value.originalId} />
                  )}
                </div>
              )}
            {browserType !== 'mobile' && <CategoryScrollTrackerContainer actionType="scroll_recipes" />}
          </Fragment>
        </OptimizelyRolloutsContainer>
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled={false}>
          <div className={css.emeRecipeList}>
            {recipes.map((value) =>
              <RecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} originalId={value.originalId} />
            )}
          </div>
        </OptimizelyRolloutsContainer>
      </div>
    )
  }
}

RecipeList.propTypes = {
  originalOrderRecipeIds: PropTypes.instanceOf(Immutable.List),
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired,
  browserType: PropTypes.string.isRequired,
  query: PropTypes.shape({
    collection: PropTypes.string
  }),
}

RecipeList.defaultProps = {
  originalOrderRecipeIds: Immutable.List([]),
  query: {}
}

export { RecipeList }
