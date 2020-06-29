/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import { showAddress } from 'routes/Checkout/utils/delivery'
import css from '../Delivery.css'
import DeliveryInstruction from './DeliveryInstruction'
import DeliveryPhoneNumber from './DeliveryPhoneNumber'

class DeliveryDetails extends React.PureComponent {
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
        <DeliveryInstruction
          value={formValues.deliveryInstruction}
          reset={this.reset}
          receiveRef={receiveRef}
          sectionName={sectionName}
        />
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
}

DeliveryDetails.defaultProps = {
  deliveryAddress: {},
  formValues: {},
  receiveRef: () => { },
  sectionName: 'delivery',
}

export default DeliveryDetails
