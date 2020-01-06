import { connect } from 'react-redux'
import config from 'config/recipes'
import { getRecipeGroupFilter } from 'selectors/filters'
import { filterRecipeGrouping } from 'actions/filters'
import { showDetailRecipe } from 'actions/menu'
import { FilteredRecipePage } from '../FilteredRecipePage'

const mapStateToProps = (state) => {
  const { locationBeforeTransitions } = state.routing
  const selectedFoodBrand = getRecipeGroupFilter(state)
  const query = locationBeforeTransitions && locationBeforeTransitions.query

  return {
    name: selectedFoodBrand.name,
    description: config.foodBrandDescription[selectedFoodBrand.slug],
    borderColor: selectedFoodBrand.borderColor,
    menuRecipeDetailShow: (query) ? query.recipeDetailId : '',
  }
}
const FoodBrandPageContainer = connect(mapStateToProps, {
  removeRecipeFilter: () => filterRecipeGrouping(null, 'foodBrand'),
  showDetailRecipe
})(FilteredRecipePage)

export { FoodBrandPageContainer }
