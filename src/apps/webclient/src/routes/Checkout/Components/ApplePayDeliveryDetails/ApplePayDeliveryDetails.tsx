import React, { useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { DeliveryEducationBanner } from 'routes/Checkout/Components/Delivery/DeliveryEducationBanner'
import { DeliveryInstruction } from 'routes/Checkout/Components/Delivery/DeliveryInstruction'
import { getDeliveryTimeAndDate } from 'routes/Checkout/checkoutSelectors'

import css from './ApplePayDeliveryDetails.css'

// TODO Re-write styling using `@emotion/styled`.

type ApplePayDeliveryDetailsProps = {
  /**
   * Callback to submit form.
   */
  submit: () => void
  recieveRef: any
  /**
   * Scroll to ref.
   */
  scrollToFirstMatchingRef: () => void
  /**
   * Is form in progress being submitted.
   */
  isSubmitting: boolean
  /**
   * Is CTA button disabled.
   */
  isCtaDisabled: boolean
}

/**
 * Apple Pay step delivery details - delivery location (front porch, garage, etc.) with delivery day info.
 */
export const ApplePayDeliveryDetails = ({
  submit,
  recieveRef,
  scrollToFirstMatchingRef,
  isSubmitting,
  isCtaDisabled,
}: ApplePayDeliveryDetailsProps) => {
  const { deliveryTime, deliveryDate } = useSelector(getDeliveryTimeAndDate)

  const onClickPayWithApplePay = () => {
    // would be implemented in https://gousto.atlassian.net/browse/TG-6601
    // eslint-disable-next-line no-console
    console.log({ submit, recieveRef, scrollToFirstMatchingRef, isSubmitting })
  }

  const resetDeliveryInstructionField = () => {
    // would be implemented in https://gousto.atlassian.net/browse/TG-6601
  }

  const [deliveryInstructions] = useState()
  const useDeliveryInstructionRef = useRef(null)

  return (
    <>
      <DeliveryEducationBanner deliveryTime={deliveryTime} deliveryDate={deliveryDate} />
      <DeliveryInstruction
        value={deliveryInstructions}
        reset={resetDeliveryInstructionField}
        receiveRef={useDeliveryInstructionRef}
        sectionName="Section Name"
        isMobile={false}
      />
      <button
        type="submit"
        onClick={onClickPayWithApplePay}
        disabled={isCtaDisabled}
        className={css.applePayButton}
      >
        <span className={css.applePayButtonText}>Pay with</span>
        <span className={css.applePayButtonLogo} />
      </button>
    </>
  )
}
