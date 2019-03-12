import React, { Component } from 'react'
import moment from 'moment'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'

class OrderConfirmation extends Component {
  componentWillMount() {
    this.props.loadOrder(this.props.orderNumber)
  }

  render() {
    const { order } = this.props
    if (order) {
      const { humanDeliveryDate, whenCutoff } = order
      const { deliveryStart, deliveryEnd } = order.deliverySlot
      const cutOffTimeFormat = moment(whenCutoff).add(1, 'seconds').format('HH')
      const cutoffDayFormat = moment(whenCutoff).format('dddd Do MMMM')
      
      return (
        <div>
          <OrderConfirmationHeader deliveryDate={humanDeliveryDate} deliveryStart={deliveryStart} deliveryEnd={deliveryEnd} whenCutoffTime={cutOffTimeFormat} whenCutoffDate={cutoffDayFormat} />
        </div>
      )
    }
    
    return (<div></div>)
    
  }
}

export default OrderConfirmation
