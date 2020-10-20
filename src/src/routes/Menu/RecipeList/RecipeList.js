import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { EMERecipeTileContainer } from '../ElevatedMenuExperience/RecipeTile/EMERecipeTile'
import css from './RecipeList.css'
import { CategoryCarouselsListContainer } from '../ElevatedMenuExperience/CategoryCarouselsList'
import { ViewAllRecipesButtonContainer } from '../ElevatedMenuExperience/ViewAllRecipesButton'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'
import { CategoryScrollTrackerContainer } from '../ElevatedMenuExperience/CategoryScrollTracker'

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
                  <EMERecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} originalId={value.originalId} />
                )}
              </div>
            )}
        </OptimizelyRolloutsContainer>
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled={false}>
          <div className={css.emeRecipeList}>
            {recipes.map((value) =>
              <EMERecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} originalId={value.originalId} />
            )}
          </div>
        </OptimizelyRolloutsContainer>

        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled>
          {browserType !== 'mobile' && <CategoryScrollTrackerContainer actionType="scroll_recipes" />}
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
