/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import { showAddress } from 'routes/Checkout/utils/delivery'
import Svg from 'Svg'
import css from '../Delivery.css'
import DeliveryInstruction from './DeliveryInstruction'
import DeliveryPhoneNumber from './DeliveryPhoneNumber'
import { DeliveryEducationBanner } from './DeliveryEducationBanner'
import DeliveryAddressType from './DeliveryAddressType'

class DeliveryDetails extends PureComponent {
  reset = (field, value = '') => {
    const { change, formName, sectionName, untouch } = this.props
    const fieldName = `${sectionName}.${field}`

    untouch(formName, fieldName)
    change(formName, fieldName, value)
  }

  render() {
    const { formValues, deliveryAddress, onAddressEdit, receiveRef, sectionName, isOldCheckoutFieldEnabled } = this.props

    return (
      <div className={css.deliveryInfoContainer}>
        <h4>Deliver to</h4>
        <p className={css.textSM} data-testing="checkoutDeliveryDetailsAddress">
          {showAddress(deliveryAddress)}
&nbsp;
          <span
            onClick={onAddressEdit}
            className={css.linkBase}
            data-testing="checkoutDeliveryDetailsEditAddress"
          >
            Edit address&nbsp;
            <span className={css.linkRight} />
          </span>
        </p>
        {isOldCheckoutFieldEnabled && (
          <Fragment>
            <DeliveryAddressType
              value={formValues.addressType}
              reset={this.reset}
              receiveRef={receiveRef}
              sectionName={sectionName}
              isOldCheckoutFieldEnabled={isOldCheckoutFieldEnabled}
            />
            <div className={css.iconDeliverySection}>
              <Svg fileName="icon-delivery" className={css.iconDelivery} />
              <div className={css.iconDeliveryDescription}>
                <p className={css.textSM}>Not going to be home? No problem. Just tell us a safe place to leave your box. Your food will keep cold for 12hrs.</p>
              </div>
            </div>
          </Fragment>
        )}
        <DeliveryInstruction
          value={formValues.deliveryInstruction}
          reset={this.reset}
          receiveRef={receiveRef}
          sectionName={sectionName}
          isOldCheckoutFieldEnabled={isOldCheckoutFieldEnabled}
        />
        <DeliveryEducationBanner />
        <DeliveryPhoneNumber
          receiveRef={receiveRef}
          sectionName={sectionName}
        />
      </div>
    )
  }
}

DeliveryDetails.propTypes = {
  deliveryAddress: PropTypes.objectOf(PropTypes.object),
  formValues: PropTypes.objectOf(PropTypes.object),
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  change: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  untouch: PropTypes.func.isRequired,
  onAddressEdit: PropTypes.func.isRequired,
  isOldCheckoutFieldEnabled: PropTypes.bool,
}

DeliveryDetails.defaultProps = {
  deliveryAddress: {},
  formValues: {},
  receiveRef: () => { },
  sectionName: 'delivery',
  isOldCheckoutFieldEnabled: false,
}

export default DeliveryDetails
