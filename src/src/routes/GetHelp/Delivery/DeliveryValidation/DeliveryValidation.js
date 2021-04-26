import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { LoadingWrapper } from '../../LoadingWrapper'
import { DeliveryCompensation } from '../DontKnowWhen/DeliveryCompensation'
import { DeliveryPreContact } from '../DidntArrive/DeliveryPreContact'

class DeliveryValidation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isValidationCheckDone: false,
    }
  }

  componentDidMount() {
    const {
      validateDeliveryAction,
      params: { userId, orderId },
    } = this.props

    validateDeliveryAction(userId, orderId)
  }

  componentDidUpdate(prevProps) {
    const { isDeliveryValidationPending } = this.props

    if (prevProps.isDeliveryValidationPending === true
      && isDeliveryValidationPending === false) {
      this.setState({ isValidationCheckDone: true })
    }
  }

  render() {
    const {
      compensationAmount,
      hasPassedDeliveryValidation,
      params: { userId, orderId },
      trackClickGetInTouchInSSRDeliveries,
    } = this.props
    const backUrl = client.getHelp.delivery({ orderId, userId })

    const { isValidationCheckDone } = this.state

    if (isValidationCheckDone === false) {
      return <LoadingWrapper />
    }

    if (hasPassedDeliveryValidation) {
      return (
        <DeliveryCompensation
          backUrl={backUrl}
          compensationAmount={compensationAmount}
          orderId={orderId}
          trackClickGetInTouchInSSRDeliveries={trackClickGetInTouchInSSRDeliveries}
          userId={userId}
        />
      )
    }

    return (
      <DeliveryPreContact
        backUrl={backUrl}
        trackClickGetInTouchInSSRDeliveries={trackClickGetInTouchInSSRDeliveries}
      />
    )
  }
}

DeliveryValidation.propTypes = {
  compensationAmount: PropTypes.number,
  hasPassedDeliveryValidation: PropTypes.bool.isRequired,
  isDeliveryValidationPending: PropTypes.bool,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  trackClickGetInTouchInSSRDeliveries: PropTypes.func.isRequired,
  validateDeliveryAction: PropTypes.func.isRequired,
}

DeliveryValidation.defaultProps = {
  compensationAmount: null,
  isDeliveryValidationPending: false,
}

export { DeliveryValidation }
