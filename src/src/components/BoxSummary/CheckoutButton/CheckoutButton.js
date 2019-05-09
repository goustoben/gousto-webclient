import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import config from 'config'
import { Button } from 'goustouicomponents'
import css from './CheckoutButton.css'

class CheckoutButton extends React.Component {

  static propTypes = {
    promoCode: PropTypes.string,
    postcode: PropTypes.string,
    orderId: PropTypes.string,
    buttonClass: PropTypes.string,
    className: PropTypes.string,
    numPortions: PropTypes.oneOf([2, 4]).isRequired,
    deliveryDayId: PropTypes.string,
    slotId: PropTypes.string.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.instanceOf(Button),
      PropTypes.node,
      PropTypes.element,
    ]).isRequired,
    basketCheckedOut: PropTypes.func.isRequired,
    basketProceedToCheckout: PropTypes.func.isRequired,
    view: PropTypes.string,
    addressId: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map).isRequired,
    onClick: PropTypes.func,
    orderUpdate: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    boxSummaryVisibilityChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    addressId: '',
    promoCode: '',
    postcode: '',
    orderId: '',
    view: '',
    onClick: () => {},
    boxSummaryVisibilityChange: () => {},
  }

  getOrderAction = () => {
    const { userOrders, orderId } = this.props

    const userOrder = userOrders.filter(order => order.get('id') === orderId).first()
    const recipeAction = (userOrder && userOrder.get('recipeItems').size > 0) ? 'update' : 'choice'
    const orderAction = orderId ? `recipe-${recipeAction}` : 'transaction'

    return orderAction
  }

  handleClick = () => {
    const {
      basketCheckedOut, basketProceedToCheckout, boxSummaryVisibilityChange, deliveryDayId,
      isAuthenticated, numPortions, orderUpdate, orderId, onClick, recipes, view, slotId,
    } = this.props

    onClick()
    boxSummaryVisibilityChange(false)
    basketCheckedOut(recipes.size, view)

    if (orderId) {
      orderUpdate(orderId, this.formatRecipes(recipes), deliveryDayId, slotId, numPortions, this.getOrderAction())
    } else if (!isAuthenticated) {
      basketProceedToCheckout()
    } else {
      this.refs.formCheckout.submit()
    }
  }

  formatRecipes = (recipes) => (
    recipes.reduce((recipesArray, qty, recipeId) => {
      for (let i = 1; i <= qty; i++) {
        recipesArray.push(recipeId)
      }

      return recipesArray
    }, [])
  )

  render() {
    const {
      addressId, buttonClass, children, className, deliveryDayId,
      numPortions, orderId, postcode, promoCode, recipes, slotId,
    } = this.props

    const formattedRecipes = this.formatRecipes(recipes)
    const orderAction = this.getOrderAction()
    const segment = React.cloneElement(React.Children.only(children).props.children, { onClick: this.handleClick })
    const button = React.cloneElement(children, { children: segment, className: buttonClass })

    return (
      <div className={className}>
        {button}
        <form action={config.routes.client.checkout} ref="formCheckout" className={css.hide} method="post">
          <input name="deliverypostcode" type="text" value={postcode} readOnly />
          <input name="num_portions" type="number" value={numPortions} readOnly />
          <input name="promocode" type="text" value={promoCode} readOnly />
          <input name="current_order_id" type="text" value={orderId} readOnly />
          <input name="delivery_day_id" type="string" value={deliveryDayId} readOnly />
          <input name="delivery_slot_id" type="string" value={slotId} readOnly />
          <input name="order_action" type="string" value={orderAction} readOnly />
          {addressId ? <input name="address_id" type="string" value={addressId} readOnly /> : null}
          {formattedRecipes.map((recipeId, index) => (
            <input key={index} name="recipes[]" type="text" value={recipeId} readOnly />
          ))}
        </form>
      </div>
    )
  }
}

export default CheckoutButton
