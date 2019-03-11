import React, { Component } from 'react'

class OrderConfirmation extends Component {
  componentWillMount() {
    this.props.loadOrder(this.props.orderNumber)
  }

  render() {
    const { orderNumber } = this.props

    return (
      <div>Hello! {orderNumber}</div>
    )
  }
}

export default OrderConfirmation
