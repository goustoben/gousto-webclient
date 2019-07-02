import { connect } from 'react-redux'
import config from 'config/recipes'
import { getFoodBrandFilter } from 'selectors/filters'
import { selectFoodBrand } from 'actions/filters'
import { FoodBrandPage } from './FoodBrandPage'

const mapStateToProps = (state, ownProps) => {
  const selectedFoodBrand = getFoodBrandFilter(state)
  const query = ownProps.location && ownProps.location.query

  return {
    name: selectedFoodBrand.name,
    description: config.foodBrandDescription[selectedFoodBrand.slug],
    borderColor: selectedFoodBrand.borderColor,
    browser: state.request.get('browser'),
    menuRecipeDetailShow: (query) ? ownProps.location.query.recipeDetailId : '',
    features: state.features,
  }
}
const FoodBrandPageContainer = connect(mapStateToProps, {
  removeFoodBrand: () => selectFoodBrand(null)
})(FoodBrandPage)

export { FoodBrandPageContainer }
