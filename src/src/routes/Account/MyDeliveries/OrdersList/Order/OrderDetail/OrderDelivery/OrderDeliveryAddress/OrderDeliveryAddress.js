import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Alert, Button } from 'goustouicomponents'
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
    hasError: PropTypes.bool,
    isPendingUpdateAddress: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const { shippingAddressId } = this.props

    this.state = {
      editAddressOpen: false,
      selectedAddressId: shippingAddressId
    }
  }

  handleToggleButton = () => {
    const { editAddressOpen } = this.state
    this.setState({editAddressOpen: !editAddressOpen})
  }

  handleSelectAddress = (selectedAddressId) => {
    this.setState({selectedAddressId})
  }

  handleSubmit = async () => {
    const { orderAddressChange, orderId } = this.props
    const { selectedAddressId } = this.state
    await orderAddressChange(orderId, selectedAddressId)
    this.setState({editAddressOpen: false})
  }

  formatAddress = (address) => {
    const formattedAddress = [address.get('line1')]

    if(address.get('line2')) formattedAddress.push(address.get('line2'))
    if(address.get('line3')) formattedAddress.push(address.get('line3'))

    formattedAddress.push(address.get('town'), address.get('postcode'))

    return formattedAddress.join(', ')
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
          formattedAddress={this.formatAddress(address)}
          orderId={orderId}
          addressId={addressId}
          isSelected={isSelected}
          selectAddress={id => this.handleSelectAddress(id)}
        />
      )
    })
  }

  render() {
    const { addresses, orderState, shippingAddressId, isPendingUpdateAddress, hasError } = this.props
    const { editAddressOpen, selectedAddressId } = this.state
    const submitDisabled = selectedAddressId === shippingAddressId
    const shippingAddress = addresses.find(address => address.get('id') === shippingAddressId)
    const formattedShippingAddress = this.formatAddress(shippingAddress)

    return (
      <div>
        <div className={css.headerRow}>
          <div className={css.header}>Delivery address</div>
          {['recipes chosen', 'menu open'].indexOf(orderState) > -1 ? (
            <LinkButton
              onClick={this.handleToggleButton}
              text={editAddressOpen ? 'Cancel' : 'Change'}
            />
          ) : null}
        </div>
        <div className={css.currentAddress}>
          <p>{formattedShippingAddress}</p>
        </div>
        {editAddressOpen &&
          <div>
            {this.renderedAddresses()}
            <Button
              onClick={this.handleSubmit}
              color={'secondary'}
              width="full"
              noDecoration
              pending={isPendingUpdateAddress}
              disabled={submitDisabled}
            >
              Set Address
            </Button>
          </div>
        }
        {hasError &&
          <Alert type="danger">
            There was a problem updating your order address. Please contact customer care.
          </Alert>
        }
      </div>
    )
  }
}

export { OrderDeliveryAddress }
