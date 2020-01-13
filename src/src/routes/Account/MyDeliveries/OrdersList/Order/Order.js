import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'

import actions from 'actions/user'
import humanTimeFormat from 'utils/timeFormat'

import ImmutablePropTypes from 'react-immutable-proptypes'
import OrderCollage from './OrderCollage'
import OrderDate from './OrderDate'
import OrderTime from './OrderTime'
import OrderState from './OrderState'
import OrderStatus from './OrderStatus'
import OrderPricing from './OrderPricing'
import OrderCollapseExpand from './OrderCollapseExpand'
import OrderDetail from './OrderDetail'
import OrderItemSummary from './OrderItemSummary'
import OrderRestoreButton from './OrderRestoreButton'
import OrderRescheduledNotification from './OrderRescheduledNotification'

import css from './Order.css'

class Order extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string,
    collapsed: PropTypes.bool,
    humanDeliveryDay: PropTypes.string,
    originalDeliveryDay: PropTypes.string,
    deliveryDayRescheduledReason: PropTypes.string,
    orderDeliveryTimeEnd: PropTypes.string,
    orderDeliveryTimeStart: PropTypes.string,
    orderId: PropTypes.string,
    deliveryDayId: PropTypes.string,
    orderState: PropTypes.string,
    orderShouldCutoffAt: PropTypes.string,
    orderWhenMenuOpen: PropTypes.string,
    products: ImmutablePropTypes.mapContains({
      total: PropTypes.number,
      elements: PropTypes.instanceOf(Immutable.List),
    }),
    recipes: PropTypes.instanceOf(Immutable.List),
    priceBreakdown: PropTypes.instanceOf(Immutable.Map),
    editDeliveryMode: PropTypes.bool,
    cancellable: PropTypes.bool,
    restorable: PropTypes.bool,
    shippingAddressId: PropTypes.string,
    addresses: PropTypes.instanceOf(Immutable.Map),
    orderDeliveryDaysFetchError: PropTypes.string,
    recipesPeriodStockFetchError: PropTypes.string,
    deliveryDay: PropTypes.string,
    portionsCount: PropTypes.string,
  }

  static defaultProps = {
    userId: '',
    humanDeliveryDay: '',
    originalDeliveryDay: null,
    deliveryDayRescheduledReason: null,
    orderDeliveryTimeEnd: '',
    orderDeliveryTimeStart: '',
    orderWhenCommitted: '',
    orderId: '',
    deliveryDayId: '',
    orderState: '',
    orderShouldCutoffAt: '',
    orderWhenMenuOpen: '',
    products: Immutable.Map({
      total: 0,
      elements: Immutable.List([]),
    }),
    recipes: Immutable.List([]),
    priceBreakdown: Immutable.Map({}),
    editDeliveryMode: false,
    cancellable: false,
    restorable: false,
    shippingAddressId: '',
    addresses: Immutable.Map({}),
    orderDeliveryDaysFetchError: null,
    recipesPeriodStockFetchError: null,
    deliveryDay: '',
    portionsCount: '2',
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  open = () => {
    const { orderId } = this.props
    const { store } = this.context

    store.dispatch(actions.userOpenCloseOrderCard(orderId, false))
  }

  close = () => {
    const { orderId } = this.props
    const { store } = this.context

    store.dispatch(actions.userOpenCloseOrderCard(orderId, true))
  }

  componentDidMount() {
    const { orderId } = this.props
    const { store } = this.context

    store.dispatch(actions.userOpenCloseOrderCard(orderId, true))
    store.dispatch(actions.userToggleEditDateSection(orderId, false))
  }

  render() {
    const {
      collapsed, orderId, userId, deliveryDayId, orderState, restorable, recipes, products,
      humanDeliveryDay, originalDeliveryDay, orderDeliveryTimeStart, orderDeliveryTimeEnd, deliveryDayRescheduledReason,
      orderShouldCutoffAt, orderWhenMenuOpen, priceBreakdown, editDeliveryMode, portionsCount,
      cancellable, deliveryDay, shippingAddressId, addresses, orderDeliveryDaysFetchError, recipesPeriodStockFetchError,
    } = this.props

    let onClickFunction = () => { }
    if (orderState !== 'cancelled') {
      onClickFunction = collapsed ? this.open : this.close
    }
    const humanDeliveryTimeStart = humanTimeFormat(orderDeliveryTimeStart, 'hour')
    const humanDeliveryTimeEnd = humanTimeFormat(orderDeliveryTimeEnd, 'hour')

    return (
      <div className={css.orderWrap} id={`order-${orderId}`}>
        <div className={css.order}>
          <span onClick={onClickFunction} data-testing={orderState === 'recipes chosen' ? 'recipesChosenCard' : ''} className={classNames(css.orderRow, { [css.link]: orderState !== 'cancelled' })}>
            <div>
              <OrderCollage
                recipes={recipes}
                orderState={orderState}
              />
            </div>
            <div className={css.orderMain}>
              <div className={css.orderColLeft}>
                <div className={css.orderSummaryContainer}>
                  {originalDeliveryDay !== null ? (
<OrderRescheduledNotification
  oldDeliveryDay={originalDeliveryDay}
  reason={deliveryDayRescheduledReason}
/>
                  ): null}
                  <OrderDate
                    date={humanDeliveryDay}
                  />
                  <OrderTime
                    start={humanDeliveryTimeStart}
                    end={humanDeliveryTimeEnd}
                  />
                  <OrderState
                    orderState={orderState}
                  />
                  {restorable ? (
<OrderRestoreButton
  userId={userId}
  orderId={orderId}
  deliveryDayId={deliveryDayId}
/>
                  ): (
<OrderStatus
  orderState={orderState}
  whenCutoff={humanTimeFormat(orderShouldCutoffAt, 'timeLeft')}
  whenMenuOpen={humanTimeFormat(orderWhenMenuOpen, 'hourAndDay')}
/>
                  )}
                  <div>
                    {recipes.size > 0 && ['cancelled', 'scheduled'].indexOf(orderState) < 0 ? (
<OrderItemSummary
  recipes={recipes}
  numberOfProducts={products.get('total')}
/>
                    ): null}
                  </div>
                </div>
              </div>

              {orderState !== 'cancelled' ? (
<div className={css.orderColRight}>
                  <OrderPricing
                    pricing={priceBreakdown}
                    orderState={orderState}
                  />
                  <div className={css.bottom}>
                    <OrderCollapseExpand
                      collapsed={collapsed}
                      open={this.open}
                      close={this.close}
                    />
                  </div>
                </div>
              ): null}
            </div>
          </span>
          {!collapsed ? (
<div className={classNames(css.orderRow, css.orderDetail)}>
              <OrderDetail
                open={!collapsed}
                orderId={orderId}
                deliveryDayId={deliveryDayId}
                orderState={orderState}
                close={this.close}
                paymentDate={humanTimeFormat(orderShouldCutoffAt, 'dayAndMonth')}
                recipes={recipes}
                products={products.get('elements')}
                priceBreakdown={priceBreakdown}
                deliveryDate={humanDeliveryDay}
                deliveryTimeStart={humanDeliveryTimeStart}
                deliveryTimeEnd={humanDeliveryTimeEnd}
                editDeliveryMode={editDeliveryMode}
                whenCutoff={humanTimeFormat(orderShouldCutoffAt, 'dayAndMonth')}
                cancellable={cancellable}
                restorable={restorable}
                shippingAddressId={shippingAddressId}
                addresses={addresses}
                orderDeliveryDaysFetchError={orderDeliveryDaysFetchError}
                recipesPeriodStockFetchError={recipesPeriodStockFetchError}
                deliveryDay={deliveryDay}
                portionsCount={portionsCount}
              />
            </div>
          ):
            null
          }
        </div>
      </div>
    )
  }
}

export default Order
