import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import actions from 'actions/order'
import Content from 'containers/Content'
import css from './OrderRestoreButton.css'

class OrderRestoreButton extends React.PureComponent {
  handleRestoreBox = () => {
    const { store } = this.context
    const { orderId, userId, deliveryDayId } = this.props
    store.dispatch(actions.projectedOrderRestore(orderId, userId, deliveryDayId))
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
  osrOrderId: PropTypes.string,
  projectedOrderRestoreError: PropTypes.string,
  pending: PropTypes.bool,
}

OrderRestoreButton.defaultProps = {
  userId: '',
  orderId: '',
  deliveryDayId: '',
  osrOrderId: '',
  projectedOrderRestoreError: null,
  pending: false
}

OrderRestoreButton.contextTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default OrderRestoreButton
