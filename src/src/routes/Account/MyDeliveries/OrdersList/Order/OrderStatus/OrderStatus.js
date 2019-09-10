import PropTypes from 'prop-types'
import React from 'react'
import Content from 'containers/Content'
import css from './OrderStatus.css'

const OrderStatus = ({ orderState, whenCutoff, whenMenuOpen }) => (
  <div>
    {orderState === 'scheduled' ?
      <p className={css.orderStatus}>Menu open {whenMenuOpen}</p>
      : null}
    {orderState === 'menu open' ?
      <p className={css.orderStatus}>{whenCutoff} left to choose recipes</p>
      : null}
    {orderState === 'recipes chosen' ?
      <p className={css.orderStatus}>{whenCutoff} left to edit this box</p>
      : null}
    {orderState === 'confirmed' ?
      <p className={css.orderStatus}>
        <Content contentKeys="myDeliveriesOrderOrderStatusConfirmed" >
          <span>This box is being prepared</span>
        </Content>
      </p>
      : null}
    {orderState === 'dispatched' ?
      <p className={css.orderStatus}>
        <Content contentKeys="myDeliveriesOrderOrderStatusDispatched" >
          <span>This box is out for delivery</span>
        </Content>
      </p>
      : null}
    {orderState === 'cancelled' ?
      <p className={css.orderStatus}>
        <Content contentKeys="myDeliveriesOrderOrderStatusCancelled" >
          <span>You cannot restore this box. Please add a new one.</span>
        </Content>
      </p>
      : null}
  </div>
)

OrderStatus.propTypes = {
  orderState: PropTypes.string,
  whenCutoff: PropTypes.string,
  whenMenuOpen: PropTypes.string,
}

OrderStatus.defaultProps = {
  orderState: '',
  whenCutoff: '',
  whenMenuOpen: '',
}

export default OrderStatus
