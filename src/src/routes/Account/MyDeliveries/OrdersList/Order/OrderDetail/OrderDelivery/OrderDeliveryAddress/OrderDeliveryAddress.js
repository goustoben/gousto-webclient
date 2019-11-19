import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Button } from 'goustouicomponents'
import { LinkButton } from '../LinkButton'
import { Address } from './Address'

import css from './OrderDeliveryAddress.css'

class OrderDeliveryAddress extends React.PureComponent {

  static propTypes = {
    addresses: PropTypes.instanceOf(Immutable.Map),
    orderAddressChange: PropTypes.func,
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

  handleSelectAddress(selectedAddressId) {
    this.setState({selectedAddressId})
  }

  handleSubmit() {
    const { orderAddressChange, orderId } = this.props
    const { selectedAddressId } = this.state
    orderAddressChange(orderId, selectedAddressId)
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
          line1={address.get('line1')}
          line2={address.get('line2')}
          line3={address.get('line3')}
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
    const { orderState, shippingAddressId } = this.props
    const { selectedAddressId } = this.state
    const submitDisabled = selectedAddressId === shippingAddressId

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
        <Button
          onClick={() => this.handleSubmit()}
          color={'secondary'}
          width="full"
          noDecoration
          disabled={submitDisabled}
        >
          Set Address
        </Button>
      </div>
    )
  }
}

export { OrderDeliveryAddress }
