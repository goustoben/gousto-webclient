import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import config from 'config/recipes'
import { FilteredRecipePage } from '../FilteredRecipePage'
import { getFoodBrandForSlug } from '../selectors/food-brand'

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps

  const foodBrandInfo = getFoodBrandForSlug(state)(params.slug)

  if (!foodBrandInfo) {
    return {
      name: '',
      description: '',
      borderColor: '#FF0000',
      recipes: Immutable.List([]),
      isFoodBrandClickable: false
    }
  }

  const { foodBrand, recipes, recipeIds } = foodBrandInfo

  return {
    name: foodBrand.get('name'),
    description: config.foodBrandDescription[params.slug],
    borderColor: foodBrand.getIn(['properties', 'ribbonColor']),
    recipes,
    filteredRecipeIds: recipeIds,
    isFoodBrandClickable: false
  }
}

const FoodBrandPageContainer = connect(mapStateToProps, {
  backToAllRecipes: () => push('/menu')
})(FilteredRecipePage)

export { FoodBrandPageContainer }
