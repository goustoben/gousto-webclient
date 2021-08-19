import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loading from 'Loading'
import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { replaceWithValues } from 'utils/text'
import { GetHelpLayout } from '../layouts/GetHelpLayout'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { BottomButton } from '../components/BottomButton'

import css from './Refund.css'

const propTypes = {
  compensation: PropTypes.shape({
    amount: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    infoBody: PropTypes.string.isRequired,
    confirmationBody: PropTypes.string.isRequired,
    errorBody: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
  }).isRequired,
  createComplaint: PropTypes.func.isRequired,
  isAnyError: PropTypes.bool.isRequired,
  isAnyPending: PropTypes.bool.isRequired,
  loadRefundAmount: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  trackRejectRefund: PropTypes.func.isRequired,
}

class Refund extends PureComponent {
  componentDidMount() {
    const { loadRefundAmount } = this.props
    loadRefundAmount()
  }

  render() {
    const {
      compensation,
      content,
      createComplaint,
      isAnyError,
      isAnyPending,
      trackRejectRefund,
    } = this.props

    const infoBodyWithAmount = replaceWithValues(
      content.infoBody, {
        refundAmount: compensation.amount ? compensation.amount.toFixed(2) : ''
      }
    )
    const button2WithAmount = replaceWithValues(
      content.button2, {
        refundAmount: compensation.amount ? compensation.amount.toFixed(2) : ''
      }
    )
    const getHelpLayoutbody = (isAnyPending || isAnyError)
      ? ''
      : infoBodyWithAmount
    const confirmationContent = (isAnyError)
      ? content.errorBody
      : content.confirmationBody
    const acceptButton = (isAnyError)
      ? null
      : (
        <Button
          className={css.button}
          color="primary"
          onClick={createComplaint}
        >
          {button2WithAmount}
        </Button>
      )

    return (
      <GetHelpLayout
        title={content.title}
      >
        {(isAnyPending)
          ? (
            <div className={css.center}>
              <Loading className={css.loading} />
            </div>
          )
          : (
            <div>
              <p className={css.confirmationBody}>{getHelpLayoutbody}</p>
              <p className={css.confirmationQuestion}>{confirmationContent}</p>
              <BottomFixedContentWrapper>
                <BottomButton
                  color="secondary"
                  url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
                  clientRouted
                  onClick={() => trackRejectRefund(compensation.amount)}
                >
                  {content.button1}
                </BottomButton>
                {acceptButton}
              </BottomFixedContentWrapper>
            </div>
          )}
      </GetHelpLayout>
    )
  }
}

Refund.propTypes = propTypes

export {
  Refund
}
