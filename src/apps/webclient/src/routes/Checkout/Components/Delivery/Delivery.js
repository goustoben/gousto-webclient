import {
  Box,
  Space,
  Text,
  Display,
  BorderStyle,
  Color,
  FontFamily,
} from '@gousto-internal/citrus-react'

/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import { Field, FormSection } from 'redux-form'
import { ReduxFormInput } from 'Form/ReduxFormInput'
import { HotjarTrigger } from 'HotjarTrigger'
import * as deliveryUtils from 'routes/Checkout/utils/delivery'
import scrollIntoView from 'scroll-into-view'
import { getSlotTimes } from 'utils/deliveries'
import { canUseWindow } from 'utils/browserEnvironment'

import { DeliveryAddressContainer } from './DeliveryAddress'
import { DeliveryCard } from './DeliveryCard'
import { SectionHeader } from '../SectionHeader'

const propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  formName: PropTypes.string,
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  asyncValidate: PropTypes.func,
  receiveRef: PropTypes.func,
  triggerSubmit: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  submit: PropTypes.func,
  aboutYouErrors: PropTypes.bool,
}

const defaultProps = {
  clearErrors: () => {},
  formValues: {},
  formName: '',
  sectionName: 'delivery',
  receiveRef: () => {},
  asyncValidate: () => {},
  triggerSubmit: () => {},
  scrollToFirstMatchingRef: () => {},
  submit: () => {},
  aboutYouErrors: false,
}

export class Delivery extends React.PureComponent {
  componentDidMount() {
    const { clearErrors } = this.props
    clearErrors()
  }

  componentDidUpdate(prevProps) {
    const { formValues } = this.props

    if (
      canUseWindow() &&
      this.container &&
      deliveryUtils.isAddressConfirmed(prevProps.formValues) !==
        deliveryUtils.isAddressConfirmed(formValues)
    ) {
      scrollIntoView(this.container, {
        align: {
          topOffset: 30,
        },
      })
    }
  }

  renderAddress = () => {
    const {
      asyncValidate,
      formName,
      sectionName,
      formValues,
      triggerSubmit,
      receiveRef,
      scrollToFirstMatchingRef,
      submit,
      aboutYouErrors,
    } = this.props

    return (
      <DeliveryAddressContainer
        isDelivery
        asyncValidate={asyncValidate}
        formName={formName}
        sectionName={sectionName}
        formValues={formValues}
        triggerSubmit={triggerSubmit}
        receiveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        submit={submit}
        aboutYouErrors={aboutYouErrors}
      />
    )
  }

  renderDeliveryDay = () => {
    const { date, deliveryDays, slotId } = this.props
    const deliveryDate = moment(date).format('dddd Do MMMM')
    const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

    return (
      <Box display={Display.InlineFlex}>
        <Text size={2}>Your selected delivery day is &nbsp;</Text>
        <Text fontFamily={FontFamily.Bold}>{deliveryDate}</Text>
        <Text size={2}>, {deliveryTime}</Text>
      </Box>
    )
  }

  render() {
    const { sectionName } = this.props

    return (
      <div
        ref={(el) => {
          this.container = el
        }}
      >
        <Box
          borderStyle={BorderStyle.Solid}
          borderWidth={0.5}
          borderColor={Color.ColdGrey_100}
          bg={Color.White}
          paddingH={[3, 6]}
          paddingV={[6, 8]}
          data-testing="checkoutDeliverySection"
        >
          <SectionHeader title="Delivery details" />
          <DeliveryCard iconName="icon-calendar" cardStyle="blue">
            {this.renderDeliveryDay()}
          </DeliveryCard>
          <FormSection name={sectionName}>
            <Box display={Display.Flex}>
              <Box width="100%" borderRadius={3}>
                <Field
                  name="firstName"
                  component={ReduxFormInput}
                  inputType="Input"
                  autoComplete="given-name"
                  type="text"
                  label="First name"
                  refId={`${sectionName}.firstName`}
                  dataTesting="checkoutFirstNameInput"
                />
              </Box>
              <Space size={[4]} direction="horizontal" />
              <Box width="100%" borderRadius={3}>
                <Field
                  name="lastName"
                  component={ReduxFormInput}
                  inputType="Input"
                  autoComplete="family-name"
                  type="text"
                  label="Last name"
                  refId={`${sectionName}.lastName`}
                  dataTesting="checkoutLastNameInput"
                />
              </Box>
            </Box>
            <Space size={6} direction="vertical" />
            {this.renderAddress()}
          </FormSection>
          <HotjarTrigger name="pbc_delivery_and_payment" shouldInvoke={false} />
        </Box>
      </div>
    )
  }
}

Delivery.defaultProps = defaultProps
Delivery.propTypes = propTypes
