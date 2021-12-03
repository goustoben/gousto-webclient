import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import css from './CancelOrderModalContent.module.css'

const propTypes = {
  orderId: PropTypes.string,
  didCancelOrderError: PropTypes.bool,
  close: PropTypes.func,
  orderCancel: PropTypes.func,
  cancelOrderModalToggleVisibility: PropTypes.func,
}

const defaultProps = {
  orderId: '',
  didCancelOrderError: false,
  close: () => {},
  orderCancel: () => {},
  cancelOrderModalToggleVisibility: () => {},
}

export class CancelOrderModalContent extends React.PureComponent {
  handleCancelBox = () => {
    const { orderCancel, cancelOrderModalToggleVisibility, orderId } = this.props
    orderCancel(orderId)
      .then(() => cancelOrderModalToggleVisibility(false, orderId))
  }

  render() {
    const { close, didCancelOrderError } = this.props

    return (
      <div className={css.body}>
        <h2 className={css.modalTitle}>Cancel this box?</h2>
        <div className={css.modalBodyText}>
          Just double-checking – if you click yes, we can’t restore this delivery. Please confirm your choice:
        </div>
        {didCancelOrderError ? (
          <Alert type="danger">
            Whoops, there was a problem cancelling this order, please try again.
          </Alert>
        ) : null}
        <div className={css.bottom}>
          <Button onClick={close} color="negative" className={css.firstButton} noDecoration>
            Go Back
          </Button>
          <Button color="primary" noDecoration onClick={() => this.handleCancelBox()}>
            Cancel Box
          </Button>
        </div>
      </div>
    )
  }
}

CancelOrderModalContent.propTypes = propTypes
CancelOrderModalContent.defaultProps = defaultProps
