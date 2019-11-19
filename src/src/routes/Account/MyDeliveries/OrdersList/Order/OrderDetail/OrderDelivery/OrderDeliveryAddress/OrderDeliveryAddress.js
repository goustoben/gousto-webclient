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
    const { orderState, shippingAddressId, isPendingUpdateAddress, hasError } = this.props
    const { editAddressOpen, selectedAddressId } = this.state
    const submitDisabled = selectedAddressId === shippingAddressId

    return (
      <div>
        <div className={css.headerRow}>
          <div className={`${css.bold} ${css.subHeader}`}>Delivery Address</div>
          {['recipes chosen', 'menu open'].indexOf(orderState) > -1 ? (
            <LinkButton
              onClick={this.handleToggleButton}
              text={editAddressOpen ? 'Cancel' : 'Change'}
            />
          ) : null}
        </div>
        <div className={css.currentAddress}>Current Address here</div>
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
