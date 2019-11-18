import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import actions from 'actions/order'
import Content from 'containers/Content'
import css from './OrderRestoreButton.css'

class OrderRestoreButton extends React.PureComponent {

  static propTypes = {
    userId: PropTypes.string,
    orderId: PropTypes.string,
    deliveryDayId: PropTypes.string,
    osrOrderId: PropTypes.string,
    projectedOrderRestoreError: PropTypes.string,
    pending: PropTypes.bool,
  }

  static defaultProps = {
    userId: '',
    orderId: '',
    deliveryDayId: '',
    osrOrderId: '',
    projectedOrderRestoreError: null,
    pending: false
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  handleRestoreBox = () => {
    this.context.store.dispatch(actions.projectedOrderRestore(this.props.orderId, this.props.userId, this.props.deliveryDayId))
  }

  render() {
    const { pending, projectedOrderRestoreError, orderId, osrOrderId } = this.props
    const isCurrentOrder = orderId === osrOrderId

    return (
      <div>
        {projectedOrderRestoreError ?
          <Alert type="danger">
            <Content contentKeys="mydeliveriesOrderOrderrestorebuttonRestoreprojectederror">
              <span>Whoops, there was a problem restoring this order, please try again.</span>
            </Content>
          </Alert>
          : null}
        <div className={css.button}>
          <Button onClick={() => this.handleRestoreBox()} pending={pending && isCurrentOrder}>
            Restore delivery
          </Button>
        </div>
      </div>
    )
  }
}

export default OrderRestoreButton
