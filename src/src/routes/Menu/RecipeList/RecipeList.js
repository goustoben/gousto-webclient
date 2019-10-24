import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import actions from 'actions/tracking'

import css from './RecipeList.css'
import { DesktopRecipeList } from './DesktopRecipeList'
import { MobileRecipeList } from './MobileRecipeList'

class RecipeList extends React.PureComponent {
  static propTypes = {
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List),
    mobileGridView: PropTypes.bool,
    showDetailRecipe: PropTypes.func,
    isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    collectionFilterChange: PropTypes.func,
    thematicName: PropTypes.string,
    deliveryDate: PropTypes.string,

    recipes: PropTypes.instanceOf(Immutable.List).isRequired,
    isMobile: PropTypes.bool
  }

  static defaultProps = {
    filteredRecipeIds: Immutable.List([]),
    recipes: Immutable.List([])
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

    store.dispatch(actions.trackRecipeOrderDisplayed(
      filteredRecipeIds.toJS(),
      recipes.map(recipe => recipe.get('id')).toJS()
    ))
  }

  render() {
    const { 
      recipes,
      mobileGridView,
      showDetailRecipe,
      thematicName,
      isCurrentCollectionRecommendation,
      deliveryDate,
      collectionFilterChange,
      isMobile
    } = this.props

    if (isMobile) {
      return (
        <MobileRecipeList
          recipes={recipes}
          mobileGridView={mobileGridView}
          showDetailRecipe={showDetailRecipe}
          thematicName={thematicName}
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          deliveryDate={deliveryDate}
          collectionFilterChange={collectionFilterChange}
        />
      )
    }

    return (
      <DesktopRecipeList
        recipes={recipes}
        mobileGridView={mobileGridView}
        showDetailRecipe={showDetailRecipe}
        thematicName={thematicName}
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        deliveryDate={deliveryDate}
        collectionFilterChange={collectionFilterChange}
      />
    )
  }
}

export { RecipeList }
