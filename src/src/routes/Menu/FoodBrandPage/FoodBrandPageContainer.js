import { connect } from 'react-redux'
import config from 'config/recipes'
import { getFoodBrandFilter } from 'selectors/filters'
import { selectFoodBrand } from 'actions/filters'
import { FoodBrandPage } from './FoodBrandPage'

const mapStateToProps = (state) => {
  const { locationBeforeTransitions } = state.routing
  const selectedFoodBrand = getFoodBrandFilter(state)
  const query = locationBeforeTransitions && locationBeforeTransitions.query

  return {
    name: selectedFoodBrand.name,
    description: config.foodBrandDescription[selectedFoodBrand.slug],
    borderColor: selectedFoodBrand.borderColor,
    browser: state.request.get('browser'),
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
    menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
  }
}
const FoodBrandPageContainer = connect(mapStateToProps, {
  removeFoodBrand: () => selectFoodBrand(null)
})(FoodBrandPage)

export { FoodBrandPageContainer }
