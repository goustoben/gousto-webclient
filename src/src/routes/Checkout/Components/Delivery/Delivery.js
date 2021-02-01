/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Field, FormSection } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import * as deliveryUtils from 'routes/Checkout/utils/delivery'
import globals from 'config/globals'
import scrollIntoView from 'scroll-into-view'
import { getSlotTimes } from 'utils/deliveries'

import Subscription from 'routes/Checkout/Components/Subscription'
import DeliveryDetails from './DeliveryDetails'
import DeliveryAddress from './DeliveryAddress'
import { DeliveryCard } from './DeliveryCard'
import { SectionHeader } from '../SectionHeader'

import redesignCss from '../../CheckoutRedesignContainer.css'
import css from './Delivery.css'

const propTypes = {
  formValues: PropTypes.object,
  formName: PropTypes.string,
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  asyncValidate: PropTypes.func,
  change: PropTypes.func,
  receiveRef: PropTypes.func,
  triggerSubmit: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  submit: PropTypes.func,
}

const defaultProps = {
  clearErrors: () => {},
  formValues: {},
  formName: '',
  sectionName: 'delivery',
  change: () => {},
  receiveRef: () => {},
  asyncValidate: () => {},
  triggerSubmit: () => {},
  scrollToFirstMatchingRef: () => {},
  isCheckoutOverhaulEnabled: false,
  submit: () => {},
}

export class Delivery extends React.PureComponent {
  componentDidMount() {
    // reset error msg
    const { clearErrors } = this.props
    clearErrors()
  }

  componentWillReceiveProps(nextProps) {
    const { formValues } = this.props
    if (globals.client && this.container && deliveryUtils.isAddressConfirmed(formValues) !== deliveryUtils.isAddressConfirmed(nextProps.formValues)) {
      scrollIntoView(this.container, {
        align: {
          topOffset: 30,
        },
      })
    }
  }

  handleAddressEdit = () => {
    const { change, sectionName, formName } = this.props
    change(formName, `${sectionName}.confirmed`, false)
  }

  renderAddress = () => {
    const { asyncValidate, formName, sectionName, formValues, triggerSubmit, receiveRef, scrollToFirstMatchingRef, isCheckoutOverhaulEnabled, submit } = this.props

    return (
      <div>
        <DeliveryAddress
          isDelivery
          asyncValidate={asyncValidate}
          formName={formName}
          sectionName={sectionName}
          formValues={formValues}
          triggerSubmit={triggerSubmit}
          receiveRef={receiveRef}
          scrollToFirstMatchingRef={scrollToFirstMatchingRef}
          isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
          submit={submit}
        />
      </div>
    )
  }

  renderDetails = () => {
    const { formValues, sectionName, formName, triggerSubmit, receiveRef } = this.props

    return (
      <div>
        <DeliveryDetails
          formValues={formValues[sectionName]}
          formName={formName}
          sectionName={sectionName}
          onAddressEdit={this.handleAddressEdit}
          triggerSubmit={triggerSubmit}
          receiveRef={receiveRef}
        />
      </div>
    )
  }

  renderDeliveryDay = () => {
    const { date, deliveryDays, slotId } = this.props
    const deliveryDate = moment(date).format('dddd Do MMMM')
    const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

    return (
      <div>
        Your selected delivery day is
        {' '}
        <span className={css.boldDeliveryDate}>{deliveryDate}</span>
        ,
        {' '}
        <span className={css.upperCase}>{deliveryTime}</span>
      </div>
    )
  }

  render() {
    const { sectionName, formValues, isCheckoutOverhaulEnabled } = this.props

    return (
      <div ref={el => { this.container = el }}>
        {!isCheckoutOverhaulEnabled && <Subscription sectionName={sectionName} />}
        <div
          className={classNames({
            [css.deliveryContainer]: !isCheckoutOverhaulEnabled,
            [redesignCss.sectionRedesignContainer]: isCheckoutOverhaulEnabled,
          })}
          data-testing="checkoutDeliverySection"
        >
          {isCheckoutOverhaulEnabled
            ? (
              <Fragment>
                <DeliveryCard iconName="icon-calendar">
                  {this.renderDeliveryDay()}
                </DeliveryCard>
                <SectionHeader title="Delivery details" />
              </Fragment>
            )
            : <h3 className={css.header}>Delivery details</h3>}
          <FormSection name={sectionName}>
            {isCheckoutOverhaulEnabled && (
              <div className={css.namesContainer}>
                <div className={redesignCss.inputContainer}>
                  <Field
                    name="firstName"
                    component={ReduxFormInput}
                    inputType="Input"
                    label="First name"
                    refId={`${sectionName}.firstName`}
                    dataTesting="checkoutFirstNameInput"
                    isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
                  />
                </div>
                <div className={redesignCss.inputContainer}>
                  <Field
                    name="lastName"
                    component={ReduxFormInput}
                    inputType="Input"
                    label="Last name"
                    refId={`${sectionName}.lastName`}
                    dataTesting="checkoutLastNameInput"
                    isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
                  />
                </div>
              </div>
            )}
            {deliveryUtils.isAddressConfirmed(formValues) && !isCheckoutOverhaulEnabled ? this.renderDetails() : this.renderAddress()}
          </FormSection>
        </div>
      </div>
    )
  }
}

Delivery.defaultProps = defaultProps
Delivery.propTypes = propTypes
