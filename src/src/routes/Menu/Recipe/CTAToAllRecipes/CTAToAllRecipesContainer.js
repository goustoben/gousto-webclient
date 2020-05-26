import { connect } from 'react-redux'
import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { CTAToAllRecipes } from './CTAToAllRecipes'

const CTAToAllRecipesContainer = connect(null, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(CTAToAllRecipes)

export { CTAToAllRecipesContainer }
