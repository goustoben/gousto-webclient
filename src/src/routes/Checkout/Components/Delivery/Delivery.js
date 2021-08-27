/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Field, FormSection } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import { HotjarTrigger } from 'HotjarTrigger'
import * as deliveryUtils from 'routes/Checkout/utils/delivery'
import globals from 'config/globals'
import scrollIntoView from 'scroll-into-view'
import { getSlotTimes } from 'utils/deliveries'

import { DeliveryAddressContainer } from './DeliveryAddress'
import { DeliveryCard } from './DeliveryCard'
import { SectionHeader } from '../SectionHeader'

import checkoutCss from '../../Checkout.css'
import css from './Delivery.css'

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
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
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
  isPaymentBeforeChoosingEnabled: false,
}

export class Delivery extends React.PureComponent {
  componentDidMount() {
    const { clearErrors } = this.props
    clearErrors()
  }

  componentDidUpdate(prevProps) {
    const { formValues } = this.props

    if (
      globals.client &&
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
      <div className={css.dateContainer}>
        Your selected delivery day is &nbsp;
        <div className={css.boldDeliveryDate}>{deliveryDate}</div>,&nbsp;
        <div className={css.upperCase}>{deliveryTime}</div>
      </div>
    )
  }

  render() {
    const { sectionName, isPaymentBeforeChoosingEnabled } = this.props

    return (
      <div
        ref={(el) => {
          this.container = el
        }}
      >
        <div className={checkoutCss.sectionContainer} data-testing="checkoutDeliverySection">
          <SectionHeader title="Delivery details" />
          <DeliveryCard iconName="icon-calendar" cardStyle="blue">
            {this.renderDeliveryDay()}
          </DeliveryCard>
          <FormSection name={sectionName}>
            <div className={css.namesContainer}>
              <div className={classNames(checkoutCss.inputContainer, css.nameInput)}>
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
              </div>
              <div className={classNames(checkoutCss.inputContainer, css.nameInput)}>
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
              </div>
            </div>
            {this.renderAddress()}
          </FormSection>
          <HotjarTrigger
            name="pbc_delivery_and_payment"
            shouldInvoke={isPaymentBeforeChoosingEnabled}
          />
        </div>
      </div>
    )
  }
}

Delivery.defaultProps = defaultProps
Delivery.propTypes = propTypes
