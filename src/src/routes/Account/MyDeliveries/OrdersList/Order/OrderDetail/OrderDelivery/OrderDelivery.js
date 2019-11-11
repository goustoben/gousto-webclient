import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import recipesActions from 'actions/recipes'
import orderActions from 'actions/order'
import userActions from 'actions/user'
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
    shippingAddressObj: PropTypes.instanceOf(Immutable.Map),
    editDeliveryMode: PropTypes.bool,
    orderState: PropTypes.string,
    orderId: PropTypes.string,
    fetchSuccess: PropTypes.bool,
    recipesPeriodStockFetchError: PropTypes.object,
    orderDeliveryDaysFetchError: PropTypes.object,
  }

  static defaultProps = {
    date: '',
    timeStart: '',
    timeEnd: '',
    shippingAddressObj: Immutable.Map({
      line1: '',
      line2: '',
      line3: '',
      town: '',
      postcode: '',
      name: '',
    }),
    editDeliveryMode: false,
    orderState: '',
    orderId: '',
    fetchSuccess: false,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  onClickFunction = () => {
    const { availableFrom, availableTo, shippingAddressId, orderId, editDeliveryMode } = this.props
    // Promise.all([
    //   this.context.store.dispatch(orderActions.orderGetDeliveryDays(availableFrom, availableTo, shippingAddressId, orderId)),
    //   this.context.store.dispatch(recipesActions.recipesLoadStockByDate(availableFrom, availableTo)),
    // ])
    // .then()
    this.context.store.dispatch(userActions.userOpenCloseEditSection(orderId, !editDeliveryMode))
  }

  static constructShippingAddress(shippingAddressObj) {
    let shippingAddress = shippingAddressObj.get('line1')
    const line2 = shippingAddressObj.get('line2')
    const line3 = shippingAddressObj.get('line3')
    const town = shippingAddressObj.get('town')
    shippingAddress += line2 ? `, ${line2}` : ''
    shippingAddress += line3 ? `, ${line3}` : ''
    shippingAddress += town ? `, ${town}` : ''
    shippingAddress += ` ${shippingAddressObj.get('postcode')}`

    return shippingAddress
  }

  componentDidMount() {
    const { availableFrom, availableTo, shippingAddressId, orderId } = this.props
    const { store } = this.context

    store.dispatch(orderActions.orderGetDeliveryDays(availableFrom, availableTo, shippingAddressId, orderId))
    store.dispatch(recipesActions.recipesLoadStockByDate(availableFrom, availableTo))
    //if error show error
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
      availableTo
    } = this.props
    const editDateHasError = (recipesPeriodStockFetchError != null || orderDeliveryDaysFetchError != null)

    return (
      <div data-testing="recipesDeliverySection">
        <div className={`${css.header} ${css.bold}`}>
          Delivery details
        </div>
        <div className={css.deliveryDetailsWrapper}>
          <div className={css.subSection}>
            <OrderDeliveryDate
              editDeliveryMode={editDeliveryMode}
              date={date}
              timeStart={timeStart}
              timeEnd={timeEnd}
              orderState={orderState}
              hasError={editDateHasError}
              onClickFunction={this.onClickFunction}
              fetchSuccess={fetchSuccess}
              orderId={orderId}
              availableFrom={availableFrom}
              availableTo={availableTo}
            />
          </div>

          <div className={css.subSection}>
            <div className={`${css.capitalize} ${css.bold}`}>
              {this.props.shippingAddressObj.get('name')}
            </div>
            <div>
              {OrderDelivery.constructShippingAddress(this.props.shippingAddressObj)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderDelivery
