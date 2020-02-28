import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import { FilteredRecipePage } from '../FilteredRecipePage'
import { getSortedRecipes } from '../selectors/sorting'

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps

  const collection = getCollectionDetailsBySlug(state, params.slug)

  if (!collection) {
    return {
      name: '',
      description: '',
      borderColor: '#FF0000',
      recipes: Immutable.List([]),
      isFoodBrandClickable: true
    }
  }

  const { recipes, recipeIds } = getSortedRecipes(state)(collection.get('id'))

  return {
    name: collection.get('shortTitle'),
    description: collection.get('description'),
    borderColor: collection.get('colour'),
    recipes,
    filteredRecipeIds: recipeIds,
    isFoodBrandClickable: true
  }
}
const ThematicsPageContainer = connect(mapStateToProps, {
  backToAllRecipes: () => push('/menu')
})(FilteredRecipePage)

export { ThematicsPageContainer }
