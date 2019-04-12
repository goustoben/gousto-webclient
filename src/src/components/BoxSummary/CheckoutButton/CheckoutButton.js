import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import { Button } from 'goustouicomponents'
import config from 'config'
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
    const userOrder = this.props.userOrders.filter(order => order.get('id') === this.props.orderId).first()
    const recipeAction = (userOrder && userOrder.get('recipeItems').size > 0) ? 'update' : 'choice'
    const orderAction = this.props.orderId ? `recipe-${recipeAction}` : 'transaction'

    return orderAction
  }

  handleClick = () => {
    this.props.onClick()
    this.props.boxSummaryVisibilityChange(false)
    this.props.basketCheckedOut(this.props.recipes.size, this.props.view)

    if (this.props.orderId) {
      this.props.orderUpdate(this.props.orderId, this.formatRecipes(this.props.recipes), this.props.deliveryDayId, this.props.slotId, this.props.numPortions, this.getOrderAction())
    } else if (!this.props.isAuthenticated) {
      this.props.basketProceedToCheckout()
    } else {
      this.refs.formCheckout.submit()
    }
  }

  formatRecipes(recipes) {
    return (
      recipes.reduce((recipesArray, qty, recipeId) => {
        for (let i = 1; i <= qty; i++) {
          recipesArray.push(recipeId)
        }

        return recipesArray
      }, [])
    )
  }

  render() {
    const recipes = this.formatRecipes(this.props.recipes)
    const orderAction = this.getOrderAction()
    const segment = React.cloneElement(React.Children.only(this.props.children).props.children, { onClick: this.handleClick })
    const button = React.cloneElement(this.props.children, { children: segment, className: this.props.buttonClass })

    return (
      <div className={this.props.className}>
        {button}
        <form action={config.routes.client.checkout} ref="formCheckout" className={css.hide} method="post">
          <input name="deliverypostcode" type="text" value={this.props.postcode} readOnly />
          <input name="num_portions" type="number" value={this.props.numPortions} readOnly />
          <input name="promocode" type="text" value={this.props.promoCode} readOnly />
          <input name="current_order_id" type="text" value={this.props.orderId} readOnly />
          <input name="delivery_day_id" type="string" value={this.props.deliveryDayId} readOnly />
          <input name="delivery_slot_id" type="string" value={this.props.slotId} readOnly />
          <input name="order_action" type="string" value={orderAction} readOnly />
          {this.props.addressId ? <input name="address_id" type="string" value={this.props.addressId} readOnly /> : null}
          {recipes.map((recipeId, index) => (
            <input key={index} name="recipes[]" type="text" value={recipeId} readOnly />
          ))}
        </form>
      </div>
    )
  }
}

export default CheckoutButton
