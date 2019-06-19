import { connect } from 'react-redux'
import config from 'config/recipes'
import { FoodBrandPage } from './FoodBrandPage'

const mapDispatchToProps = (state) => {
  const selectedFoodbrand = {
    title: '10-Minute Meals',
    slug: '10-minute-meals',
    borderColor: '#000'
  }

  return {
    title: selectedFoodbrand.title,
    description: config.foodBrandDescription[selectedFoodbrand.slug]
  }
}
const FoodBrandPageContainer = connect(mapDispatchToProps, {})(FoodBrandPage)

export { FoodBrandPageContainer }
