import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable no-caps
import Order from './Order'
import NoOrders from './NoOrders'
import NewAddressModal from './NewAddressModal'
import CancelledAllBoxesModal from './CancelledAllBoxesModal'

const OrdersList = ({ orders, recipes, boxType }) => (
  <div>
    <NewAddressModal />
    <CancelledAllBoxesModal />
    {orders.size < 1 ? <NoOrders recipes={recipes} boxType={boxType} /> : null}
    {orders.toList().map((order) => (
      <Order key={order.get('id')} order={order} />
    ))}
  </div>
)

OrdersList.propTypes = {
  orders: PropTypes.instanceOf(Immutable.Map),
  recipes: PropTypes.instanceOf(Immutable.Map),
  boxType: PropTypes.string,
}
OrdersList.defaultProps = {
  orders: Immutable.fromJS({}),
  recipes: Immutable.fromJS({}),
  boxType: '',
}

export default OrdersList
