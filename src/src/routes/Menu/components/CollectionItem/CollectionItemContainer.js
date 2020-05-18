import { connect } from 'react-redux'
import { CollectionItem } from './CollectionItem'
import { getRecipeListRecipes } from '../../selectors/sorting'

const mapStateToProps = (state, ownProps) => ({
  count: getRecipeListRecipes(state, { collectionId: ownProps.collectionId }).recipes.size
})

const CollectionItemContainer = connect(mapStateToProps)(CollectionItem)

export {
  CollectionItemContainer,
}
