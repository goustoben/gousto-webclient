import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'
import css from './OrderRestoreButton.module.css'

class OrderRestoreButton extends React.PureComponent {
  handleRestoreBox = () => {
    const { orderId, userId, deliveryDayId, deliveryDay, projectedOrderRestore } = this.props
    projectedOrderRestore(orderId, userId, deliveryDayId, deliveryDay)
  }

  render() {
    const { pending, projectedOrderRestoreError, orderId, osrOrderId } = this.props
    const isCurrentOrder = orderId === osrOrderId

    return (
      <div>
        {projectedOrderRestoreError ? (
          <Alert type="danger">
            <Content contentKeys="mydeliveriesOrderOrderrestorebuttonRestoreprojectederror">
              <span>Whoops, there was a problem restoring this order, please try again.</span>
            </Content>
          </Alert>
        ) : null}
        <div className={css.button}>
          <Button onClick={() => this.handleRestoreBox()} pending={pending && isCurrentOrder} data-testing="restoreButton">
            Restore delivery
          </Button>
        </div>
      </div>
    )
  }
}

OrderRestoreButton.propTypes = {
  userId: PropTypes.string,
  orderId: PropTypes.string,
  deliveryDayId: PropTypes.string,
  deliveryDay: PropTypes.string,
  osrOrderId: PropTypes.string,
  projectedOrderRestore: PropTypes.func.isRequired,
  projectedOrderRestoreError: PropTypes.string,
  pending: PropTypes.bool,
}

OrderRestoreButton.defaultProps = {
  userId: '',
  orderId: '',
  deliveryDayId: '',
  deliveryDay: '',
  osrOrderId: '',
  projectedOrderRestoreError: null,
  pending: false
}

export default OrderRestoreButton
