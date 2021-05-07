import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import moment from 'moment'
import * as deliveryUtils from 'utils/deliveries'
import logger from 'utils/logger'
import dottify from 'utils/dottify'
import { showAddress } from 'routes/Checkout/utils/delivery'
import { fetchDeliveryDays } from 'apis/deliveries'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
import { DeliveryPhoneNumber } from '../Delivery/DeliveryPhoneNumber'
import { DeliveryInstruction } from '../Delivery/DeliveryInstruction'
import { DeliveryEducationBanner } from '../Delivery/DeliveryEducationBanner'
import { AddressOverhaul } from './AddressOverhaul/AddressOverhaul'
import { CheckoutButton } from '../CheckoutButton'

const propTypes = {
  formName: PropTypes.string,
  sectionName: PropTypes.string,
  formErrors: PropTypes.shape({}),
  formValues: PropTypes.shape({}),
  change: PropTypes.func,
  touch: PropTypes.func,
  untouch: PropTypes.func,
  addressesPending: PropTypes.bool,
  initialPostcode: PropTypes.string,
  deliveryTariffId: PropTypes.string,
  isDelivery: PropTypes.bool,
  deliveryDate: PropTypes.string,
  menuCutoffUntil: PropTypes.string,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  registerField: PropTypes.func,
  checkoutAddressLookup: PropTypes.func,
  onAddressConfirm: PropTypes.func,
  trackCheckoutButtonPressed: PropTypes.func,
  isNDDExperiment: PropTypes.bool,
  isMobile: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  submit: PropTypes.func,
  userProspect: PropTypes.func,
}

const defaultProps = {
  formName: 'address',
  sectionName: 'delivery',
  formErrors: {},
  formValues: {},
  isNDDExperiment: false,
  change: () => {},
  touch: () => {},
  untouch: () => {},
  addressesPending: false,
  initialPostcode: '',
  isDelivery: true,
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
  trackUTMAndPromoCode: () => {},
  registerField: () => {},
  checkoutAddressLookup: () => {},
  onAddressConfirm: () => {},
  trackCheckoutButtonPressed: () => {},
  isMobile: false,
  deliveryTariffId: '',
  deliveryDate: '',
  menuCutoffUntil: '',
  submit: () => {},
  userProspect: () => {},
}

export class Address extends React.PureComponent {
  componentDidMount() {
    const { initialPostcode, sectionName, formName, change, touch, registerField } = this.props

    const addresses = this.getFormValue('allAddresses') || []
    // use initial postcode
    if (initialPostcode && addresses.length === 0) {
      change(formName, `${sectionName}.postcodeTemp`, initialPostcode)
      touch(formName, `${sectionName}.postcodeTemp`)
      this.getAddresses(initialPostcode)
    }

    registerField(formName, `${sectionName}.addresses`, 'Field')
    registerField(formName, `${sectionName}.addressesFetched`, 'Field')
    registerField(formName, `${sectionName}.deliverable`, 'Field')
    registerField(formName, `${sectionName}.confirmed`, 'Field')
  }

  getAddressObjectFromForm() {
    const { formValues, sectionName } = this.props

    return formValues && formValues[sectionName] ? formValues[sectionName] : null
  }

  getFormValue = (inputName) => {
    const { formValues, sectionName } = this.props

    return formValues && formValues[sectionName] && formValues[sectionName][inputName]
      ? formValues[sectionName][inputName]
      : undefined
  }

  generateAddressLabel = (deliveryPoint) => {
    const addressParts = [
      deliveryPoint.organisationName,
      deliveryPoint.departmentName,
      deliveryPoint.line1,
      deliveryPoint.line2,
    ]

    return addressParts.filter((part) => !!part).join(', ')
  }

  generateDropdownOptions = (addressData) => {
    const addresses = addressData.deliveryPoints.map((deliveryPoint) => ({
      id: deliveryPoint.udprn,
      labels: [this.generateAddressLabel(deliveryPoint)],
    }))

    if (addresses.length > 1) {
      addresses.unshift({ id: 'placeholder', count: 1, labels: ['— Please select your address —'] })
    } else {
      addresses.unshift({ id: 'placeholder', count: 1, labels: ['— No addresses found —'] })
    }

    return addresses
  }

  saveAddresses = async (results) => {
    const { formName, sectionName, touch, change, registerField } = this.props
    const [addressData, deliverable] = results // eslint-disable-line no-unused-vars

    this.setState({ addressData })

    registerField(formName, `${sectionName}.allAddresses`, 'Field')
    change(formName, `${sectionName}.allAddresses`, addressData)
    change(formName, `${sectionName}.deliverable`, deliverable)
    change(formName, `${sectionName}.addresses`, this.generateDropdownOptions(addressData))
    touch(formName, `${sectionName}.addresses`)
  }

