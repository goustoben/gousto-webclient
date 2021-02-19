import { connect } from 'react-redux'
import { DietaryRequirementsPage } from './DietaryRequirementsPage'
import { getRecipesByCollectionSlugs } from '../selectors/recipeList'
import { isMenuLoading } from '../selectors/menu'

const mapStateToProps = (state) => ({
  recipesForCollections: getRecipesByCollectionSlugs(state, {
    collectionSlugs: [
      'dairy-free',
      'gluten-free',
      'vegetarian',
      'plant-based',
    ]
  }),
  isMenuLoading: isMenuLoading(state)
})

export const DietaryRequirementsPageContainer = connect(mapStateToProps, null)(DietaryRequirementsPage)
