import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { viewAllFooterButtonClicked } from '../../actions/menuViewAllButton'
import { ViewAllRecipesButton } from './ViewAllRecipesButton'

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(collectionFilterChange(ALL_RECIPES_COLLECTION_ID))
    dispatch(viewAllFooterButtonClicked())
    window.scrollTo(0, 0)
  }
})

export const ViewAllRecipesButtonContainer = connect(null, mapDispatchToProps)(ViewAllRecipesButton)
