import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import { Button } from 'goustouicomponents'
import * as deliveryUtils from 'utils/deliveries'
import logger from 'utils/logger'
import dottify from 'utils/dottify'
import { fetchDeliveryDays } from 'apis/deliveries'
import Postcode from './Postcode'
import AddressInputs from './AddressInputs'
import css from './Address.css'

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
  trackUTMAndPromoCode: PropTypes.func
}

const defaultProps = {
  formName: 'address',
  sectionName: 'delivery',
  formErrors: {},
  formValues: {},
  isNDDExperiment: false,

  change: () => { },
  touch: () => { },
  untouch: () => { },

  addressesPending: false,
  initialPostcode: '',
  isDelivery: true,
  receiveRef: () => { },
  scrollToFirstMatchingRef: () => { },
  trackUTMAndPromoCode: () => { },
  registerField: () => { },
  checkoutAddressLookup: () => { },
  onAddressConfirm: () => { },
  trackCheckoutButtonPressed: () => { },
  isMobile: false,
  deliveryTariffId: '',
  deliveryDate: '',
  menuCutoffUntil: '',
}

class Address extends React.PureComponent {
  componentWillMount() {
    const { initialPostcode, sectionName, formName, change, touch } = this.props
    // use initial postcode
    if (initialPostcode) {
      change(formName, `${sectionName}.postcodeTemp`, initialPostcode)
      touch(formName, `${sectionName}.postcodeTemp`)
      this.getAddresses(initialPostcode)
    }
  }

  componentDidMount() {
    const { formName, sectionName, registerField } = this.props

    registerField(formName, `${sectionName}.addresses`, 'Field')
    registerField(formName, `${sectionName}.addressesFetched`, 'Field')
    registerField(formName, `${sectionName}.deliverable`, 'Field')
    registerField(formName, `${sectionName}.confirmed`, 'Field')
  }

  getFormValue = inputName => {
    const { formValues, sectionName } = this.props

    return (formValues
      && formValues[sectionName]
      && formValues[sectionName][inputName]) ? formValues[sectionName][inputName] : undefined
  }

  saveAddresses = async (results) => {
    function generateAddressLabel(deliveryPoint) {
      const addressParts = [
        deliveryPoint.organisationName,
        deliveryPoint.departmentName,
        deliveryPoint.line1,
        deliveryPoint.line2,
      ]

      return addressParts.filter(part => !!part).join(', ')
    }

    function generateDropdownOptions(addressData) {
      const addresses = addressData.deliveryPoints.map(deliveryPoint => (
        { id: deliveryPoint.udprn, labels: [generateAddressLabel(deliveryPoint)] }
      ))

      if (addresses.length > 1) {
        addresses.unshift({ id: 'placeholder', count: 1, labels: ['— Please select your address —'] })
      } else {
        addresses.unshift({ id: 'placeholder', count: 1, labels: ['— No addresses found —'] })
      }

      return addresses
    }

    const { formName, sectionName, touch, change } = this.props
    const [addressData, deliverable] = results // eslint-disable-line no-unused-vars

    this.setState({
      addressData,
    })

    change(formName, `${sectionName}.deliverable`, deliverable)
    change(formName, `${sectionName}.addresses`, generateDropdownOptions(addressData))
    touch(formName, `${sectionName}.addresses`)
  }

