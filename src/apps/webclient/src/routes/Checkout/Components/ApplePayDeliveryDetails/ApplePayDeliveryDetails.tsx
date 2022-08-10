import React, { useRef, useState } from 'react'

import {
  AlignItems,
  BorderStyle,
  Box,
  Color,
  Display,
  Icon,
  IconVariant,
  Space,
  Text,
} from '@gousto-internal/citrus-react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { DeliveryInstruction } from 'routes/Checkout/Components/Delivery/DeliveryInstruction'
import { getSlotTimes } from 'utils/deliveries'

import css from './ApplePayDeliveryDetails.css'

/**
 * TODO during productionizing -- fix ts-ignored errors and re-write styling using `@emotion/styled`.
 * TODO Also update DeliveryEducationBanner (whole component), Delivery (renderDeliveryDay method) for consistency.
 */

/**
 * Info block about order: what is delivery day, delivery time and other misc static information.
 */
const DeliveryDetailsInfo = () => {
  const deliveryDays = useSelector((state: any) => state.boxSummaryDeliveryDays)
  const date = useSelector((state: any) => state.basket.get('date'))
  const slotId = useSelector((state: any) => state.basket.get('slotId'))
  const deliveryDate = moment(date).format('dddd Do MMMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <>
      <Box
        bg={Color.Informative_50}
        paddingH={4}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        paddingV={3.5}
        borderStyle={BorderStyle.Solid}
        borderColor={Color.Informative_200}
        borderWidth={0.5}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        borderRadius={2}
        display="flex"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        flexDirection="column"
      >
        {/**
         * Delivery day and time row.
         */}
        <Box display={Display.InlineFlex}>
          <Box color={Color.Informative_900}>
            <Icon variant={IconVariant.Inherit} name="calendar" style={{ display: 'block' }} />
          </Box>
          <Space direction="horizontal" size={4} />
          <Text size={2}>
            Your selected delivery day is{' '}
            <span style={{ fontWeight: 'bold' }}>{deliveryDate}, </span>
            <span style={{ textTransform: 'uppercase' }}>{deliveryTime}</span>
          </Text>
        </Box>
        <Space size={2} />
        {/**
         * "Insulated packaging" row.
         */}
        <Box
          display="flex"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          AlignItems={AlignItems.Center}
        >
          <Icon name="cool" variant={IconVariant.Informative} />
          <Space size={4} direction="horizontal" />
          <Text size={2}>Insulated packaging keeps your ingredients fresh for up to 12 hours.</Text>
        </Box>
        <Space size={2} />
        {/**
         * "Delivery updates" row.
         */}
        <Box
          display="flex"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          AlignItems={AlignItems.Center}
        >
          <Icon name="delivery" variant={IconVariant.Informative} />
          <Space size={4} direction="horizontal" />
          <Text size={2}>Delivery slot updates on the day via text and email.</Text>
        </Box>
      </Box>
      <Space size={8} />
    </>
  )
}

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
  const onClickPayWithApplePay = () => {
    // would be implemented in https://gousto.atlassian.net/browse/TG-6601
    // eslint-disable-next-line no-console
    console.log({ submit, recieveRef, scrollToFirstMatchingRef, isSubmitting })
  }

  const resetDeliveryInstructionField = () => {}

  const [deliveryInstructions] = useState()
  const useDeliveryInstructionRef = useRef(null)

  return (
    <>
      <DeliveryDetailsInfo />
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
