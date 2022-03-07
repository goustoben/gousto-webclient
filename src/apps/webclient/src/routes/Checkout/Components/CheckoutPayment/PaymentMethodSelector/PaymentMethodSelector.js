import React from 'react'
import PropTypes from 'prop-types'
import { PaymentMethod } from 'config/signup'
import {
  RadioGroup,
  Box,
  Space,
  FlexDirection,
  AlignItems,
  Text,
  Color,
  FontWeight,
} from '@gousto-internal/citrus-react'
import Svg from 'Svg'
import css from './PaymentMethodSelector.css'

export const PaymentMethodSelector = ({
  currentPaymentMethod,
  setCurrentPaymentMethod,
  isPayPalReady,
}) => {
  const renderItem = (item, isActive) => {
    const { itemType } = item
    switch (itemType) {
      case 'label': {
        const { text } = item

        return (
          <Text
            color={isActive ? Color.Secondary_400 : Color.ColdGrey_800}
            fontWeight={isActive ? FontWeight.SemiBold : FontWeight.Normal}
          >
            {text}
          </Text>
        )
      }
      case 'paypalLabel': {
        const { text, hide } = item

        return (
          !hide && (
            <Text color={Color.Success_600} fontWeight={FontWeight.Bold}>
              {text}
            </Text>
          )
        )
      }
      case 'svg': {
        const { className, fileName } = item

        return <Svg className={className} fileName={fileName} />
      }
      default: {
        return null
      }
    }
  }

  const renderLabel = (paymentMethod, leftItem, rightItem) => (
    <Box flexGrow={1} display="flex" flexDirection={FlexDirection.Row} paddingV={0.25}>
      <Space size={2} direction="horizontal" />
      <Box display="flex" flexGrow={1}>
        {renderItem(leftItem, currentPaymentMethod === paymentMethod)}
      </Box>
      <Box display="flex" flexDirection={FlexDirection.Column} alignItems={AlignItems.FlexEnd}>
        {renderItem(rightItem, currentPaymentMethod === paymentMethod)}
      </Box>
    </Box>
  )

  return (
    <>
      <RadioGroup
        outline
        name="paymentMethod"
        options={[
          {
            id: PaymentMethod.Card,
            value: PaymentMethod.Card,
            checked: currentPaymentMethod === PaymentMethod.Card,
            onClick: () => setCurrentPaymentMethod(PaymentMethod.Card),
            label: () =>
              renderLabel(
                PaymentMethod.Card,
                {
                  itemType: 'label',
                  text: 'Card payment',
                },
                {
                  itemType: 'svg',
                  className: css.cardsIcon,
                  fileName: 'payment-method-4-cards',
                }
              ),
          },
          {
            id: PaymentMethod.PayPal,
            value: PaymentMethod.PayPal,
            checked: currentPaymentMethod === PaymentMethod.PayPal,
            onClick: () => setCurrentPaymentMethod(PaymentMethod.PayPal),
            label: () =>
              renderLabel(
                PaymentMethod.PayPal,
                {
                  itemType: 'svg',
                  className: css.paypalIcon,
                  fileName: 'payment-method-paypal',
                },
                {
                  itemType: 'paypalLabel',
                  className: css.paypalConnectedLabel,
                  text: 'Connected',
                  hide: !isPayPalReady,
                }
              ),
          },
        ]}
      />
      <Space size={4} />
    </>
  )
}

PaymentMethodSelector.propTypes = {
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired,
  isPayPalReady: PropTypes.bool.isRequired,
}
