import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CheckoutFrame } from '../CheckoutFrame'
import { CheckoutAddress } from '../CheckoutAddress'
import css from './CheckoutCardDetails.module.css'

export const CheckoutCardDetails = (props) => {
  const {
    hide,
    receiveRef,
    sectionName,
    checkoutScriptReady,
    reloadCheckoutScript,
    asyncValidate,
    scrollToFirstMatchingRef,
    isSubmitCardEnabled,
    cardTokenReady,
    disableCardSubmission,
    onFramesValidationChanged,
    onSubmitFromCardDetails,
    isStartSubscriptionSubmitted,
  } = props

  return (
    <div className={classNames({ [css.hide]: hide })}>
      <CheckoutFrame
        checkoutScriptReady={checkoutScriptReady}
        isSubmitCardEnabled={isSubmitCardEnabled}
        reloadCheckoutScript={reloadCheckoutScript}
        cardTokenReady={cardTokenReady}
        disableCardSubmission={disableCardSubmission}
        receiveRef={receiveRef}
        sectionName={sectionName}
        onFramesValidationChanged={onFramesValidationChanged}
        onSubmitFromCardDetails={onSubmitFromCardDetails}
        isStartSubscriptionSubmitted={isStartSubscriptionSubmitted}
      />
      <CheckoutAddress
        sectionName={sectionName}
        asyncValidate={asyncValidate}
        receiveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
      />
    </div>
  )
}

CheckoutCardDetails.propTypes = {
  hide: PropTypes.bool,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  checkoutScriptReady: PropTypes.bool,
  reloadCheckoutScript: PropTypes.func,
  asyncValidate: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  isSubmitCardEnabled: PropTypes.bool.isRequired,
  cardTokenReady: PropTypes.func.isRequired,
  disableCardSubmission: PropTypes.func.isRequired,
  isStartSubscriptionSubmitted: PropTypes.bool,
  onFramesValidationChanged: PropTypes.func,
  onSubmitFromCardDetails: PropTypes.func,
}

CheckoutCardDetails.defaultProps = {
  hide: false,
  receiveRef: () => {},
  sectionName: 'payment',
  checkoutScriptReady: false,
  reloadCheckoutScript: () => {},
  asyncValidate: () => {},
  scrollToFirstMatchingRef: () => {},
  isStartSubscriptionSubmitted: false,
  onFramesValidationChanged: () => {},
  onSubmitFromCardDetails: () => {},
}
