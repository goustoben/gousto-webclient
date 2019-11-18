import PropTypes from 'prop-types'
import React from 'react'

import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'

import css from './OrderCancelButton.css'

class OrderCancelButton extends React.PureComponent {

  static propTypes = {
    orderId: PropTypes.string,
    deliveryDayId: PropTypes.string,
    osrOrderId: PropTypes.string,
    osrDeliveryDayId: PropTypes.string,
    orderState: PropTypes.string,
    didCancelProjectedError: PropTypes.bool,
    orderCancelStart: PropTypes.func,
    deliveryDay: PropTypes.string,
    contentPending: PropTypes.bool
  }

  static defaultProps = {
    orderId: '',
    deliveryDayId: '',
    osrOrderId: '',
    osrDeliveryDayId: '',
    orderState: '',
    didCancelProjectedError: false,
    orderCancelStart: () => { },
    deliveryDay: '',
    contentPending: false,
  }

  handleCancelBox = () => {
    const {
      orderState,
      orderId,
      deliveryDayId,
      orderCancelStart,
      deliveryDay
    } = this.props
    if (orderState !== 'scheduled') {
      orderCancelStart(orderId, deliveryDayId, deliveryDay, "pending")
    } else {
      orderCancelStart(null, deliveryDayId, deliveryDay, "projected")
    }
  }

  render() {
    const { contentPending, didCancelProjectedError, deliveryDayId, orderId, osrDeliveryDayId, osrOrderId } = this.props

    let pending = false
    if(contentPending && deliveryDayId === osrDeliveryDayId) pending = true
    if(contentPending && orderId === osrOrderId) pending = true

    return (
      <div className={css.button}>
        {didCancelProjectedError ?
          <Alert type="danger">
            <Content contentKeys="mydeliveriesOrderOrdercancelbuttonCancelprojectederror">
              <span>Whoops, there was a problem cancelling this order, please try again.</span>
            </Content>
          </Alert>
          : null}
        <Button color='negative' onClick={this.handleCancelBox} className={css.cancelButton} pending={pending}>
          Cancel delivery
        </Button>
      </div>
    )
  }
}

export default OrderCancelButton
