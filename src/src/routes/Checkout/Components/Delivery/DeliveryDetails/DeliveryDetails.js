/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { showAddress } from 'routes/Checkout/utils/delivery'
import { onEnter } from 'utils/accessibility'
import { DeliveryInstruction } from './DeliveryInstruction'
import { DeliveryPhoneNumber } from './DeliveryPhoneNumber'
import { DeliveryEducationBanner } from './DeliveryEducationBanner'
import css from '../Delivery.css'

class DeliveryDetails extends PureComponent {
  reset = (field, value = '') => {
    const { change, formName, sectionName, untouch } = this.props
    const fieldName = `${sectionName}.${field}`

    untouch(formName, fieldName)
    change(formName, fieldName, value)
  }

  render() {
    const { formValues, deliveryAddress, onAddressEdit, receiveRef, sectionName } = this.props

    return (
      <div className={css.deliveryInfoContainer}>
        <div>
          <h4>Deliver to</h4>
          <p className={css.textSM} data-testing="checkoutDeliveryDetailsAddress">
            {showAddress(deliveryAddress)}
            &nbsp;
            <span
              role="button"
              tabIndex="0"
              onKeyDown={onEnter(onAddressEdit)}
              onClick={onAddressEdit}
              className={css.linkBase}
              data-testing="checkoutDeliveryDetailsEditAddress"
            >
              Edit address&nbsp;
              <span className={css.linkRight} />
            </span>
          </p>
        </div>
        <DeliveryInstruction
          value={formValues.deliveryInstruction}
          reset={this.reset}
          receiveRef={receiveRef}
          sectionName={sectionName}
        />
        <DeliveryEducationBanner />
        <DeliveryPhoneNumber receiveRef={receiveRef} sectionName={sectionName} />
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
}

DeliveryDetails.defaultProps = {
  deliveryAddress: {},
  formValues: {},
  receiveRef: () => {},
  sectionName: 'delivery',
}

export { DeliveryDetails }
