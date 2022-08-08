import React from 'react'

import { Box, BorderStyle, Color, Space } from '@gousto-internal/citrus-react'

import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { ApplePayDeliveryDetails } from 'routes/Checkout/Components/ApplePayDeliveryDetails/ApplePayDeliveryDetails'
import { addInitialValues, validationMessages } from 'routes/Checkout/Components/Delivery'
import { SectionHeader } from 'routes/Checkout/Components/SectionHeader'
import { formContainer } from 'routes/Checkout/Components/formContainer'
import { deliveryValidations } from 'routes/Checkout/checkoutValidations'

const sectionName = 'apple-pay'

type PayWithApplePayStepProps = {
  submit: () => void
  receiveRef: () => void
  scrollToFirstMatchingRef: () => void
}

const PayWithApplePayStep = ({
  submit,
  receiveRef,
  scrollToFirstMatchingRef,
}: PayWithApplePayStepProps) => (
  <>
    <Box
      borderStyle={BorderStyle.Solid}
      borderWidth={0.5}
      borderColor={Color.ColdGrey_100}
      bg={Color.White}
      paddingH={[3, 6]}
      paddingV={[6, 8]}
      data-testing="checkoutApplePayDeliverySection"
    >
      <SectionHeader title="Delivery details" />
      <ApplePayDeliveryDetails
        submit={submit}
        recieveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        isSubmitting={false}
        isCtaDisabled={false}
      />
      <RibbonTriggerContainer name="checkout-apple-pay" />
    </Box>
    <Space size={6} direction="vertical" />
  </>
)

const PayWithApplePayForm = formContainer(
  PayWithApplePayStep,
  deliveryValidations(sectionName),
  sectionName,
  validationMessages(sectionName),
) // eslint-disable-line import/no-mutable-exports

const PayWithApplePay = addInitialValues(PayWithApplePayForm, { sectionName })

export { PayWithApplePay }
