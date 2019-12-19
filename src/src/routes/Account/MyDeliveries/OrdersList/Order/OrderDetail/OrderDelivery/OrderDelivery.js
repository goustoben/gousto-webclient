import PropTypes from 'prop-types'
import React from 'react'
import recipesActions from 'actions/recipes'
import orderActions from 'actions/order'
import userActions from 'actions/user'
import Loading from 'Loading'
import { OrderDeliveryAddress } from './OrderDeliveryAddress'
import { OrderDeliveryDate } from './OrderDeliveryDate'

import css from './OrderDelivery.css'

class OrderDelivery extends React.PureComponent {
  static propTypes = {
    availableFrom: PropTypes.string,
    availableTo: PropTypes.string,
    shippingAddressId: PropTypes.string,
    date: PropTypes.string,
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    editDeliveryMode: PropTypes.bool,
    orderState: PropTypes.string,
    orderId: PropTypes.string,
    fetchSuccess: PropTypes.bool,
    recipesPeriodStockFetchError: PropTypes.object,
    orderDeliveryDaysFetchError: PropTypes.object,
    hasUpdateDeliveryDayError: PropTypes.bool,
    clearUpdateDateErrorAndPending: PropTypes.func,
    addressLoading: PropTypes.bool,
  }

  static defaultProps = {
    date: '',
    timeStart: '',
    timeEnd: '',
    editDeliveryMode: false,
    orderState: '',
    orderId: '',
    fetchSuccess: false
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  onClickFunction = () => {
    const {
      orderId,
      editDeliveryMode,
      clearUpdateDateErrorAndPending
    } = this.props

    if (!editDeliveryMode) {
      this.context.store.dispatch(
        userActions.userTrackToggleEditDateSection(orderId)
      )
    }
    this.context.store.dispatch(
      userActions.userToggleEditDateSection(orderId, !editDeliveryMode)
    )
    clearUpdateDateErrorAndPending()
  }

  componentDidMount() {
    const {
      availableFrom,
      availableTo,
      shippingAddressId,
      orderId,
      orderState,
    } = this.props
    const { store } = this.context

    const isOrderPending = orderState == 'menu open' || orderState == 'recipes chosen'

    if (isOrderPending) {
      store.dispatch(
        orderActions.orderGetDeliveryDays(
          availableFrom,
          availableTo,
          shippingAddressId,
          orderId
        )
      ),
      store.dispatch(
        recipesActions.recipesLoadStockByDate(availableFrom, availableTo)
      )
    }
  }

  render() {
    const {
      recipesPeriodStockFetchError,
      orderDeliveryDaysFetchError,
      editDeliveryMode,
      date,
      timeStart,
      timeEnd,
      orderState,
      fetchSuccess,
      orderId,
      availableFrom,
      availableTo,
      hasUpdateDeliveryDayError,
      shippingAddressId,
      addressLoading
    } = this.props
    const editDateHasError =
      recipesPeriodStockFetchError != null ||
      orderDeliveryDaysFetchError != null
    const errorText = hasUpdateDeliveryDayError
      ? 'There was a problem updating your order date. Please try again later.'
      : 'Whoops, something went wrong - please try again'

    return (
      <div data-testing="recipesDeliverySection">
        <div className={`${css.header} ${css.bold}`}>Delivery details</div>
        {addressLoading ?
          <div className={css.spinnerContainer}>
            <Loading className={css.spinner}/>
          </div>
          :
          <div className={css.deliveryDetailsWrapper}>
            <div className={css.subSection}>
              <OrderDeliveryDate
                editDeliveryMode={editDeliveryMode}
                date={date}
                timeStart={timeStart}
                timeEnd={timeEnd}
                orderState={orderState}
                hasError={hasUpdateDeliveryDayError || editDateHasError}
                errorText={errorText}
                onClickFunction={this.onClickFunction}
                fetchSuccess={fetchSuccess}
                orderId={orderId}
                availableFrom={availableFrom}
                availableTo={availableTo}
              />
            </div>
            <div className={css.subSection}>
              <OrderDeliveryAddress
                orderId={orderId}
                orderState={orderState}
                shippingAddressId={shippingAddressId}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default OrderDelivery