  checkCanDeliver = async postcode => {
    const { deliveryDate, menuCutoffUntil, isNDDExperiment, deliveryTariffId } = this.props
    let deliverable = false

    const menuCutoffUntilFallback = moment()
      .startOf('day')
      .add(30, 'days')
      .toISOString()

    if (deliveryDate) {
      try {
        const cutOfFrom = moment().startOf('day').toISOString()
        const cutOfUntil = menuCutoffUntil || menuCutoffUntilFallback
        let { data: days } = await fetchDeliveryDays(null, cutOfFrom, cutOfUntil, isNDDExperiment, deliveryTariffId, postcode)

        if (isNDDExperiment) {
          days = deliveryUtils.transformDaySlotLeadTimesToMockSlots(days)
        }

        const availableDeliveryDays = deliveryUtils.getAvailableDeliveryDays(days)

        if (availableDeliveryDays && availableDeliveryDays[deliveryDate] && !availableDeliveryDays[deliveryDate].alternateDeliveryDay) {
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

  loadAddresses = async postcode => {
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
    change(formName, `${sectionName}.submitCount`, submitCount += 1)
  }

  getAddresses = async postcode => {
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
      const { addressData: { deliveryPoints, town, county, postcode } } = this.state

      const matchingDeliveryPoint = deliveryPoints.find(deliveryPoint => (
        deliveryPoint.udprn === addressId
      ))

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

  handleCantFind = () => {
    const { formName, sectionName, change } = this.props
    const postcode = this.getFormValue('postcodeTemp')

    this.handleSelectedAddressChange()
    change(formName, `${sectionName}.notFound`, true)
    change(formName, `${sectionName}.postcode`, postcode)
  }

  handleAddressConfirm = () => {
    const { formName, sectionName, formErrors, change, touch, onAddressConfirm, trackCheckoutButtonPressed, isMobile, trackUTMAndPromoCode } = this.props

    this.forceReValidation()

    touch(formName, `${sectionName}.addressId`)
    touch(formName, `${sectionName}.houseNo`)
    touch(formName, `${sectionName}.street`)
    touch(formName, `${sectionName}.town`)
    touch(formName, `${sectionName}.county`)
    touch(formName, `${sectionName}.postcode`)

    const errors = formErrors[sectionName] || {}
    const error = (errors.postcode || errors.houseNo || errors.street || errors.town || errors.county)

    if (!error) {
      const postcode = this.getFormValue('postcode')
      change(formName, `${sectionName}.postcodeTemp`, postcode)
      change(formName, `${sectionName}.confirmed`, true)

      if (onAddressConfirm) {
        onAddressConfirm(postcode)
      }

      trackUTMAndPromoCode('clickUseThisAddress')

      if (isMobile) {
        trackCheckoutButtonPressed('DeliveryAddress Confirmed', { succeeded: true, missing_field: null })
      }
    } else {
      const { scrollToFirstMatchingRef } = this.props
      const sectionErrors = {
        [sectionName]: errors,
      }
      scrollToFirstMatchingRef([dottify(sectionErrors)])

      if (isMobile) {
        trackCheckoutButtonPressed('DeliveryAddress Confirmed', { succeeded: false, missing_field: Object.keys(errors) })
      }
    }
  }

  /**
   * Render address inputs
   * @param selectedAddress
   */
  renderAddressInputs = () => {
    const { receiveRef, sectionName } = this.props

    return (
      <div>
        <AddressInputs
          receiveRef={receiveRef}
          sectionName={sectionName}
        />
      </div>
    )
  }

  render() {
    const { isDelivery, isMobile, trackCheckoutButtonPressed, addressesPending, receiveRef } = this.props
    const addresses = this.getFormValue('addresses') || []
    const postcodeTemp = this.getFormValue('postcodeTemp')
    const addressId = this.getFormValue('addressId')
    const notFound = this.getFormValue('notFound')
    const addressesFetched = this.getFormValue('addressesFetched')
    const deliverable = this.getFormValue('deliverable')
    const showDropdown = addressesFetched && ((deliverable && isDelivery) || !isDelivery)
    const isAddressSelected = addressId && (addressId !== 'placeholder' || notFound)

    return (
      <div>
        <Postcode
          postcodePending={addressesPending}
          onPostcodeLookup={this.getAddresses}
          postcodeTemp={postcodeTemp}
          addresses={addresses}
          onSelectedAddressChange={this.handleSelectedAddressChange}
          showDropdown={showDropdown}
          receiveRef={receiveRef}
          trackClick={trackCheckoutButtonPressed}
          isMobile={isMobile}
        />

        {showDropdown && addresses.length > 1 && !isAddressSelected && <p><span data-testing="addressNotFound" onClick={this.handleCantFind} className={css.linkBase}>Can’t find your address?</span></p>}
        {isAddressSelected && this.renderAddressInputs()}
        <br />
        {isDelivery && (
          <Button
            data-testing="checkoutSelectAddressCTA"
            disabled={false}
            onClick={this.handleAddressConfirm}
            pending={addressesPending}
            width="full"
          >
            Use This Address
          </Button>
        )}
      </div>
    )
  }
}

Address.propTypes = propTypes

Address.defaultProps = defaultProps

export default Address
