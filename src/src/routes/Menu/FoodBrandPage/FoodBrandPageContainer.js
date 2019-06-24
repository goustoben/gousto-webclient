import { connect } from 'react-redux'
import config from 'config/recipes'
import { FoodBrandPage } from './FoodBrandPage'

const mapDispatchToProps = (state) => {
  const selectedFoodBrand = {
    title: '10-Minute Meals',
    slug: '10-minute-meals',
    borderColor: 'blue',
  }

  return {
    title: selectedFoodBrand.title,
    description: config.foodBrandDescription[selectedFoodBrand.slug],
    borderColor: selectedFoodBrand.borderColor,
    browser: state.request.get('browser'),
  }
}
const FoodBrandPageContainer = connect(mapDispatchToProps, {})(FoodBrandPage)

export { FoodBrandPageContainer }
