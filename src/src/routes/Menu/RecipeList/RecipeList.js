import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import actions from 'actions/tracking'

import { DesktopRecipeList } from './DesktopRecipeList'
import { MobileRecipeList } from './MobileRecipeList'
import { TabletRecipeList } from './TabletRecipeList/TabletRecipeList'

class RecipeList extends React.PureComponent {
  static propTypes = {
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List),
    showDetailRecipe: PropTypes.func.isRequired,
    isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    collectionFilterChange: PropTypes.func,
    thematicName: PropTypes.string,
    deliveryDate: PropTypes.string,
    isFoodBrandClickable: PropTypes.bool,

    recipes: PropTypes.instanceOf(Immutable.List).isRequired,
    browserType: PropTypes.string.isRequired
  }

  static defaultProps = {
    filteredRecipeIds: Immutable.List([]),
    isFoodBrandClickable: true
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.trackRecipeOrderDisplayed()
  }

  componentDidUpdate() {
    this.trackRecipeOrderDisplayed()
  }

  trackRecipeOrderDisplayed() {
    const { filteredRecipeIds, recipes } = this.props
    const { store } = this.context

    const recipeIds = recipes.map(recipe => recipe.get('id'))

    store.dispatch(actions.trackRecipeOrderDisplayed(
      filteredRecipeIds.toJS(),
      recipeIds.toJS()
    ))
  }

  render() {
    const {
      recipes,
      browserType,
      showDetailRecipe,
      thematicName,
      isCurrentCollectionRecommendation,
      deliveryDate,
      collectionFilterChange,
      isFoodBrandClickable
    } = this.props

    if (browserType === 'mobile') {
      return (
        <MobileRecipeList
          recipes={recipes}
          showDetailRecipe={showDetailRecipe}
          thematicName={thematicName}
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          deliveryDate={deliveryDate}
          collectionFilterChange={collectionFilterChange}
          isFoodBrandClickable={isFoodBrandClickable}
        />
      )
    }

    if (browserType === 'tablet') {
      return (
        <TabletRecipeList
          recipes={recipes}
          showDetailRecipe={showDetailRecipe}
          thematicName={thematicName}
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          deliveryDate={deliveryDate}
          collectionFilterChange={collectionFilterChange}
          isFoodBrandClickable={isFoodBrandClickable}
        />
      )
    }

    return (
      <DesktopRecipeList
        recipes={recipes}
        showDetailRecipe={showDetailRecipe}
        thematicName={thematicName}
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        deliveryDate={deliveryDate}
        collectionFilterChange={collectionFilterChange}
        isFoodBrandClickable={isFoodBrandClickable}
      />
    )
  }
}

export { RecipeList }
