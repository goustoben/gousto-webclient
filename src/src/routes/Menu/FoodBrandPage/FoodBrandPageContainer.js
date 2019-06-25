import { connect } from 'react-redux'
import config from 'config/recipes'
import { getFoodBrandFilter } from 'selectors/filters'
import { selectFoodBrand } from 'actions/filters'
import { FoodBrandPage } from './FoodBrandPage'

const mapDispatchToProps = (state) => {
  const selectedFoodBrand = getFoodBrandFilter(state)

  return {
    name: selectedFoodBrand.name,
    description: config.foodBrandDescription[selectedFoodBrand.slug],
    borderColor: selectedFoodBrand.borderColor,
    browser: state.request.get('browser'),
  }
}
const FoodBrandPageContainer = connect(mapDispatchToProps, {
  removeFoodBrand: selectFoodBrand
})(FoodBrandPage)

export { FoodBrandPageContainer }
