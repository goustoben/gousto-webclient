import PropTypes from 'prop-types'
import React from 'react'

import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'

import css from './OrderCancelButton.css'

class OrderCancelButton extends React.PureComponent {

  static propTypes = {
    orderId: PropTypes.string,
    deliveryDayId: PropTypes.string,
    orderState: PropTypes.string,
    didCancelProjectedError: PropTypes.bool,
    projectedOrderCancel: PropTypes.func,
    cancelOrderModalToggleVisibility: PropTypes.func,
    orderCancelStart: PropTypes.func,
    orderCancel: PropTypes.func,
    deliveryDay: PropTypes.string,
  }

  static defaultProps = {
    orderId: '',
    deliveryDayId: '',
    orderState: '',
    didCancelProjectedError: false,
    projectedOrderCancel: () => { },
    cancelOrderModalToggleVisibility: () => { },
    orderCancelStart: () => { },
    orderCancel: () => { },
    deliveryDay: ''
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
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
    return (
      <div className={css.button}>
        {this.props.didCancelProjectedError ?
          <Alert type="danger">
            <Content contentKeys="mydeliveriesOrderOrdercancelbuttonCancelprojectederror">
              <span>Whoops, there was a problem cancelling this order, please try again.</span>
            </Content>
          </Alert>
          : null}
        <Button color={'negative'} onClick={this.handleCancelBox}>
          Cancel delivery
        </Button>
      </div>
    )
  }
}

export default OrderCancelButton
