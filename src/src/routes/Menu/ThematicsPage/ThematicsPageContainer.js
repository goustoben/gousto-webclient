import { connect } from 'react-redux'
import config from 'config/recipes'
import { getRecipeGroupFilter } from 'selectors/filters'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import { filterRecipeGrouping } from 'actions/filters'
import { FilteredRecipePage } from 'components/FilteredRecipePage'

const mapStateToProps = (state) => {
  const { locationBeforeTransitions } = state.routing
  const selectedFoodBrand = getRecipeGroupFilter(state)
  const query = locationBeforeTransitions && locationBeforeTransitions.query
  const collection = getCollectionDetailsBySlug(state, selectedFoodBrand.slug)

  return {
    name: selectedFoodBrand.name,
    description: collection && collection.get('description'),
    borderColor: config.thematicsBoarderColor,
    browser: state.request.get('browser'),
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
    menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
  }
}
const ThematicsPage = connect(mapStateToProps, {
  removeRecipeFilter: () => filterRecipeGrouping(null, 'thematic')
})(FilteredRecipePage)

export { ThematicsPage }
