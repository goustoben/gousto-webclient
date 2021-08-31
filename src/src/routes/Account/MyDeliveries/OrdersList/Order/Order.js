import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'

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
  componentDidMount() {
    const { orderId, userOpenCloseOrderCard, userToggleEditDateSection } = this.props

    userOpenCloseOrderCard(orderId, true)
    userToggleEditDateSection(orderId, false)
  }

  open = () => {
    const { orderId, userOpenCloseOrderCard } = this.props

    userOpenCloseOrderCard(orderId, false)
  }

  close = () => {
    const { orderId, userOpenCloseOrderCard } = this.props

    userOpenCloseOrderCard(orderId, true)
  }

  render() {
    const {
      collapsed, orderId, userId, deliveryDayId, orderState, restorable, recipes, products,
      humanDeliveryDay, originalDeliveryDay, orderDeliveryTimeStart, orderDeliveryTimeEnd, deliveryDayRescheduledReason,
      orderShouldCutoffAt, orderWhenMenuOpen, priceBreakdown, editDeliveryMode, portionsCount, isProjected,
      cancellable, deliveryDay, shippingAddressId, addresses, orderDeliveryDaysFetchError, recipesPeriodStockFetchError,
      phase, isNewSubscriptionApiEnabled,
    } = this.props
    const isOrderInteractive = orderState !== 'cancelled' && phase !== 'pre_menu'

    let onClickFunction = () => { }
    if (isOrderInteractive) {
      onClickFunction = collapsed ? this.open : this.close
    }
    const humanDeliveryTimeStart = humanTimeFormat(orderDeliveryTimeStart, 'hour')
    const humanDeliveryTimeEnd = humanTimeFormat(orderDeliveryTimeEnd, 'hour')

    return (
      <div className={css.orderWrap} id={`order-${orderId}`} data-testing={isProjected ? 'projectedDelivery' : 'pendingOrder'}>
        <div className={css.order}>
          <span
            onClick={onClickFunction}
            data-testing={orderState === 'recipes chosen' ? 'recipesChosenCard' : ''}
            className={classNames(css.orderRow, { [css.link]: isOrderInteractive })}
          >
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
                  ) : null}
                  <OrderDate
                    date={humanDeliveryDay}
                  />
                  {
                    isNewSubscriptionApiEnabled && isProjected ? null : (
                      <OrderTime
                        start={humanDeliveryTimeStart}
                        end={humanDeliveryTimeEnd}
                      />
                    )
                  }
                  <OrderState
                    orderState={orderState}
                  />
                  {restorable ? (
                    <OrderRestoreButton
                      userId={userId}
                      orderId={orderId}
                      deliveryDayId={deliveryDayId}
                      deliveryDay={deliveryDay}
                    />
                  ) : (
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
                    ) : null}
                  </div>
                </div>
              </div>

              {isOrderInteractive ? (
                <div className={css.orderColRight}>
                  <OrderPricing
                    pricing={priceBreakdown}
                    orderState={orderState}
                  />
                  <div className={css.bottom}>
                    <OrderCollapseExpand
                      collapsed={collapsed}
                      onClick={onClickFunction}
                    />
                  </div>
                </div>
              ) : null}
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
          )
            : null}
        </div>
      </div>
    )
  }
}

Order.propTypes = {
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
  isProjected: PropTypes.bool,
  shippingAddressId: PropTypes.string,
  addresses: PropTypes.instanceOf(Immutable.Map),
  orderDeliveryDaysFetchError: PropTypes.string,
  recipesPeriodStockFetchError: PropTypes.string,
  deliveryDay: PropTypes.string,
  portionsCount: PropTypes.string,
  userOpenCloseOrderCard: PropTypes.func.isRequired,
  userToggleEditDateSection: PropTypes.func.isRequired,
  phase: PropTypes.string,
  isNewSubscriptionApiEnabled: PropTypes.bool,
}

Order.defaultProps = {
  userId: '',
  humanDeliveryDay: '',
  originalDeliveryDay: null,
  deliveryDayRescheduledReason: null,
  orderDeliveryTimeEnd: '',
  orderDeliveryTimeStart: '',
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
  isProjected: false,
  collapsed: true,
  shippingAddressId: '',
  addresses: Immutable.Map({}),
  orderDeliveryDaysFetchError: null,
  recipesPeriodStockFetchError: null,
  deliveryDay: '',
  portionsCount: '2',
  phase: '',
  isNewSubscriptionApiEnabled: true,
}

export default Order