  checkCanDeliver = async (postcode) => {
    const { deliveryDate, menuCutoffUntil, isNDDExperiment, deliveryTariffId } = this.props
    let deliverable = false

    const menuCutoffUntilFallback = moment().startOf('day').add(30, 'days').toISOString()

    if (deliveryDate) {
      try {
        const cutOfFrom = moment().startOf('day').toISOString()
        const cutOfUntil = menuCutoffUntil || menuCutoffUntilFallback
        let { data: days } = await fetchDeliveryDays(
          null,
          cutOfFrom,
          cutOfUntil,
          isNDDExperiment,
          deliveryTariffId,
          postcode
        )

        if (isNDDExperiment) {
          days = deliveryUtils.transformDaySlotLeadTimesToMockSlots(days)
        }

        const availableDeliveryDays = deliveryUtils.getAvailableDeliveryDays(days)

        if (
          availableDeliveryDays &&
          availableDeliveryDays[deliveryDate] &&
          !availableDeliveryDays[deliveryDate].alternateDeliveryDay
        ) {
          deliverable = true
        }
      } catch (error) {
        logger.error(error)
        // deliverable = false
      }
    } else {
      deliverable = true
    }

    return deliverable
  }

  loadAddresses = async (postcode) => {
    const { checkoutAddressLookup, isDelivery } = this.props

    const checks = [checkoutAddressLookup(postcode)]
    if (isDelivery) {
      checks.push(this.checkCanDeliver(postcode))
    }

    return Promise.all(checks)
  }

  forceReValidation = () => {
    const { formName, sectionName, change } = this.props

    let submitCount = this.getFormValue('submitCount') || 1
    change(formName, `${sectionName}.submitCount`, (submitCount += 1))
  }

  getAddresses = async (postcode) => {
    const { formName, sectionName, change, untouch } = this.props
    const placeholder = [{ id: 'placeholder', count: 1, labels: ['— Loading addresses… —'] }]

    change(formName, `${sectionName}.addresses`, placeholder)
    change(formName, `${sectionName}.addressId`, 'placeholder')
    change(formName, `${sectionName}.addressesFetched`, false)
    change(formName, `${sectionName}.deliverable`, false)
    untouch(formName, `${sectionName}.addressId`)

    this.saveAddresses(await this.loadAddresses(postcode))

    // reset to placeholder
    this.handleSelectedAddressChange({}, 'placeholder')

    change(formName, `${sectionName}.addressesFetched`, true)
    this.forceReValidation()
  }

  handleSelectedAddressChange = async (_, addressId) => {
    const { formName, sectionName, change, untouch } = this.props

    let addressDetails

    untouch(formName, `${sectionName}.houseNo`)
    untouch(formName, `${sectionName}.street`)
    untouch(formName, `${sectionName}.town`)
    untouch(formName, `${sectionName}.county`)
    untouch(formName, `${sectionName}.postcode`)

    if (!addressId || addressId === 'placeholder') {
      addressDetails = { line1: '', line2: '', town: '', county: '', postcode: '' }
      change(formName, `${sectionName}.notFound`, false)
    } else {
      const addresses = this.getFormValue('allAddresses')
      // eslint-disable-next-line react/destructuring-assignment
      const addressData = !this.state ? addresses : this.state.addressData
      const { deliveryPoints, town, county, postcode } = addressData
      const matchingDeliveryPoint = deliveryPoints.find(
        (deliveryPoint) => deliveryPoint.udprn === addressId
      )

      addressDetails = {
        line1: matchingDeliveryPoint.line1,
        line2: matchingDeliveryPoint.line2,
        town,
        county,
        postcode,
      }
    }

    if (typeof addressDetails === 'object') {
      change(formName, `${sectionName}.houseNo`, addressDetails.line1)
      change(formName, `${sectionName}.street`, addressDetails.line2)
      change(formName, `${sectionName}.town`, addressDetails.town)
      change(formName, `${sectionName}.county`, addressDetails.county)
      change(formName, `${sectionName}.postcode`, addressDetails.postcode)
    }
  }

  handleEnterAddressManually = () => {
    const { formName, sectionName, change } = this.props
    const postcode = this.getFormValue('postcodeTemp')

    change(formName, `${sectionName}.notFound`, true)
    change(formName, `${sectionName}.postcode`, postcode)
    change(formName, `${sectionName}.addressId`, 'placeholder')
  }

