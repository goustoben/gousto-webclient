import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { BottomFixedContent, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import { deliveryComplaintCategoryId } from '../../../config'
import css from './DeliveryCompensation.css'

class DeliveryCompensation extends PureComponent {
  static redirectTo(link) {
    return () => {
      browserHistory.push(link)
    }
  }

  componentWillUnmount() {
    const { setErrorStatus } = this.props
    setErrorStatus(
      webClientActionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
      null
    )
  }

  render() {
    const {
      applyDeliveryRefund,
      backUrl,
      compensationAmount,
      isApplyCompensationError,
      isApplyCompensationPending,
      orderId,
      userId,
    } = this.props
    const { index, contact } = client.getHelp

    return (
      <GetHelpLayout2 backUrl={backUrl} headingText="Get help with your box">
        <Heading size="fontStyleM" type="h2">
          We&apos;re sorry to hear your box didn&apos;t arrive
        </Heading>
        <div className={css.mainText} data-testing="deliveryCompensationContent">
          {isApplyCompensationError
            ? (
              <p>
                Unfortunately we are unable to apply your credit, please get in touch with our Customer Care team.
              </p>
            ) : (
              <div>
                <p>
                  We take this very seriously, your feedback has been passed on to our team for immediate investigation.
                </p>
                <p>
                  {`As an apology, here's £${compensationAmount.toFixed(2)} credit on your next Gousto order.`}
                </p>
                <p className={css.boldText}>
                  Would you like to accept this credit, or contact us for more help?
                </p>
              </div>
            )}
        </div>
        <BottomFixedContent>
          <div className={css.ctas}>
            <div className={css.cta}>
              <CTA
                isFullWidth
                size="small"
                testingSelector="contactUsCTA"
                variant={isApplyCompensationError ? 'primary' : 'secondary'}
                isDisabled={isApplyCompensationPending}
                onClick={DeliveryCompensation.redirectTo(`${index}/${contact}`)}
              >
                Contact us
              </CTA>
            </div>
            {!isApplyCompensationError
              && (
                <div className={css.cta}>
                  <CTA
                    isFullWidth
                    size="small"
                    testingSelector="acceptCreditCTA"
                    isLoading={isApplyCompensationPending}
                    onClick={() => {
                      applyDeliveryRefund(
                        userId,
                        orderId,
                        deliveryComplaintCategoryId,
                      )
                    }}
                  >
                    Accept credit
                  </CTA>
                </div>
              )}
          </div>
        </BottomFixedContent>
      </GetHelpLayout2>
    )
  }
}

DeliveryCompensation.propTypes = {
  applyDeliveryRefund: PropTypes.func.isRequired,
  backUrl: PropTypes.string.isRequired,
  compensationAmount: PropTypes.number.isRequired,
  isApplyCompensationError: PropTypes.bool.isRequired,
  isApplyCompensationPending: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  setErrorStatus: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export { DeliveryCompensation }
