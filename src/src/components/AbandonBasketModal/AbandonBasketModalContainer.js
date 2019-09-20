import { connect } from 'react-redux'
import {
  abandonBasketModalViewed,
  getAbandonBasketSessionState,
  trackAbandonBasketEligibility,
  trackAbandonBasketContinueToMenu
} from 'actions/abandonBasket'
import { basketRecipesClear } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { getUserOrders } from 'selectors/user'
import { getNumPortions, getBasketRecipes, getBasketDate } from 'selectors/basket'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'
import { AbandonBasketModal } from './AbandonBasketModal'

const mapStateToProps = state => ({
  recipes: getRecipes(state),
  numPortions: getNumPortions(state),
  basketRecipes: getBasketRecipes(state),
  orders: getUserOrders(state),
  orderDate: getBasketDate(state),
  deliveryDays: getBoxSummaryDeliveryDays(state),
})

export const AbandonBasketModalContainer = connect(
  mapStateToProps,
  {
    abandonBasketModalViewed,
    getAbandonBasketSessionState,
    redirect,
    basketRecipesClear,
    trackAbandonBasketEligibility,
    trackAbandonBasketContinueToMenu
  }
)(AbandonBasketModal)
