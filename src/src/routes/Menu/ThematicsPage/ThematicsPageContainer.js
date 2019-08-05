import { connect } from 'react-redux'
import config from 'config/recipes'
import { getFoodBrandFilter } from 'selectors/filters'
import { getCollectionDescritpion } from 'selectors/collections'
import { selectFoodBrand } from 'actions/filters'
import { FilteredRecipePage } from 'components/FilteredRecipePage'

const mapStateToProps = (state) => {
  const { locationBeforeTransitions } = state.routing
  const selectedFoodBrand = getFoodBrandFilter(state)
  const query = locationBeforeTransitions && locationBeforeTransitions.query

  return {
    name: selectedFoodBrand.name,
    description: getCollectionDescritpion(state, selectedFoodBrand.slug),
    borderColor: config.thematicsBoarderColor,
    browser: state.request.get('browser'),
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
    menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
  }
}
const ThematicPage = connect(mapStateToProps, {
  removeRecipeFilter: () => selectFoodBrand(null, 'thematic')
})(FilteredRecipePage)

export { ThematicPage }
