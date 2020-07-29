import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import actions from 'actions/tracking'

import { ThreeColumnRecipeList } from './ThreeColumnRecipeList'
import { SingleColumnRecipeList } from './SingleColumnRecipeList'
import { EMERecipeList } from '../ElevatedMenuExperience/EMERecipeList'

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
    const { originalOrderRecipeIds, recipes } = this.props
    const { store } = this.context

    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))

    store.dispatch(actions.trackRecipeOrderDisplayed(
      originalOrderRecipeIds.toJS(),
      recipeIds.toJS()
    ))
  }

  render() {
    const {
      recipes,
      browserType,
      thematicName,
      isCurrentCollectionRecommendation,
      deliveryDate,
      isEnabledRecipeTileFoundation
    } = this.props

    if (isEnabledRecipeTileFoundation) {
      return <EMERecipeList recipes={recipes} />
    }

    if (browserType === 'mobile') {
      return (
        <SingleColumnRecipeList
          recipes={recipes}
          thematicName={thematicName}
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          deliveryDate={deliveryDate}
        />
      )
    }

    return (
      <ThreeColumnRecipeList
        recipes={recipes}
        thematicName={thematicName}
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        deliveryDate={deliveryDate}
      />
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
  isEnabledRecipeTileFoundation: PropTypes.bool
}

RecipeList.defaultProps = {
  originalOrderRecipeIds: Immutable.List([]),
  deliveryDate: null,
  thematicName: '',
  isEnabledRecipeTileFoundation: false
}

RecipeList.contextTypes = {
  store: PropTypes.object.isRequired,
}
export { RecipeList }
