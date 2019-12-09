import PropTypes from 'prop-types'
import React from 'react'
import Form from 'Form'
import TextInput from 'Form/Input'
import { Button, Heading, LayoutContentWrapper } from 'goustouicomponents'
import { isMobile } from 'utils/view'
import DropdownInput from 'Form/Dropdown'
import { CancelButton } from '../CancelButton'
import css from './Postcode.css'

class Postcode extends React.Component {

  static propTypes = {
    deliveryDaysError: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    postcodePending: PropTypes.bool,
    prevPostcode: PropTypes.string,
    addresses: PropTypes.object,
    address: PropTypes.object,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    chosenAddress: PropTypes.object,
    basketChosenAddressChange: PropTypes.func.isRequired,
    view: PropTypes.string,
    tempPostcode: PropTypes.string,
    setTempPostcode: PropTypes.func,
    boxSummaryNext: PropTypes.func,
    isVisible: PropTypes.bool,
    shouldDisplayFullScreenBoxSummary: PropTypes.bool,
  }

  handleChange = (value) => {
    this.props.setTempPostcode(value)
  }

  handleAddressChange = (addressId) => {
    const address = this.props.addresses.filter(addr => addr.get('id') === addressId).first()
    const postcode = address.get('postcode')
    this.props.basketChosenAddressChange(address)
    this.handleChange(postcode)
  }

  handleClick = (e) => {
    if (e) {
      e.preventDefault()
    }
    this.props.boxSummaryNext()
  }

  addressesToOptions = () => (
    this.props.addresses.map(address => ({
      label: `${address.get('name')}, ${address.get('postcode')}`,
      value: address.get('id'),
    })).toArray()
  )

  savedAddresses = () => (
    <span>
      <div className={css.row}>
        <p className={this.props.deliveryDaysError ? css.errorText : css.supportingText}>
          {this.props.deliveryDaysError ? 'There has been an error changing to that postcode, please try again or contact customer care' : 'Select delivery address:'}
        </p>
        <DropdownInput
          color="secondary"
          uppercase
          options={this.addressesToOptions()}
          onChange={this.handleAddressChange}
          value={this.props.chosenAddress ? this.props.chosenAddress.get('id') : ''}
        />
      </div>
      <div className={css.row}>
        <p className={css.supportingText}>Want to have your box delivered to a new address? Visit 'My Details > My Delivery Address'</p>
      </div>
    </span>
  )

  noSavedAddresses = () => {
    let errMsg

    if (this.props.deliveryDaysError) {
      if (this.props.deliveryDaysError === 'do-not-deliver') {
        errMsg = 'Sorry, it looks like we don\'t currently deliver to your area.'
      } else {
        errMsg = 'Please enter a valid postcode'
      }
    }

    return (
      <span>
        <div className={css.row}>
          <p className={this.props.deliveryDaysError ? css.errorText : css.supportingText}>
            {this.props.deliveryDaysError ? errMsg : 'Enter your Postcode:'}
          </p>
          <TextInput
            isFixed
            placeholder="Postcode"
            onChange={this.handleChange}
            color={this.props.deliveryDaysError ? 'primary' : 'secondary'}
            minLength={5}
            maxLength={8}
            className={css.textInput}
            value={this.props.tempPostcode}
            textAlign="center"
            autoFocus={this.props.isVisible && !isMobile(this.props.view)}
            data-testing="menuPostcodeInput"
          />
        </div>
        <div className={css.row}>
          <p className={css.supportingText}>Your postcode will help us figure out which delivery slots are available in your area</p>
        </div>
      </span>
    )
  }

  getIsDisabled = () => {
    const { tempPostcode, chosenAddress, addresses } = this.props
    if (addresses) {
      return !chosenAddress
    }

    return tempPostcode ? tempPostcode.trim().length < 5 : true
  }

  render = () => {
    const { shouldDisplayFullScreenBoxSummary,
      addresses, postcodePending,
      basketRestorePreviousValues, prevPostcode } = this.props
    const disabled = this.getIsDisabled()

    return (
      <LayoutContentWrapper>
        <Form onSubmit={this.handleClick}>
          <Heading center size="large" type="h2">Delivery Options</Heading>
          <div className={css.row}>
            <p className={css.leadingText}>We deliver for free up to 7 days a week depending on where you live</p>
          </div>
          {addresses ? this.savedAddresses() : this.noSavedAddresses()}
          <div className={shouldDisplayFullScreenBoxSummary && css.stickyButton}>
            <Button
              data-testing="menuSubmitPostcode"
              disabled={disabled}
              onClick={this.handleClick}
              pending={postcodePending}
              width="full"
            >
              {prevPostcode ? 'Show Delivery Slots' : 'Continue'}
            </Button>
          </div>
          {prevPostcode ? (
            <CancelButton basketRestorePreviousValues={basketRestorePreviousValues} />
          ) : null}
        </Form>
      </LayoutContentWrapper>
    )
  }
}

export default Postcode
