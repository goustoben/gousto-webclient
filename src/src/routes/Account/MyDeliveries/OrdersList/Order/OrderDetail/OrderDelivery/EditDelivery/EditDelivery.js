import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { Alert, Button } from 'goustouicomponents'
import userActions from 'actions/user'
import orderActions from 'actions/order'
import DropdownInput from 'Form/Dropdown'
import Content from 'containers/Content'
import Address from './Address/Address'
import util, { DEFAULT_MESSAGE_ID } from './util'
import css from './EditDelivery.css'

class EditDelivery extends React.PureComponent {
  static propTypes = {
    editDeliveryMode: PropTypes.bool,
    orderId: PropTypes.string,
    shippingAddressId: PropTypes.string,
    addresses: PropTypes.instanceOf(Immutable.Map),
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    recipes: PropTypes.instanceOf(Immutable.List),
    recipesStock: PropTypes.instanceOf(Immutable.List),
    portionsCount: PropTypes.number.isRequired,
    coreDeliveryDayId: PropTypes.string.isRequired,
    deliverySlotId: PropTypes.string.isRequired,
    orders: PropTypes.instanceOf(Immutable.Map),
    isPendingUpdateDayAndSlot: PropTypes.bool,
    isPendingUpdateAddress: PropTypes.bool,
    isErrorUpdateDayAndSlot: PropTypes.string,
    isErrorUpdateAddress: PropTypes.string,
  }

  static defaultProps = {
    editDeliveryMode: true,
    orderId: '',
    shippingAddressId: '',
    addresses: Immutable.Map({}),
    deliveryDays: Immutable.Map({}),
    recipes: Immutable.List([]),
    recipesStock: Immutable.List([]),
    orders: Immutable.Map({}),
    isPendingUpdateDayAndSlot: false,
    isPendingUpdateAddress: false,
    isErrorUpdateDayAndSlot: null,
    isErrorUpdateAddress: null,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedDeliveryDayId: this.props.coreDeliveryDayId,
      selectedDeliverySlotId: this.props.deliverySlotId,
      deliveryDaysOptions: [],
      slotsOptions: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    const isPending = this.props.isPendingUpdateDayAndSlot || this.props.isPendingUpdateAddress
    const willBePending = nextProps.isPendingUpdateDayAndSlot || nextProps.isPendingUpdateAddress
    const postError = this.props.isErrorUpdateDayAndSlot !== null || this.props.isErrorUpdateAddress !== null
    if (isPending && !willBePending && !postError) {
      this.context.store.dispatch(userActions.userOpenCloseEditSection(this.props.orderId, !this.props.editDeliveryMode))
    }
    if (this.props.deliveryDays !== nextProps.deliveryDays || this.props.recipesStock !== nextProps.recipesStock) {
      const { deliveryDaysOptions, slotsOptions } = this.constructDropdownOptions(nextProps)
      let { selectedDeliveryDayId, selectedDeliverySlotId } = this.state
      if (!deliveryDaysOptions.some(option => option.value === selectedDeliveryDayId)) {
        selectedDeliveryDayId = deliveryDaysOptions[0] ? deliveryDaysOptions[0].value : ''
      }
      if (!slotsOptions[selectedDeliveryDayId]
        || !slotsOptions[selectedDeliveryDayId].some(option => option.value === selectedDeliverySlotId)) {
        selectedDeliverySlotId = slotsOptions[selectedDeliveryDayId] && slotsOptions[selectedDeliveryDayId][0] ? slotsOptions[selectedDeliveryDayId][0].value : ''
      }
      this.setState({ deliveryDaysOptions, slotsOptions, selectedDeliveryDayId, selectedDeliverySlotId })
    }
  }

  handleSelectAddress(selectedAddressId) {
    this.context.store.dispatch(userActions.userPendingAddressFormData(selectedAddressId, this.props.orderId))
    const { availableFrom, availableTo, orderId } = this.props
    this.context.store.dispatch(orderActions.orderGetDeliveryDays(availableFrom, availableTo, selectedAddressId, orderId))
  }

  onCancelFunction() {
    this.context.store.dispatch(userActions.userOpenCloseEditSection(this.props.orderId, !this.props.editDeliveryMode))
    this.context.store.dispatch(userActions.userPendingAddressFormData(null, this.props.orderId))
  }

