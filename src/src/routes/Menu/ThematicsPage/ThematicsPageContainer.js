import { connect } from 'react-redux'
import { getRecipeGroupFilter } from 'selectors/filters'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import { filterRecipeGrouping } from 'actions/filters'
import { FilteredRecipePage } from '../FilteredRecipePage'

const mapStateToProps = (state) => {
  const selectedFoodBrand = getRecipeGroupFilter(state)
  const collection = getCollectionDetailsBySlug(state, selectedFoodBrand.slug)

  return {
    name: selectedFoodBrand.name,
    description: collection && collection.get('description'),
    borderColor: selectedFoodBrand.borderColor,
  }
}
const ThematicsPage = connect(mapStateToProps, {
  removeRecipeFilter: () => filterRecipeGrouping(null, 'thematic'),
})(FilteredRecipePage)

export { ThematicsPage }
