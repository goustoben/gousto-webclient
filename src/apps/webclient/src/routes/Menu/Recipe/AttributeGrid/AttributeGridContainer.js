import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getNumPortions } from 'selectors/basket'
import { getRecipes } from 'selectors/root'

import { AttributeGrid } from './AttributeGrid.logic'

const getIdForAttributeGrid = (state, props) => props.recipeId

const getRecipeForAttributeGrid = createSelector(
  [getRecipes, getIdForAttributeGrid],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const { isChefPrepared } = ownProps

  const numPortions = getNumPortions(state)
  const recipe = getRecipeForAttributeGrid(state, ownProps)

  const cookingTime = numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')
  const equipment = recipe.get('equipment')

  const useWithin = recipe.get('shelfLifeDays')
  const fiveADay = recipe.get('fiveADay')
  const diet = recipe.get('dietType')

  return {
    numPortions: isChefPrepared ? numPortions : null,
    cookingTime: isChefPrepared ? null : cookingTime,
    equipment: isChefPrepared ? null : equipment,
    useWithin,
    diet,
    fiveADay
  }
}

const AttributeGridContainer = connect(mapStateToProps)(AttributeGrid)

export { AttributeGridContainer }
