import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'

import { DetailAttributeGrid } from './DetailAttributeGrid'

const getRecipeForDetailAttributeGrid = createSelector(
  [getRecipes, (state, props) => props.recipeId],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => ({
  recipe: getRecipeForDetailAttributeGrid(state, ownProps)
})

const DetailAttributeGridContainer = connect(mapStateToProps)(DetailAttributeGrid)

export { DetailAttributeGridContainer }
