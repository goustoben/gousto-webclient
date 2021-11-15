import { connect } from 'react-redux'
import { getUserOrders } from 'selectors/user'
import { getNumPortions, getBasketRecipes, getBasketDate } from 'selectors/basket'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'
import { AbandonBasketModal } from './AbandonBasketModal'
import { getAbandonBasketSessionState } from "actions/abandonBasket/getAbandonBasketSessionState"
import { trackAbandonBasketEligibility } from "actions/abandonBasket/trackAbandonBasketEligibility"
import { trackAbandonBasketContinueToMenu } from "actions/abandonBasket/trackAbandonBasketContinueToMenu"
import { redirect } from "actions/redirect/redirect"

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
)(AbandonBasketModal)