  validateFields = () => {
    const { sectionName, formErrors } = this.props
    const errors = formErrors[sectionName] || {}

    return (
      errors.firstName ||
      errors.lastName ||
      errors.postcode ||
      errors.houseNo ||
      errors.street ||
      errors.town ||
      errors.phone ||
      errors.deliveryInstruction ||
      errors.deliveryInstructionsCustom
    )
  }

  handleAddressConfirm = () => {
    const {
      formName,
      sectionName,
      formErrors,
      change,
      touch,
      onAddressConfirm,
      trackCheckoutButtonPressed,
      isMobile,
      trackUTMAndPromoCode,
      submit,
      userProspect,
    } = this.props

    this.forceReValidation()

    touch(formName, `${sectionName}.addressId`)
    touch(formName, `${sectionName}.houseNo`)
    touch(formName, `${sectionName}.street`)
    touch(formName, `${sectionName}.town`)
    touch(formName, `${sectionName}.county`)
    touch(formName, `${sectionName}.postcode`)

    const errors = formErrors[sectionName] || {}
    const error = this.validateFields()

    if (!error) {
      const postcode = this.getFormValue('postcode')
      change(formName, `${sectionName}.postcodeTemp`, postcode)
      change(formName, `${sectionName}.confirmed`, true)

      if (onAddressConfirm) {
        onAddressConfirm(postcode)
      }

      trackUTMAndPromoCode(checkoutClickContinueToPayment)

      if (isMobile) {
        trackCheckoutButtonPressed('DeliveryAddress Confirmed', {
          succeeded: true,
          missing_field: null,
        })
      }

      userProspect()
      submit()
    } else {
      const { scrollToFirstMatchingRef } = this.props
      const sectionErrors = {
        [sectionName]: errors,
      }
      scrollToFirstMatchingRef([dottify(sectionErrors)])

      if (isMobile) {
        trackCheckoutButtonPressed('DeliveryAddress Confirmed', {
          succeeded: false,
          missing_field: Object.keys(errors),
        })
      }
    }
  }

  reset = (field, value = '') => {
    const { change, formName, sectionName, untouch } = this.props
    const fieldName = `${sectionName}.${field}`

    untouch(formName, fieldName)
    change(formName, fieldName, value)
  }

  getAddressProps = () => {
    const { isDelivery } = this.props
    const addresses = this.getFormValue('addresses') || []
    const postcodeTemp = this.getFormValue('postcodeTemp')
    const addressId = this.getFormValue('addressId')
    const notFound = this.getFormValue('notFound')
    const addressesFetched = this.getFormValue('addressesFetched')
    const deliverable = this.getFormValue('deliverable')
    const showDropdown = addressesFetched && ((deliverable && isDelivery) || !isDelivery)
    const isAddressSelected = addressId && (addressId !== 'placeholder' || notFound)
    const deliveryInstructions = this.getFormValue('deliveryInstruction')

    return {
      addresses,
      postcodeTemp,
      addressId,
      notFound,
      addressesFetched,
      showDropdown,
      isAddressSelected,
      deliveryInstructions,
    }
  }

  render() {
    const { isMobile, addressesPending, receiveRef, sectionName, isDelivery } = this.props
    const {
      addresses,
      postcodeTemp,
      notFound,
      isAddressSelected,
      deliveryInstructions,
    } = this.getAddressProps()
    const isCTADisabled = this.validateFields()
    const currentSelectedAddress = showAddress(this.getAddressObjectFromForm())

    return (
      <Fragment>
        <AddressOverhaul
          onPostcodeLookup={this.getAddresses}
          postcodeTemp={postcodeTemp}
          addresses={addresses}
          onSelectedAddressChange={this.handleSelectedAddressChange}
          receiveRef={receiveRef}
          isMobile={isMobile}
          isAddressSelected={isAddressSelected}
          sectionName={sectionName}
          onEnterAddressManuallyClick={this.handleEnterAddressManually}
          currentAddress={currentSelectedAddress}
          isEditingManually={!!notFound}
        />

        {isDelivery && (
          <Fragment>
            <DeliveryPhoneNumber receiveRef={receiveRef} sectionName={sectionName} />
            <DeliveryInstruction
              value={deliveryInstructions}
              reset={this.reset}
              receiveRef={receiveRef}
              sectionName={sectionName}
              isMobile={isMobile}
            />
            <DeliveryEducationBanner />
            <CheckoutButton
              onClick={this.handleAddressConfirm}
              submitting={addressesPending}
              isDisabled={isCTADisabled}
              stepName="Continue to Payment"
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

Address.propTypes = propTypes

Address.defaultProps = defaultProps
