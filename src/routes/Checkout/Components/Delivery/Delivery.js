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
    onStepChange: PropTypes.func,
    formValues: PropTypes.object,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    nextStepName: PropTypes.string,
    clearErrors: PropTypes.func,
    manualSubmit: PropTypes.func,
    asyncValidate: PropTypes.func,
    change: PropTypes.func,
    receiveRef: PropTypes.func,
    triggerSubmit: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
  }

  static defaultProps = {
    clearErrors: () => {},
    onStepChange: () => {},
    formValues: {},
    formName: '',
    sectionName: 'delivery',
    change: () => {},
    receiveRef: () => {},
  }

  componentDidMount() {
    // reset error msg
    this.props.clearErrors()
  }

  componentWillReceiveProps(nextProps) {
    if (globals.client && this.container && deliveryUtils.isAddressConfirmed(this.props.formValues) !== deliveryUtils.isAddressConfirmed(nextProps.formValues)) {
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

  renderAddress = () => (
    <div>
      <DeliveryAddress
        isDelivery
        asyncValidate={this.props.asyncValidate}
        formName={this.props.formName}
        sectionName={this.props.sectionName}
        formValues={this.props.formValues}
        triggerSubmit={this.props.triggerSubmit}
        receiveRef={this.props.receiveRef}
        scrollToFirstMatchingRef={this.props.scrollToFirstMatchingRef}
      />
    </div>
  )

  renderDetails = () => (
    <div>
      <DeliveryDetails
        formValues={this.props.formValues[this.props.sectionName]}
        formName={this.props.formName}
        sectionName={this.props.sectionName}
        onAddressEdit={this.handleAddressEdit}
        triggerSubmit={this.props.triggerSubmit}
        receiveRef={this.props.receiveRef}
      />
    </div>
  )

  render() {

    return (
      <div ref={el => { this.container = el }}>
        <Subscription sectionName={this.props.sectionName} />
        <div className={css.deliveryContainer} data-testing="checkoutDeliverySection">
          <h3 className={css.header}>Delivery details</h3>
          <FormSection name={this.props.sectionName}>
            {deliveryUtils.isAddressConfirmed(this.props.formValues) ? this.renderDetails() : this.renderAddress()}
          </FormSection>
        </div>
      </div>
    )
  }
}

export default Delivery
