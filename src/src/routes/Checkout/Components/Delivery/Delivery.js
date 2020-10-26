/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import { FormSection } from 'redux-form'
import * as deliveryUtils from 'routes/Checkout/utils/delivery'
import globals from 'config/globals'
import scrollIntoView from 'scroll-into-view'

import Subscription from 'routes/Checkout/Components/Subscription'
import css from './Delivery.css'
import DeliveryDetails from './DeliveryDetails'
import DeliveryAddress from './DeliveryAddress'

class Delivery extends React.PureComponent {
  static propTypes = {
    formValues: PropTypes.object,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    clearErrors: PropTypes.func,
    asyncValidate: PropTypes.func,
    change: PropTypes.func,
    receiveRef: PropTypes.func,
    triggerSubmit: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
  }

  static defaultProps = {
    clearErrors: () => {},
    formValues: {},
    formName: '',
    sectionName: 'delivery',
    change: () => {},
    receiveRef: () => {},
    asyncValidate: () => {},
    triggerSubmit: () => {},
    scrollToFirstMatchingRef: () => {},
  }

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
    const { asyncValidate, formName, sectionName, formValues, triggerSubmit, receiveRef, scrollToFirstMatchingRef } = this.props

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

  render() {
    const { sectionName } = this.props

    return (
      <div ref={el => { this.container = el }}>
        <Subscription sectionName={sectionName} />
        <div className={css.deliveryContainer} data-testing="checkoutDeliverySection">
          <h3 className={css.header}>Delivery details</h3>
          <FormSection name={sectionName}>
            {deliveryUtils.isAddressConfirmed(this.props.formValues) ? this.renderDetails() : this.renderAddress()}
          </FormSection>
        </div>
      </div>
    )
  }
}

export default Delivery
