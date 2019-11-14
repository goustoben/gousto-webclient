import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import OrderCancelButton from './OrderCancelButton'

import css from './OrderDetail.css'
import OrderRecipes from './OrderRecipes'
import OrderProducts from './OrderProducts'
import OrderPricingDetail from './OrderPricingDetail'
import OrderDelivery from './OrderDelivery'

class OrderDetail extends React.PureComponent {

  static propTypes = {
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
  }

  static defaultProps = {
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
    deliveryDay: '',
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    const fetchSuccess = this.props.recipesPeriodStockFetchError === null && this.props.orderDeliveryDaysFetchError === null

    return (
      <div className={css.orderDetail}>
        {['menu open', 'recipes chosen', 'confirmed', 'dispatched'].indexOf(this.props.orderState) > -1 ?
          <section className={css.openCardSection}>
            <OrderRecipes
              recipes={this.props.recipes}
              orderId={this.props.orderId}
              orderState={this.props.orderState}
              whenCutoff={this.props.whenCutoff}
            />
          </section>
          : null}
        {this.props.orderState === 'recipes chosen' ?
          <section className={css.openCardSection}>
            <OrderProducts
              orderId={this.props.orderId}
              products={this.props.products}
            />
          </section>
          : null}
        {['recipes chosen', 'confirmed', 'dispatched'].indexOf(this.props.orderState) > -1 ?
          <section className={css.openCardSection}>
            <OrderPricingDetail
              paymentDate={this.props.paymentDate}
              numberOfRecipes={this.props.recipes.size}
              priceBreakdown={this.props.priceBreakdown}
            />
          </section>
          : null}
        {['menu open', 'recipes chosen', 'confirmed', 'dispatched'].indexOf(this.props.orderState) > -1 ?
          <section className={css.openCardSection}>
            <OrderDelivery
              date={this.props.deliveryDate}
              timeStart={this.props.deliveryTimeStart}
              timeEnd={this.props.deliveryTimeEnd}
              orderState={this.props.orderState}
              orderId={this.props.orderId}
              editDeliveryMode={this.props.editDeliveryMode}
              orderDeliveryDaysFetchError={this.props.orderDeliveryDaysFetchError}
              recipesPeriodStockFetchError={this.props.recipesPeriodStockFetchError}
              fetchSuccess={fetchSuccess}
            />
          </section>
          : null}
        {this.props.cancellable && this.props.orderState !== 'cancelled' ?
          <section className={this.props.editDeliveryMode && fetchSuccess ? css.openCardSectionNoBorder : css.openCardSection}>
            <OrderCancelButton
              orderId={this.props.orderId}
              deliveryDayId={this.props.deliveryDayId}
              orderState={this.props.orderState}
              deliveryDay={this.props.deliveryDay}
            />
          </section>
          : null}
      </div>
    )
  }
}

export default OrderDetail
