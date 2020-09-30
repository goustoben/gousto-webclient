import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { viewAllFooterButtonClicked } from '../../actions/menuViewAllButton'
import { ViewAllRecipesButton } from './ViewAllRecipesButton'

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(collectionFilterChange(ALL_RECIPES_COLLECTION_ID))
    dispatch(viewAllFooterButtonClicked())
  }
})

export const ViewAllRecipesButtonContainer = connect(null, mapDispatchToProps)(ViewAllRecipesButton)
