import PropTypes from 'prop-types'
import React from 'react'
import Form from 'Form'
import TextInput from 'Form/Input'
import { Button, Heading, LayoutContentWrapper } from 'goustouicomponents'
import DropdownInput from 'Form/Dropdown'
import { CancelButton } from '../CancelButton'
import css from './Postcode.css'

class Postcode extends React.PureComponent {
  static propTypes = {
    deliveryDaysError: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    postcodePending: PropTypes.bool,
    prevPostcode: PropTypes.string,
    addresses: PropTypes.object,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    chosenAddress: PropTypes.object,
    basketChosenAddressChange: PropTypes.func.isRequired,
    tempPostcode: PropTypes.string,
    setTempPostcode: PropTypes.func,
    boxSummaryNext: PropTypes.func,
    shouldDisplayFullScreenBoxSummary: PropTypes.bool,
  }

  handleChange = (value) => {
    const { setTempPostcode } = this.props
    setTempPostcode(value)
  }

  handleAddressChange = (addressId) => {
    const { addresses, basketChosenAddressChange } = this.props
    const address = addresses.filter(addr => addr.get('id') === addressId).first()
    const postcode = address.get('postcode')
    basketChosenAddressChange(address)
    this.handleChange(postcode)
  }

  handleClick = (e) => {
    const { boxSummaryNext } = this.props
    if (e) {
      e.preventDefault()
    }
    boxSummaryNext()
  }

  addressesToOptions = () => (
    this.props.addresses.map(address => ({
      label: `${address.get('name')}, ${address.get('postcode')}`,
      value: address.get('id'),
    })).toArray()
  )

  savedAddresses = () => {
    const { deliveryDaysError, chosenAddress } = this.props
    const addressOption = chosenAddress ? chosenAddress.get('id') : ''

    return (
      <span>
        <div className={css.row}>
          <p className={deliveryDaysError ? css.errorText : css.supportingText}>
            {deliveryDaysError ? 'There has been an error changing to that postcode, please try again or contact customer care' : 'Select delivery address:'}
          </p>
          <DropdownInput
            color="secondary"
            uppercase
            options={this.addressesToOptions()}
            onChange={this.handleAddressChange}
            value={addressOption}
          />
        </div>
        <div className={css.row}>
          <p className={css.supportingText}>Want to have your box delivered to a new address? Visit 'My Details > My Delivery Address'</p>
        </div>
      </span>
    )
  }

  noSavedAddresses = () => {
    const { deliveryDaysError, tempPostcode } = this.props
    const buttonColor = deliveryDaysError ? 'primary' : 'secondary'
    const messageClass = deliveryDaysError ? css.errorText : css.supportingText
    let errMsg

    if (deliveryDaysError) {
      if (deliveryDaysError === 'do-not-deliver') {
        errMsg = 'Sorry, it looks like we don\'t currently deliver to your area.'
      } else {
        errMsg = 'Please enter a valid postcode'
      }
    }

    return (
      <span>
        <div className={css.row}>
          <p className={messageClass}>
            {deliveryDaysError ? errMsg : 'Enter your Postcode:'}
          </p>
          <TextInput
            isFixed
            placeholder="Postcode"
            onChange={this.handleChange}
            color={buttonColor}
            minLength={5}
            maxLength={8}
            className={css.textInput}
            value={tempPostcode}
            textAlign="center"
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
          <CancelButton basketRestorePreviousValues={basketRestorePreviousValues} shouldShow={!!prevPostcode} />
        </Form>
      </LayoutContentWrapper>
    )
  }
}

export default Postcode
