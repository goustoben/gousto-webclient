import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Alert, Button } from 'goustouicomponents'
import config from 'config'
import Link from 'Link'
import Loading from 'Loading'
import { LinkButton } from '../LinkButton'
import { Address } from './Address'

import css from './OrderDeliveryAddress.css'

class OrderDeliveryAddress extends React.PureComponent {
  constructor(props) {
    super(props)
    const { shippingAddressId } = this.props

    this.state = {
      editAddressOpen: false,
      selectedAddressId: shippingAddressId
    }
  }

  handleToggleButton = () => {
    const { orderId, userTrackToggleEditAddressSection } = this.props
    const { editAddressOpen } = this.state
    if (!editAddressOpen) {
      userTrackToggleEditAddressSection(orderId)
    }
    this.setState({editAddressOpen: !editAddressOpen})
  }

  handleSelectAddress = (newSelectedAddressId) => {
    const { orderId, userTrackAddressSelected } = this.props
    const { selectedAddressId } = this.state
    this.setState({selectedAddressId: newSelectedAddressId})
    userTrackAddressSelected(orderId, selectedAddressId, newSelectedAddressId)
  }

  handleSubmit = async () => {
    const { orderAddressChange, orderId } = this.props
    const { selectedAddressId } = this.state
    await orderAddressChange(orderId, selectedAddressId)
    this.setState({editAddressOpen: false})
  }

  formatAddress = (address) => {
    const formattedAddress = [address.get('line1')]

    if (address.get('line2')) formattedAddress.push(address.get('line2'))
    if (address.get('line3')) formattedAddress.push(address.get('line3'))

    formattedAddress.push(address.get('town'), address.get('postcode'))

    return formattedAddress.join(', ')
  }

  renderedAddresses() {
    const { addresses, didErrorFetchingAddresses, orderId } = this.props
    const { selectedAddressId } = this.state

    if (didErrorFetchingAddresses) {
      return (
        <Alert type="danger">
          Whoops, there was a problem and we cannot display your shipping addresses at the moment, please try again later.
        </Alert>
      )
    }

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
    const {
      addresses,
      isFetchingUserAddresses,
      isPendingUpdateAddress,
      orderState,
      shippingAddressId,
      shippingAddress: orderShippingAddress,
    } = this.props
    const { editAddressOpen, selectedAddressId } = this.state
    const submitDisabled = selectedAddressId === shippingAddressId
    const shippingAddress = orderShippingAddress || addresses.find(address => address.get('id') === shippingAddressId)
    const { client } = config.routes

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
        {(!shippingAddress)
          ? (
            <Alert type="danger">
              Whoops, there was a problem when loading your addresses, please try again.
            </Alert>
          )
          : (
            <>
              <div className={css.currentAddress} data-testing="orderDeliveryAddress">
                <p className={css.header}>{shippingAddress.get('name')}</p>
                <p>{this.formatAddress(shippingAddress)}</p>
              </div>
              {editAddressOpen && (
                <div>
                  {isFetchingUserAddresses
                    ? (
                      <div className={css.spinnerContainer}>
                        <Loading className={css.spinner} />
                      </div>
                    )
                    : (
                      this.renderedAddresses()
                    )}
                  <Link className={css.newAddressLink} to={client.myDetails} clientRouted={false}>
                    Add new address to your account&nbsp;
                    <span className={css.arrowRight} />
                  </Link>
                  <Button
                    onClick={this.handleSubmit}
                    color="secondary"
                    width="full"
                    noDecoration
                    pending={isPendingUpdateAddress}
                    disabled={submitDisabled}
                  >
                    Set Address
                  </Button>
                </div>
              )}
            </>
          )}
      </div>
    )
  }
}

OrderDeliveryAddress.propTypes = {
  addresses: PropTypes.instanceOf(Immutable.Map),
  didErrorFetchingAddresses: PropTypes.bool,
  isFetchingUserAddresses: PropTypes.bool.isRequired,
  orderAddressChange: PropTypes.func,
  orderId: PropTypes.string,
  orderState: PropTypes.string,
  shippingAddressId: PropTypes.string,
  isPendingUpdateAddress: PropTypes.bool,
  userTrackToggleEditAddressSection: PropTypes.func,
  userTrackAddressSelected: PropTypes.func,
  shippingAddress: PropTypes.instanceOf(Immutable.Map({})),
}

OrderDeliveryAddress.defaultProps = {
  addresses: Immutable.Map({}),
  didErrorFetchingAddresses: null,
  orderAddressChange: () => null,
  orderId: '',
  orderState: '',
  shippingAddressId: '',
  isPendingUpdateAddress: false,
  userTrackToggleEditAddressSection: () => null,
  userTrackAddressSelected: () => null,
  shippingAddress: Immutable.Map({}),
}

export { OrderDeliveryAddress }
