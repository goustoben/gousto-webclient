import { connect } from 'react-redux'
import { CTAToAllRecipes } from './CTAToAllRecipes'
import { changeCollectionToAllRecipesViaCTA } from "actions/filters/changeCollectionToAllRecipesViaCTA"

const CTAToAllRecipesContainer = connect(null, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(CTAToAllRecipes)

export { CTAToAllRecipesContainer }
