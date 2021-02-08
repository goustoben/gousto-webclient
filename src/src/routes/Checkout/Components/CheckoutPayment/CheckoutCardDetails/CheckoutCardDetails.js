import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CheckoutName } from '../CheckoutName'
import { CheckoutFrame } from '../CheckoutFrame'
import { CheckoutAddress } from '../CheckoutAddress'
import css from './CheckoutCardDetails.css'

export const CheckoutCardDetails = (props) => {
  const {
    hide,
    prerender,
    receiveRef,
    sectionName,
    checkoutScriptReady,
    reloadCheckoutScript,
    asyncValidate,
    scrollToFirstMatchingRef,
    isSubmitCardEnabled,
    cardTokenReady,
    disableCardSubmission,
    isCheckoutOverhaulEnabled,
    onFramesValidationChanged,
    onSubmitFromCardDetails,
  } = props

  if (isCheckoutOverhaulEnabled) {
    return (
      <div className={classNames({ [css.hide]: hide })}>
        <CheckoutFrame
          checkoutScriptReady={checkoutScriptReady}
          isSubmitCardEnabled={isSubmitCardEnabled}
          reloadCheckoutScript={reloadCheckoutScript}
          cardTokenReady={cardTokenReady}
          disableCardSubmission={disableCardSubmission}
          isCheckoutOverhaulEnabled
          receiveRef={receiveRef}
          sectionName={sectionName}
          onFramesValidationChanged={onFramesValidationChanged}
          onSubmitFromCardDetails={onSubmitFromCardDetails}
        />
        <CheckoutAddress
          sectionName={sectionName}
          asyncValidate={asyncValidate}
          receiveRef={receiveRef}
          scrollToFirstMatchingRef={scrollToFirstMatchingRef}
          isCheckoutOverhaulEnabled
        />
      </div>
    )
  } else {
    return (
      <div className={classNames({ [css.hide]: hide })}>
        {prerender ? null : <CheckoutName receiveRef={receiveRef} sectionName={sectionName} />}
        <div className={css.frame}>
          <CheckoutFrame
            checkoutScriptReady={checkoutScriptReady}
            isSubmitCardEnabled={isSubmitCardEnabled}
            reloadCheckoutScript={reloadCheckoutScript}
            cardTokenReady={cardTokenReady}
            disableCardSubmission={disableCardSubmission}
          />
        </div>
        <div className={css.row}>
          {prerender ? null : (
            <div className={css.addressContainer}>
              <CheckoutAddress
                sectionName={sectionName}
                asyncValidate={asyncValidate}
                receiveRef={receiveRef}
                scrollToFirstMatchingRef={scrollToFirstMatchingRef}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

CheckoutCardDetails.propTypes = {
  hide: PropTypes.bool,
  prerender: PropTypes.bool,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  checkoutScriptReady: PropTypes.bool,
  reloadCheckoutScript: PropTypes.func,
  asyncValidate: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  isSubmitCardEnabled: PropTypes.bool.isRequired,
  cardTokenReady: PropTypes.func.isRequired,
  disableCardSubmission: PropTypes.func.isRequired,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

CheckoutCardDetails.defaultProps = {
  hide: false,
  prerender: false,
  receiveRef: () => {},
  sectionName: 'payment',
  checkoutScriptReady: false,
  reloadCheckoutScript: () => {},
  asyncValidate: () => {},
  scrollToFirstMatchingRef: () => {},
  isCheckoutOverhaulEnabled: false,
}
