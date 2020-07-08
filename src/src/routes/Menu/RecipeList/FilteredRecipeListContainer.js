import { connect } from 'react-redux'

import { RecipeList } from './RecipeList'

const mapStateToProps = (state, ownProps) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions

  // this component is used for thematic/food brand pages
  // which don't need CTAs shown, so this should be false
  const isCurrentCollectionRecommendation = false

  return {
    originalOrderRecipeIds: ownProps.originalOrderRecipeIds,
    recipes: ownProps.recipes,
    numPortions: state.basket.get('numPortions'),
    isCurrentCollectionRecommendation,
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: state.request.get('browser')
  }
}

const FilteredRecipeListContainer = connect(mapStateToProps)(RecipeList)

export { FilteredRecipeListContainer }
