import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import { FilteredRecipePage } from '../FilteredRecipePage'
import { getRecipeListRecipes } from '../selectors/sorting'

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps

  const collection = getCollectionDetailsBySlug(state, params.slug)

  if (!collection) {
    return {
      name: '',
      description: '',
      borderColor: '#FF0000',
      recipes: Immutable.List([]),
    }
  }

  const { recipes, recipeIds } = getRecipeListRecipes(state, { collectionId: collection.get('id') })

  return {
    name: collection.get('shortTitle'),
    description: collection.get('description'),
    borderColor: collection.get('colour'),
    recipes,
    filteredRecipeIds: recipeIds,
  }
}
const ThematicsPageContainer = connect(mapStateToProps, {
  backToAllRecipes: () => push('/menu')
})(FilteredRecipePage)

export { ThematicsPageContainer }
