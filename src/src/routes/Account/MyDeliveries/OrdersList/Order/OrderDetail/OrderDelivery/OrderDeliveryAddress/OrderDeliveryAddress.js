import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { LinkButton } from '../LinkButton'
import { Address } from './Address'

import css from './OrderDeliveryAddress.css'

class OrderDeliveryAddress extends React.PureComponent {

  static propTypes = {
    addresses: PropTypes.instanceOf(Immutable.Map),
    orderId: PropTypes.string,
    orderState: PropTypes.string,
    shippingAddressId: PropTypes.string,
  }

  constructor(props) {
    super(props)
    const { shippingAddressId } = this.props

    this.state = {
      selectedAddressId: shippingAddressId
    }
  }

  renderedAddresses() {
    const { addresses, orderId } = this.props
    const { selectedAddressId } = this.state

    return addresses.map(address => {
      const addressId = address.get('id')
      const isSelected = selectedAddressId === addressId

      return (
        <Address
          key={addressId}
          addressName={address.get('name')}
          address={address.get('line1')}
          town={address.get('town')}
          postcode={address.get('postcode')}
          orderId={orderId}
          addressId={addressId}
          isSelected={isSelected}
          selectAddress={id => this.handleSelectAddress(id)}
        />
      )
    })
  }

  render() {
    const { orderState } = this.props

    return (
      <div>
        <div className={css.headerRow}>
          <div className={`${css.bold} ${css.subHeader}`}>Delivery Address</div>
          {['recipes chosen', 'menu open'].indexOf(orderState) > -1 ? (
            <LinkButton
              onClick={() => {}}
              text={'Change'}
              // onClick={onClickFunction}
              // text={editDeliveryMode ? 'Cancel' : 'Change'}
            />
          ) : null}
        </div>
        <div className={css.currentAddress}></div>
        {this.renderedAddresses()}
      </div>
    )
  }
}

export { OrderDeliveryAddress }
