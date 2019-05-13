import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Button } from 'goustouicomponents'
import Input from 'Form/Input'
import Dropdown from 'Form/Dropdown'
import actions from 'actions/user.js'
import configCheckout from 'config/checkout'
import Immutable from 'immutable'/* eslint-disable new-cap */
import classNames from 'classnames'
import Content from 'containers/Content'
import config from './NewAddressFormErrorsConfig.js'
import css from './NewAddressForm.css'

const LEAVE_BOX_OPTIONS = configCheckout.leaveBoxOptions.map(option => ({ value: option, label: option }))

class NewAddressForm extends React.PureComponent {

  static propTypes = {
    close: PropTypes.func,
    addresses: PropTypes.instanceOf(Immutable.List),
    fullAddress: PropTypes.instanceOf(Immutable.Map),
    isPosting: PropTypes.bool,
    isFetchingAddresses: PropTypes.bool,
    modalOrderId: PropTypes.string,
    addressesFetchError: PropTypes.string,
    addressFetchError: PropTypes.string,
    fullAddressId: PropTypes.string,
    newAddressPostError: PropTypes.string,
  }

  static defaultProps = {
    isPosting: false,
    addresses: Immutable.List([]),
    fullAddress: Immutable.Map({}),
    isFetchingAddresses: false,
    modalOrderId: '',
    addressesFetchError: null,
    addressFetchError: null,
    fullAddressId: '1',
    newAddressPostError: null,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      addressName: null,
      addressPostcode: null,
      selectedAddress: 1,
      selectedSafePlace: 'Front Porch',
      safePlaceOther: null,
      emptyResponse: false,
    }
  }

  handleInputChange(label, value) {
    // FIXME: this functionality has been broken by https://gousto.atlassian.net/browse/TECH-7254
    if (label === 'selectedAddress') {
      this.context.store.dispatch(actions.modalAddressLookupById(value))
    }

    return this.setState({ [label]: value })
  }

  handleLookItUp(postcode) {
    // FIXME: this functionality has been broken by https://gousto.atlassian.net/browse/TECH-7254
    this.context.store.dispatch(actions.modalAddressLookup(postcode))
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleLookItUp(this.state.addressPostcode)
    }
  }

  handleSubmit(state) {
    const reqData = {
      name: state.addressName,
      type: 'shipping',
      line1: this.props.fullAddress.line1,
      line2: this.props.fullAddress.line2,
      line3: this.props.fullAddress.line3,
      town: this.props.fullAddress.locality,
      postcode: state.addressPostcode,
      delivery_instructions: state.selectedSafePlace === 'Other' ? this.state.safePlaceOther : this.state.selectedSafePlace,
    }
    this.context.store.dispatch(actions.userAddNewAddress(reqData, this.props.modalOrderId))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchingAddresses) {
      this.setState({ emptyResponse: nextProps.addresses.size === 0 })
    }
  }

  render() {
    const addressesLoaded = this.props.addresses.size > 1
    let formattedAddresses = Immutable.List()
    if (addressesLoaded) {
      formattedAddresses = this.props.addresses.map(address => ({
        value: address.get('id'),
        label: [...address.get('labels')].reverse().join(', '),
      }))
    }
    const placeholder = Immutable.List([{ label: 'Please select your address', value: '1' }])
    const finalAddresses = placeholder.concat(formattedAddresses)

    const canSubmit = this.state.addressName && this.state.addressPostcode && this.props.fullAddressId !== '1'

    return (
      <div>
        <div className={css.formSection}>
          <p className={css.inputTitle}>Address name</p>
          <Input
            className={css.input}
            name="addressName"
            type="text"
            onChange={(e) => this.handleInputChange('addressName', e)}
          />
        </div>
        <div className={css.formSection}>
          <p className={css.inputTitle}>Postcode</p>
          <div className={css.row}>
            <Input
              className={css.input}
              name="addressPostcode"
              type="text"
              onChange={(e) => this.handleInputChange('addressPostcode', e)}
              onKeyDown={(e) => this.handleKeyPress(e)}
            />
            <Button
              color="secondary"
              className={css.button}
              noDecoration
              onClick={() => { this.handleLookItUp(this.state.addressPostcode) }}
              disabled={false}
              pending={this.props.isFetchingAddresses}
            >
              Look it up
            </Button>
          </div>
        </div>
        {this.state.emptyResponse || this.props.addressesFetchError ?
          <div>
            <Alert type="danger">
              {this.state.emptyResponse && !this.props.addressesFetchError ?
                <Content contentKeys="mydeliveriesOrderNewaddressformCcaddressempty" >
                  <span>{config.errorMessages.CCAddressesEmpty}</span>
                </Content>
                : <Content contentKeys="mydeliveriesOrderNewaddressformCcerror" >
                  <span>{config.errorMessages.CCerror}</span>
           </Content>
              }
            </Alert>
          </div>
          : null}
        <div className={classNames(css.sliderSection, { [css.closed]: !addressesLoaded })}>
          <div className={css.formSection}>
            <p className={css.inputTitle}>Address details</p>
            <Dropdown
              name="selectedAddress"
              options={finalAddresses.toArray()}
              value={this.props.fullAddressId}
              onChange={(e) => this.handleInputChange('selectedAddress', e)}
              onBlur={() => {}}
            />
          </div>
        </div>
        {this.props.addressFetchError ?
          <div>
            <Alert type="danger">
              <Content contentKeys="mydeliveriesOrderNewaddressformCcaddressempty" >
                <span>{config.errorMessages.CCAddressEmpty}</span>
              </Content>
            </Alert>
          </div>
          : null}
        <div className={css.formSection}>
          <p className={css.inputTitle}>Safe place</p>
          <p>If you are not in, where should we leave your box?</p>
          <Dropdown
            name="selectedSafePlace"
            options={LEAVE_BOX_OPTIONS}
            value={this.state.selectedSafePlace}
            onChange={(e) => this.handleInputChange('selectedSafePlace', e)}
            onBlur={() => {}}
          />
        </div>
        <div className={classNames(css.sliderSection, { [css.closed]: this.state.selectedSafePlace !== 'Other' })}>
          <div className={css.formSection}>
            <p className={css.inputTitle}>Where do you want us to leave your box?</p>
            <Input
              className={css.fullInput}
              name="safePlaceOther"
              type="text"
              onChange={(e) => this.handleInputChange('safePlaceOther', e)}
            />
          </div>
        </div>
        <div className={css.row}>
          <Button
            color="negative"
            className={`${css.button} ${css.buttonFirst}`}
            noDecoration
            onClick={this.props.close}
            disabled={false}
            pending={false}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={css.button}
            noDecoration
            onClick={() => { this.handleSubmit(this.state) }}
            disabled={!canSubmit}
            pending={this.props.isPosting}
          >
            Save
          </Button>
        </div>
        {this.props.newAddressPostError ?
          <div>
            <Alert type="danger">
              <Content contentKeys="mydeliveriesOrderNewaddressformPosterror" >
                <span>{config.errorMessages.PostError}</span>
              </Content>
            </Alert>
          </div>
          : null}
      </div>
    )
  }
}

export default NewAddressForm
