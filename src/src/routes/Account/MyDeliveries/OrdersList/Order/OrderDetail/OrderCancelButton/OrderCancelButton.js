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
    close: PropTypes.func,
    didCancelProjectedError: PropTypes.bool,
    projectedOrderCancel: PropTypes.func,
    cancelOrderModalToggleVisibility: PropTypes.func,
    orderCancel: PropTypes.func,
  }

  static defaultProps = {
    orderId: '',
    deliveryDayId: '',
    orderState: '',
    close: () => {},
    didCancelProjectedError: false,
    projectedOrderCancel: () => {},
    cancelOrderModalToggleVisibility: () => {},
    orderCancel: () => {},
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  handleCancelBox = () => {
    const {
      orderState,
      orderId,
      deliveryDayId,
      close,
      projectedOrderCancel,
      cancelOrderModalToggleVisibility,
      orderCancel,
    } = this.props
    if (orderState === 'scheduled') {
      projectedOrderCancel(orderId, deliveryDayId)
    } else if (orderState === 'recipes chosen') {
      cancelOrderModalToggleVisibility(true, orderId)
    } else {
      orderCancel(orderId)
      close()
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
