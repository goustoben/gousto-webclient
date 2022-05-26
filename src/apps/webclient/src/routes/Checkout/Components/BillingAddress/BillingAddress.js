import React from 'react'

import { Box, Text, Space, FontFamily, Checkbox, Color } from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'

import { BillingAddressContainer } from './AddressContainer'

export class BillingAddress extends React.PureComponent {
  toggleDeliveryAddress = () => {
    const { formValues, sectionName, form, change } = this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    change(form, `${sectionName}.isBillingAddressDifferent`, !isBillingAddressDifferent)
  }

  render() {
    const { formValues, sectionName, asyncValidate, form, receiveRef, scrollToFirstMatchingRef } =
      this.props
    const isBillingAddressDifferent =
      formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent

    return (
      <>
        <Box data-testing="checkoutBillingAddressContainer">
          <Space size={2} direction="vertical" />
          <Text fontFamily={FontFamily.Bold} size={2}>
            Billing address
          </Text>
          <Space size={2} direction="vertical" />
          <Checkbox
            color={Color.Secondary_400}
            checked={!isBillingAddressDifferent}
            data-testing="checkoutBillingAddressToggle"
            onChange={this.toggleDeliveryAddress}
          >
            My billing address is the same as my delivery address
          </Checkbox>
          {isBillingAddressDifferent ? (
            <Box paddingTop="0.5rem">
              <Space size={2} />
              <BillingAddressContainer
                isDelivery={false}
                asyncValidate={asyncValidate}
                formName={form}
                sectionName={sectionName}
                formValues={formValues || {}}
                onSaveAction={this.toggleDeliveryAddress}
                receiveRef={receiveRef}
                scrollToFirstMatchingRef={scrollToFirstMatchingRef}
              />
            </Box>
          ) : null}
        </Box>
        <Space size={4} direction="vertical" />
      </>
    )
  }
}

BillingAddress.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
  sectionName: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  asyncValidate: PropTypes.func,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
}

BillingAddress.defaultProps = {
  asyncValidate: () => {},
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
}
