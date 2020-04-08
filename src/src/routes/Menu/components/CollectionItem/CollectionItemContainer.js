import { connect } from 'react-redux'
import { CollectionItem } from './CollectionItem'
import { getSortedRecipes } from '../../selectors/sorting'

const mapStateToProps = (state, ownProps) => ({
  count: getSortedRecipes(state)(ownProps.collectionId).recipes.size
})

const CollectionItemContainer = connect(mapStateToProps)(CollectionItem)

export {
  CollectionItemContainer,
}
