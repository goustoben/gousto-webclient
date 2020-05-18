import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getCutoffDate } from 'routes/Menu/selectors/cutoff'

import { RecipeList } from './RecipeList'

const mapStateToProps = (state, ownProps) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions

  // this component is used for thematic/food brand pages
  // which don't need CTAs shown, so this should be false
  const isCurrentCollectionRecommendation = false

  return {
    filteredRecipeIds: ownProps.filteredRecipeIds,
    recipes: ownProps.recipes,
    cutoffDate: getCutoffDate(state),
    numPortions: state.basket.get('numPortions'),
    isCurrentCollectionRecommendation,
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: state.request.get('browser')
  }
}

const FilteredRecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(RecipeList)

export { FilteredRecipeListContainer }
