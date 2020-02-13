import { connect } from 'react-redux'

import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getNumPortions } from 'selectors/basket'

import { RecipeCard } from './RecipeCard'

const mapStateToProps = (state) => ({
  numPortions: getNumPortions(state),
  cutoffDate: getCutoffDate(state),
  features: state.features,
  allRecipesList: state.menuRecipes,
  recipesStore: state.recipes,
  browserType: state.request.get('browser')
})

const RecipeCardContainer = connect(mapStateToProps)(RecipeCard)

export { RecipeCardContainer }
