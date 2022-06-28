import { connect } from 'react-redux'
import {
  getAbandonBasketSessionState,
  trackAbandonBasketEligibility,
  trackAbandonBasketContinueToMenu
} from 'actions/abandonBasket'
import { redirect } from 'actions/redirect'
import { getUserOrders } from 'selectors/user'
import { getNumPortions, getBasketRecipes, getBasketDate } from 'selectors/basket'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'
import { AbandonBasketModalWrapper } from './AbandonBasketModalWrapper'

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
    getAbandonBasketSessionState,
    redirect,
    trackAbandonBasketEligibility,
    trackAbandonBasketContinueToMenu
  }
)(AbandonBasketModalWrapper)
