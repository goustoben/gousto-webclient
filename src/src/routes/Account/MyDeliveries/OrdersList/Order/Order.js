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
    orderDateTime: PropTypes.string,
    deliveryDayRescheduled: PropTypes.string,
    deliveryDayRescheduledReason: PropTypes.string,
    orderDeliveryTimeEnd: PropTypes.string,
    orderDeliveryTimeStart: PropTypes.string,
    orderWhenCommitted: PropTypes.string,
    orderId: PropTypes.string,
    deliveryDayId: PropTypes.string,
    orderState: PropTypes.string,
    orderWhenCutoff: PropTypes.string,
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
  }

  static defaultProps = {
    userId: '',
    orderDateTime: '',
    deliveryDayRescheduled: null,
    deliveryDayRescheduledReason: null,
    orderDeliveryTimeEnd: '',
    orderDeliveryTimeStart: '',
    orderWhenCommitted: '',
    orderId: '',
    deliveryDayId: '',
    orderState: '',
    orderWhenCutoff: '',
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
    deliveryDay: ''
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  open = () => {
    this.context.store.dispatch(actions.userOpenCloseOrderCard(this.props.orderId, false))
  }

  close = () => {
    this.context.store.dispatch(actions.userOpenCloseOrderCard(this.props.orderId, true))
  }

  componentDidMount() {
    this.context.store.dispatch(actions.userOpenCloseOrderCard(this.props.orderId, true))
    this.context.store.dispatch(actions.userToggleEditDateSection(this.props.orderId, false))
  }

  render() {
    let onClickFunction = () => { }
    if (this.props.orderState !== 'cancelled') {
      onClickFunction = this.props.collapsed ? this.open : this.close
    }
    let humanDeliveryDate = humanTimeFormat(this.props.orderDateTime, 'day')
    let humanOldDeliveryDate = null
    if (this.props.deliveryDayRescheduled !== null) {
      humanOldDeliveryDate = humanDeliveryDate
      humanDeliveryDate = humanTimeFormat(this.props.deliveryDayRescheduled, 'day')
    }
    const humanDeliveryTimeStart = humanTimeFormat(this.props.orderDeliveryTimeStart, 'hour')
    const humanDeliveryTimeEnd = humanTimeFormat(this.props.orderDeliveryTimeEnd, 'hour')

    return (
      <div className={css.orderWrap} id={`order-${this.props.orderId}`}>
        <div className={css.order}>
          <span onClick={onClickFunction} data-testing={this.props.orderState === 'recipes chosen' ? 'recipesChosenCard' : ''} className={classNames(css.orderRow, { [css.link]: this.props.orderState !== 'cancelled' })}>
            <div>
              <OrderCollage
                recipes={this.props.recipes}
                orderState={this.props.orderState}
              />
            </div>
            <div className={css.orderMain}>
              <div className={css.orderColLeft}>
                <div className={css.orderSummaryContainer}>
                  {humanOldDeliveryDate !== null ?
                    <OrderRescheduledNotification
                      oldDeliveryDay={humanOldDeliveryDate}
                      reason={this.props.deliveryDayRescheduledReason}
                    />
                    : null}
                  <OrderDate
                    date={humanDeliveryDate}
                  />
                  <OrderTime
                    start={humanDeliveryTimeStart}
                    end={humanDeliveryTimeEnd}
                  />
                  <OrderState
                    orderState={this.props.orderState}
                  />
                  {this.props.restorable ?
                    <OrderRestoreButton
                      userId={this.props.userId}
                      orderId={this.props.orderId}
                      deliveryDayId={this.props.deliveryDayId}
                    />
                    :
                    <OrderStatus
                      orderState={this.props.orderState}
                      whenCutoff={humanTimeFormat(this.props.orderWhenCutoff, 'timeLeft')}
                      whenMenuOpen={humanTimeFormat(this.props.orderWhenMenuOpen, 'hourAndDay')}
                    />
                  }
                  <div>
                    {this.props.recipes.size > 0 && ['cancelled', 'scheduled'].indexOf(this.props.orderState) < 0 ?
                      <OrderItemSummary
                        recipes={this.props.recipes}
                        numberOfProducts={this.props.products.get('total')}
                      />
                      : null}
                  </div>
                </div>
              </div>

              {this.props.orderState !== 'cancelled' ?
                <div className={css.orderColRight}>
                  <OrderPricing
                    pricing={this.props.priceBreakdown}
                    orderState={this.props.orderState}
                  />
                  <div className={css.bottom}>
                    <OrderCollapseExpand
                      collapsed={this.props.collapsed}
                      open={this.open}
                      close={this.close}
                    />
                  </div>
                </div>
                : null}
            </div>
          </span>
          {!this.props.collapsed ?
            <div className={classNames(css.orderRow, css.orderDetail)}>
              <OrderDetail
                open={!this.props.collapsed}
                orderId={this.props.orderId}
                deliveryDayId={this.props.deliveryDayId}
                orderState={this.props.orderState}
                close={this.close}
                paymentDate={humanTimeFormat(this.props.orderWhenCutoff, 'dayAndMonth')}
                recipes={this.props.recipes}
                products={this.props.products.get('elements')}
                priceBreakdown={this.props.priceBreakdown}
                deliveryDate={humanDeliveryDate}
                deliveryTimeStart={humanDeliveryTimeStart}
                deliveryTimeEnd={humanDeliveryTimeEnd}
                editDeliveryMode={this.props.editDeliveryMode}
                whenCutoff={humanTimeFormat(this.props.orderWhenCutoff, 'dayAndMonth')}
                cancellable={this.props.cancellable}
                restorable={this.props.restorable}
                shippingAddressId={this.props.shippingAddressId}
                addresses={this.props.addresses}
                orderDeliveryDaysFetchError={this.props.orderDeliveryDaysFetchError}
                recipesPeriodStockFetchError={this.props.recipesPeriodStockFetchError}
                deliveryDay={this.props.deliveryDay}
              />
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default Order