  onSubmitFunction(orderId, addressId, coreDayId, slotId) {
    if (this.state.selectedDeliverySlotId !== this.props.deliverySlotId) {
      const coreSlotId = this.state.slotsOptions[coreDayId].find(slot => slot.value === slotId).coreSlotId
      this.context.store.dispatch(orderActions.orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId))
    }
    if (this.props.formSelectedAddress !== null && this.props.formSelectedAddress !== this.props.shippingAddressId) {
      this.context.store.dispatch(orderActions.orderAddressChange(orderId, addressId))
    }
  }

  showNewAddressModal(orderId) {
    this.context.store.dispatch(userActions.userToggleNewAddressModal(true, orderId))
  }

  canSubmit(formSelectedAddress, orderShippingAddressId, orderDeliverySlotId, selectedDayId, selectedSlotId) {
    const addressChange = formSelectedAddress ? formSelectedAddress !== orderShippingAddressId : false
    const slotChange = this.state.selectedDeliverySlotId !== orderDeliverySlotId

    return (addressChange || slotChange) && selectedDayId !== DEFAULT_MESSAGE_ID && selectedSlotId !== DEFAULT_MESSAGE_ID
  }

  onDayChange(dayId, slotsOptions) {
    let slotId
    if (dayId === this.props.coreDeliveryDayId) {
      slotId = this.props.deliverySlotId
    } else {
      const defaultSlotOption = slotsOptions[dayId].find(slotOption => slotOption.isDefaultSlot)
      if (defaultSlotOption) {
        slotId = defaultSlotOption.value
      } else {
        slotId = slotsOptions[dayId][0].value
      }
    }
    this.setState({ selectedDeliveryDayId: dayId, selectedDeliverySlotId: slotId })
  }

  onSlotChange(slotId) {
    this.setState({ selectedDeliverySlotId: slotId })
  }

  constructDropdownOptions(props) {
    const { deliveryDays, recipes, recipesStock, portionsCount, coreDeliveryDayId, deliverySlotId, orders } = props

    return util.getDeliveryDaysAndSlotsOptions(deliveryDays, recipes, recipesStock, portionsCount, coreDeliveryDayId, deliverySlotId, orders)
  }

  render() {
    const { formSelectedAddress, shippingAddressId, deliverySlotId, addresses, isPendingUpdateDayAndSlot, isPendingUpdateAddress } = this.props
    const { deliveryDaysOptions, slotsOptions } = this.state
    const postError = this.props.isErrorUpdateDayAndSlot !== null || this.props.isErrorUpdateAddress !== null
    let { selectedDeliveryDayId, selectedDeliverySlotId } = this.state
    const canSubmit = this.canSubmit(formSelectedAddress, shippingAddressId, deliverySlotId, selectedDeliveryDayId, selectedDeliverySlotId)
    const selectedAddressIdForm = formSelectedAddress || shippingAddressId
    const renderedAddresses = addresses.map((address) => {
      const addressId = address.get('id')
      const isSelected = selectedAddressIdForm ? selectedAddressIdForm === addressId : shippingAddressId === addressId

      return (
        <Address
          key={addressId}
          addressName={address.get('name')}
          address={address.get('line1')}
          town={address.get('town')}
          postcode={address.get('postcode')}
          orderId={this.props.orderId}
          addressId={addressId}
          isSelected={isSelected}
          selectAddress={(selectedAddressId) => this.handleSelectAddress(selectedAddressId)}
        />
      )
    })
    if (!deliveryDaysOptions.some(option => option.value === selectedDeliveryDayId)) {
      selectedDeliveryDayId = DEFAULT_MESSAGE_ID
      selectedDeliverySlotId = DEFAULT_MESSAGE_ID
    } else if (!slotsOptions[selectedDeliveryDayId].some(option => option.value === selectedDeliverySlotId)) {
      selectedDeliverySlotId = DEFAULT_MESSAGE_ID
    }

    return (
      <div className={css.editDeliveryOuterContainer}>
        <div className={css.editDeliveryInnerContainer}>
          <div className={`${css.header} ${css.bold}`}>
            <Content contentKeys="mydeliveriesOrderEditdeliveryTitle" >
              <span>Delivery details</span>
            </Content>
          </div>
          <div className={css.row}>
            <div className={css.firstDropDownContainer}>
              <DropdownInput
                color="secondary"
                options={deliveryDaysOptions}
                onChange={(dayId) => this.onDayChange(dayId, slotsOptions)}
                className={css.daysDropDown}
                value={selectedDeliveryDayId}
              />
            </div>
            <DropdownInput
              color="secondary"
              options={slotsOptions[selectedDeliveryDayId]}
              onChange={(slotId) => this.onSlotChange(slotId)}
              className={css.slotsDropDown}
              value={selectedDeliverySlotId}
            />
          </div>
          <div>
            {renderedAddresses}
          </div>
          <p>Please note some time slots are not available for some delivery addresses.</p>
          <div className={css.addAddressSection} onClick={() => this.showNewAddressModal(this.props.orderId)}>
            <div className={css.addIcon}></div>
            <div className={css.addText}>
              <Content contentKeys="mydeliveriesOrderEditdeliveryAddtext" >
                <span>Add new address</span>
              </Content>
            </div>
          </div>
          {postError ?
            <div>
              <Alert type="danger">
                Whoops, something went wrong - please try again
              </Alert>
            </div>
            : null}
          <div className={css.button}>
            <Button onClick={() => this.onCancelFunction()} color="negative" noDecoration className={css.firstButton}>
              Cancel changes
            </Button>
            <Button
              onClick={() => this.onSubmitFunction(this.props.orderId, this.props.formSelectedAddress, this.state.selectedDeliveryDayId, this.state.selectedDeliverySlotId)}
              color={'secondary'}
              noDecoration
              pending={isPendingUpdateDayAndSlot || isPendingUpdateAddress}
              disabled={!canSubmit}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditDelivery
