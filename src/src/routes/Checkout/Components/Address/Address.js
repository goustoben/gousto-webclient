import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import { Button } from 'goustouicomponents'
import { fetchDeliveryDays } from 'apis/deliveries'
import * as deliveryUtils from 'utils/deliveries'
import logger from 'utils/logger'
import dottify from 'utils/dottify'
import DeliveryInfo from './DeliveryInfo'
import Postcode from './Postcode'
import AddressInputs from './AddressInputs'
import css from './Address.css'
import {getDeliveryTariffId} from "../../../../utils/deliveries";
import {getNDDFeatureValue} from "../../../../selectors/features";

class Address extends React.PureComponent {
  static propTypes = {
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    formErrors: PropTypes.object,
    formValues: PropTypes.object,
    formFields: PropTypes.object,
    change: PropTypes.func,
    touch: PropTypes.func,
    untouch: PropTypes.func,
    addressesPending: PropTypes.bool,
    initialPostcode: PropTypes.string,
    isDelivery: PropTypes.bool,
    deliveryDate: PropTypes.string,
    cutOffDate: PropTypes.string,
    menuCutoffUntil: PropTypes.string,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
    registerField: PropTypes.func,
    checkoutAddressLookup: PropTypes.func,
    onAddressConfirm: PropTypes.func,
    trackCheckoutButtonPressed: PropTypes.func,
    isNDDExperiment: PropTypes.bool,
    isMobile: PropTypes.bool,
  }
  static defaultProps = {
    formName: 'address',
    sectionName: 'delivery',
    formErrors: {},
    formValues: {},
    formFields: {},
    isNDDExperiment: false,

    change: () => { },
    touch: () => { },
    untouch: () => { },

    addressesPending: false,
    initialPostcode: '',
    isDelivery: true,
    receiveRef: () => { },
    scrollToFirstMatchingRef: () => { },
  }

  componentWillMount() {
    const { initialPostcode, sectionName, formName, change, touch } = this.props
    // use initial postcode
    if (initialPostcode) {
      change(formName, `${sectionName}.postcodeTemp`, initialPostcode)
      touch(formName, `${sectionName}.postcodeTemp`)
      this.getAddresses(initialPostcode)
    }
  }

  getFormValue = inputName => {
    const { formValues, sectionName } = this.props

    return (formValues
      && formValues[sectionName]
      && formValues[sectionName][inputName]) ? formValues[sectionName][inputName] : undefined
  }

  componentDidMount() {
    const { formName, sectionName, registerField } = this.props

    registerField(formName, `${sectionName}.addresses`, 'Field')
    registerField(formName, `${sectionName}.addressesFetched`, 'Field')
    registerField(formName, `${sectionName}.deliverable`, 'Field')
    registerField(formName, `${sectionName}.confirmed`, 'Field')
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

    if (deliveryDate) {
      try {
        const menuCutoffUntilFallback = moment().startOf('day').add(30, 'days')
          .toISOString()
        const reqData = {
          postcode,
          'filters[cutoff_datetime_from]': moment().startOf('day').toISOString(),
          'filters[cutoff_datetime_until]': menuCutoffUntil || menuCutoffUntilFallback,
          'ndd': isNDDExperiment.toString(),
          'delivery_tariff_id': deliveryTariffId,
        }

        let { data: days } = await fetchDeliveryDays(null, reqData)

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
    const checks = [this.props.checkoutAddressLookup(postcode)]
    if (this.props.isDelivery) {
      checks.push(this.checkCanDeliver(postcode))
    }

    return await Promise.all(checks)
  }

  forceReValidation = () => {
    const { formName, sectionName, change } = this.props

    let submitCount = this.getFormValue('submitCount') || 1
    change(formName, `${sectionName}.submitCount`, ++submitCount)
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
      const matchingDeliveryPoint = this.state.addressData.deliveryPoints.find(deliveryPoint => (
        deliveryPoint.udprn === addressId
      ))

      addressDetails = {
        line1: matchingDeliveryPoint.line1,
        line2: matchingDeliveryPoint.line2,
        town: this.state.addressData.town,
        county: this.state.addressData.county,
        postcode: this.state.addressData.postcode,
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
    const { formName, sectionName, formErrors, change, touch, onAddressConfirm, trackCheckoutButtonPressed, isMobile } = this.props

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
      isMobile && trackCheckoutButtonPressed('DeliveryAddress Confirmed', { succeeded: true, missing_field: null })
    } else {
      const sectionErrors = {
        [sectionName]: errors,
      }
      this.props.scrollToFirstMatchingRef([dottify(sectionErrors)])
      isMobile && trackCheckoutButtonPressed('DeliveryAddress Confirmed', { succeeded: false, missing_field: Object.keys(errors) })
    }
  }

  /**
   * Render address inputs
   * @param selectedAddress
   */
  renderAddressInputs = () => (
    <div>
      <AddressInputs
        receiveRef={this.props.receiveRef}
        sectionName={this.props.sectionName}
      />
    </div>
  )

  render() {
    const { isDelivery, deliveryDate, cutOffDate, isMobile, trackCheckoutButtonPressed } = this.props
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
        {this.props.isDelivery &&
          <DeliveryInfo
            deliveryDate={deliveryDate}
            cutOffDate={cutOffDate}
          />
        }
        <Postcode
          postcodePending={this.props.addressesPending}
          onPostcodeLookup={this.getAddresses}
          postcodeTemp={postcodeTemp}
          addresses={addresses}
          onSelectedAddressChange={this.handleSelectedAddressChange}
          showDropdown={showDropdown}
          receiveRef={this.props.receiveRef}
          trackClick={trackCheckoutButtonPressed}
          isMobile={isMobile}
        />

        {showDropdown && addresses.length > 1 && !isAddressSelected && <p><span data-testing="addressNotFound" onClick={this.handleCantFind} className={css.linkBase}>Can’t find your address?</span></p>}
        {isAddressSelected && this.renderAddressInputs()}
        <br />
        {this.props.isDelivery &&
          <Button
            data-testing="checkoutSelectAddressCTA"
            disabled={false}
            onClick={this.handleAddressConfirm}
            pending={this.props.addressesPending}
            width="full"
          >
            Use This Address
          </Button>
        }
      </div>
    )
  }
}

export default Address
