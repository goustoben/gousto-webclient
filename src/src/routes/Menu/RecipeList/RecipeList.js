import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { ThreeColumnRecipeList } from './ThreeColumnRecipeList'
import { SingleColumnRecipeList } from './SingleColumnRecipeList'
import { EMERecipeList } from '../ElevatedMenuExperience/EMERecipeList'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'

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
      thematicName,
      isCurrentCollectionRecommendation,
      deliveryDate,
    } = this.props

    return (
      <div>
        <OptimizelyRolloutsContainer featureName="recipe_tile_foundations" featureEnabled>
          <EMERecipeList recipes={recipes} />
        </OptimizelyRolloutsContainer>

        <OptimizelyRolloutsContainer featureName="recipe_tile_foundations" featureEnabled={false}>
          {
            browserType === 'mobile'
              ? (
                <SingleColumnRecipeList
                  recipes={recipes}
                  thematicName={thematicName}
                  isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
                  deliveryDate={deliveryDate}
                />
              )
              : (
                <ThreeColumnRecipeList
                  recipes={recipes}
                  thematicName={thematicName}
                  isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
                  deliveryDate={deliveryDate}
                />
              )
          }
        </OptimizelyRolloutsContainer>
      </div>
    )
  }
}

RecipeList.propTypes = {
  originalOrderRecipeIds: PropTypes.instanceOf(Immutable.List),
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  browserType: PropTypes.string.isRequired,
  currentCollectionId: PropTypes.string.isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired,
}

RecipeList.defaultProps = {
  originalOrderRecipeIds: Immutable.List([]),
  deliveryDate: null,
  thematicName: ''
}

export { RecipeList }
