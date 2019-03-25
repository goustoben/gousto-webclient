import React, { Component } from 'react'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { getHeaderDetails } from './helper'

class OrderConfirmation extends Component {

  render() {
    const { order, showHeader } = this.props
    const headerDetails = order && getHeaderDetails(order)

    return (
      <div>
        {showHeader && <OrderConfirmationHeader
          {...headerDetails}
        />}
      </div>
    )
  }
}

export default OrderConfirmation
