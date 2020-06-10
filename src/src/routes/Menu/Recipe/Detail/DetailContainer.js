import { connect } from 'react-redux'
import Immutable from 'immutable'

import { getCutoffs } from 'utils/deliveries'
import moment from 'moment'

import { menuRecipeDetailVisibilityChange } from '../../actions/menuRecipeDetails'
import { Detail } from './Detail'

function mapStateToProps(state, ownProps) {
  let [cutoffDate] = getCutoffs(state.basket, state.boxSummaryDeliveryDays) // eslint-disable-line prefer-const
  if (!cutoffDate) {
    cutoffDate = moment()
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toISOString()
  }
  function getBasketRecipes(recipes) {
    return Array.from(recipes.keys())
  }

  return {
    cutoffDate,
    inBasket: getBasketRecipes(state.basket.get('recipes', Immutable.List([]))).includes(ownProps.recipeId),
  }
}

const DetailContainer = connect(mapStateToProps, {
  menuRecipeDetailVisibilityChange: () => menuRecipeDetailVisibilityChange(),
})(Detail)

export { DetailContainer }
