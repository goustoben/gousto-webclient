import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    } = this.props

    const { isValidationCheckDone } = this.state

    if (isValidationCheckDone === false) {
      return <LoadingWrapper />
    }

    if (hasPassedDeliveryValidation) {
      return (
        <DeliveryCompensation
          userId={userId}
          orderId={orderId}
          compensationAmount={compensationAmount}
        />
      )
    }

    return <DeliveryPreContact />
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
  validateDeliveryAction: PropTypes.func.isRequired,
}

DeliveryValidation.defaultProps = {
  compensationAmount: null,
  isDeliveryValidationPending: false,
}

export { DeliveryValidation }
