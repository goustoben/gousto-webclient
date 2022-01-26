import { connect } from 'react-redux'
import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getCurrentCollectionId } from '../../selectors/collections'
import { CTAToAllRecipes } from './CTAToAllRecipes'

function mapStateToProps(state) {
  const collectionId = getCurrentCollectionId(state)

  return {
    menuCurrentCollectionId: collectionId,
  }
}

const CTAToAllRecipesContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA,
})(CTAToAllRecipes)

export { CTAToAllRecipesContainer }
