import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { ViewAllRecipesButton } from './ViewAllRecipesButton'

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(collectionFilterChange(ALL_RECIPES_COLLECTION_ID))
})

export const ViewAllRecipesButtonContainer = connect(null, mapDispatchToProps)(ViewAllRecipesButton)
