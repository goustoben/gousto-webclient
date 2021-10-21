import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import { ReactReduxContext } from 'react-redux'
import OrderCancelButton from './OrderCancelButton'

import css from './OrderDetail.css'
import OrderRecipes from './OrderRecipes'
import OrderProducts from './OrderProducts'
import OrderPricingDetail from './OrderPricingDetail'
import OrderDelivery from './OrderDelivery'

class OrderDetail extends React.PureComponent {
  render() {
    const {
      recipesPeriodStockFetchError,
      orderDeliveryDaysFetchError,
      recipes,
      orderId,
      orderState,
      products,
      whenCutoff,
      portionsCount,
      paymentDate,
      priceBreakdown,
      deliveryDate,
      deliveryTimeStart,
      deliveryTimeEnd,
      editDeliveryMode,
      cancellable,
      deliveryDayId,
      deliveryDay
    } = this.props
    const fetchSuccess = recipesPeriodStockFetchError === null && orderDeliveryDaysFetchError === null

    return (
      <div className={css.orderDetail}>
        {['menu open', 'recipes chosen', 'confirmed', 'dispatched'].indexOf(orderState) > -1 ? (
          <section className={css.openCardSection}>
            <OrderRecipes
              recipes={recipes}
              orderId={orderId}
              orderState={orderState}
              whenCutoff={whenCutoff}
              portionsCount={portionsCount}
            />
          </section>
        ) : null}
        {orderState === 'recipes chosen' ? (
          <section className={css.openCardSection}>
            <OrderProducts
              orderId={orderId}
              products={products}
            />
          </section>
        ) : null}
        {['recipes chosen', 'confirmed', 'dispatched'].indexOf(orderState) > -1 ? (
          <section className={css.openCardSection}>
            <OrderPricingDetail
              paymentDate={paymentDate}
              numberOfRecipes={recipes.size}
              priceBreakdown={priceBreakdown}
            />
          </section>
        ) : null}
        {['menu open', 'recipes chosen', 'confirmed', 'dispatched'].indexOf(orderState) > -1 ? (
          <section className={css.openCardSection}>
            <OrderDelivery
              date={deliveryDate}
              timeStart={deliveryTimeStart}
              timeEnd={deliveryTimeEnd}
              orderState={orderState}
              orderId={orderId}
              editDeliveryMode={editDeliveryMode}
              orderDeliveryDaysFetchError={orderDeliveryDaysFetchError}
              recipesPeriodStockFetchError={recipesPeriodStockFetchError}
              fetchSuccess={fetchSuccess}
            />
          </section>
        ) : null}
        {cancellable && orderState !== 'cancelled' ? (
          <section className={css.openCardSection}>
            <OrderCancelButton
              orderId={orderId}
              deliveryDayId={deliveryDayId}
              orderState={orderState}
              deliveryDay={deliveryDay}
            />
          </section>
        ) : null}
      </div>
    )
  }
}

OrderDetail.propTypes = {
  orderId: PropTypes.string,
  deliveryDayId: PropTypes.string,
  orderState: PropTypes.string,
  paymentDate: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.List),
  products: PropTypes.instanceOf(Immutable.List),
  priceBreakdown: PropTypes.instanceOf(Immutable.Map),
  deliveryDate: PropTypes.string,
  deliveryTimeStart: PropTypes.string,
  deliveryTimeEnd: PropTypes.string,
  whenCutoff: PropTypes.string,
  editDeliveryMode: PropTypes.bool,
  cancellable: PropTypes.bool,
  orderDeliveryDaysFetchError: PropTypes.string,
  recipesPeriodStockFetchError: PropTypes.string,
  deliveryDay: PropTypes.string,
  portionsCount: PropTypes.string,
}

OrderDetail.contextType = ReactReduxContext

OrderDetail.defaultProps = {
  orderId: '',
  deliveryDayId: '',
  orderState: '',
  paymentDate: '',
  recipes: Immutable.List([]),
  products: Immutable.List([]),
  priceBreakdown: Immutable.Map({}),
  deliveryDate: '',
  deliveryTimeStart: '',
  deliveryTimeEnd: '',
  whenCutoff: '',
  editDeliveryMode: false,
  cancellable: false,
  orderDeliveryDaysFetchError: '',
  recipesPeriodStockFetchError: '',
  deliveryDay: '',
  portionsCount: '2',
}

export default OrderDetail
