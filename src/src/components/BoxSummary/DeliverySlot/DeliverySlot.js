import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import moment from 'moment'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Calendar from 'Form/Calendar'
import DropdownInput from 'Form/Dropdown'
import Svg from 'Svg'
import SlotPicker from './SlotPicker'
import css from './DeliverySlot.css'

class DeliverySlot extends React.Component {

  static propTypes = {
    address: PropTypes.object,
    prevDate: PropTypes.string,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    postcode: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map),
    menuPending: PropTypes.bool,
    deliverySlotChosen: PropTypes.func.isRequired,
    clearPostcode: PropTypes.func.isRequired,
    prevSlotId: PropTypes.string,
    orderId: PropTypes.string,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    view: PropTypes.string,
    disableNewDatePicker: PropTypes.bool,
    disableOnDelivery: PropTypes.bool,
    availableDaysOnly: PropTypes.instanceOf(Immutable.List),
    menuFetchDataPending: PropTypes.bool,
    boxSummaryVisibilityChange: PropTypes.func,
    basketRecipeNo: PropTypes.number,
    tempDate: PropTypes.string,
    tempSlotId: PropTypes.string,
    tempOrderId: PropTypes.string,
    setTempDate: PropTypes.func,
    setTempSlotId: PropTypes.func,
    setTempOrderId: PropTypes.func,
    boxSummaryNext: PropTypes.func,
    displayOptions: PropTypes.instanceOf(Immutable.List),
    disabledSlots: PropTypes.arrayOf(PropTypes.string),
    isAuthenticated: PropTypes.bool,
    isSubscriptionActive: PropTypes.string,
    numPortions: PropTypes.number,
  }

  static defaultProps = {
    availableDaysOnly: Immutable.fromJS([]),
    deliveryDays: Immutable.fromJS({}),
    userOrders: Immutable.fromJS({}),
    disableNewDatePicker: false,
    disableOnDelivery: false,
    basketRecipeNo: 0,
    displayOptions: Immutable.List([]),
    disabledSlots: [],
    isAuthenticated: false,
    basketRestorePreviousValues: () => {},
    clearPostcode: () => {},
  }

  getDeliveryDaysAndSlots = (newDate) => {
    const slots = {}
    const { disableOnDelivery, availableDaysOnly, disabledSlots, isAuthenticated, isSubscriptionActive } = this.props
    let hasOrders = false
    let hasFullOrders = false
    let hasEmptyOrders = false

    const deliveryDays = this.props.deliveryDays.map(deliveryDay => {
      const date = deliveryDay.get('date')
      slots[date] = deliveryDay.get('slots').map(slot => {
        // TODO: Write tests for the isSlotDisabled logic below
        const isSlotDisabled = disabledSlots && disabledSlots.includes(slot.get('disabledSlotId')) ? true : false

        return {
          label: this.formatTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime')),
          subLabel: (slot.get('deliveryPrice') === '0.00') ? 'Free' : `£${slot.get('deliveryPrice')}`,
          value: slot.get('id'),
          coreSlotId: slot.get('coreSlotId'),
          disabled: isSlotDisabled && isAuthenticated && isSubscriptionActive === 'inactive'
        }
      }).toArray()

      const orderIds = this.props.userOrders.toArray().filter(order => (
        moment(date).isSame(moment(order.get('deliveryDate'))))
      ).map(order => order.get('id'))

      const hasOrdersToday = orderIds.length > 0
      let icon = hasOrdersToday > 0 ? 'full-box' : ''
      const orderId = hasOrdersToday > 0 ? orderIds[0] : ''

      const orderFull = orderId ? this.props.userOrders.find(order => order.get('id') === orderId).get('recipeItems').size > 0 : null
      if (orderFull) {
        hasFullOrders = true
      }

      const orderEmpty = orderId ? this.props.userOrders.find(order => order.get('id') === orderId).get('recipeItems').size === 0 : null
      if (orderEmpty) {
        icon = 'empty-box'
        hasEmptyOrders = true
      }

      if (orderIds.length > 0) {
        hasOrders = true
      }

      const deliveryDisabled = hasOrdersToday && disableOnDelivery
      let disabled = deliveryDisabled || deliveryDay.get('alternateDeliveryDay') !== null
      let legacyData = {}

      if (this.props.disableNewDatePicker) {
        const subLabel = hasOrdersToday ? (<span className={css.boxIcon} />) : ''
        legacyData = { label: moment(date).format('ddd D MMM'), subLabel, ordered: hasOrdersToday }
        disabled = (deliveryDay && deliveryDay.get('alternateDeliveryDay') !== null) || hasOrdersToday
      }
      disabled = disabled || (!!availableDaysOnly.size && !availableDaysOnly.includes(date))

      return {
        ...legacyData,
        date,
        value: date,
        disabled,
        icon,
        orderId,
        orderEmpty,
      }
    })
      .toArray()
      .sort((a, b) => moment.utc(a.value).diff(moment.utc(b.value)))

    let chosen
    if (slots[newDate]) {
      const slot = slots[newDate].filter(sl => sl.value === this.props.tempSlotId)
      chosen = slot.length > 0
    }

    return { slots, deliveryDays, chosen, hasOrders, hasEmptyOrders, hasFullOrders }
  }

  handleDateChange = (date, orderId) => {
    if (!orderId) {
      const { slots } = this.getDeliveryDaysAndSlots(date)
      const unblockedSlots = slots[date].filter(slot => !slot.disabled)
      const slotId = unblockedSlots[0] && unblockedSlots[0].value
      this.props.setTempSlotId(slotId)
      this.props.setTempDate(date)
      this.props.setTempOrderId(undefined)

    } else {
      this.props.setTempDate(date)
      this.props.setTempOrderId(orderId)
    }
  }

  handleSlotChange = (slotId) => {
    this.props.setTempSlotId(slotId)
  }

  formatTime = (deliveryStartTime, deliveryEndTime) => (
    `${moment(`${this.props.tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(`${this.props.tempDate} ${deliveryEndTime}`).format('ha')} `
  )

  render = () => {
    const { displayOptions, numPortions, disabledSlots, isAuthenticated, isSubscriptionActive } = this.props

    const datesOfDisabledSlots = disabledSlots.map(date => date.slice(0, 10))
    const doesDateHaveDisabledSlots = datesOfDisabledSlots.includes(this.props.tempDate) && isAuthenticated && isSubscriptionActive === 'inactive'

    const { slots, deliveryDays, chosen, hasEmptyOrders, hasFullOrders } = this.getDeliveryDaysAndSlots(this.props.tempDate)

    let deliveryLocationText = this.props.address ? `Address: ${this.props.address.get('name')}` : `${this.props.postcode}`
    let slotId = this.props.tempSlotId
    let chosenOrder
    if (this.props.tempOrderId) {
      chosenOrder = this.props.userOrders.find(order => order.get('id') === this.props.tempOrderId, Immutable.Map())
      const orderAddressName = chosenOrder.getIn(['shippingAddress', 'name'], null)
      if (orderAddressName) {
        deliveryLocationText = `Address: ${orderAddressName}`
      }
      try {
        slotId = slots[this.props.tempDate].filter(slot => slot.coreSlotId === chosenOrder.get('deliverySlotId'))[0].value
      } catch (err) {
        // couldn't find slot id for that order on that date
      }
    }

    let deliveryCopy
    if (hasFullOrders) {
      deliveryCopy = <div><Svg fileName="icon_Booked-delivery" className={css.upcomingOrder} /><span> Upcoming delivery – recipes chosen</span></div>
    } else if (!displayOptions.contains('hideDeliveryCopy')) {
      deliveryCopy = 'You choose how often you would like to receive boxes after checkout.'
    }

    let deliveryCopyEmpty
    if (hasEmptyOrders) {
      deliveryCopyEmpty = <div><Svg fileName="icon_Scheduled-delivery" className={css.upcomingOrder} /><span> Upcoming delivery – recipes not chosen</span></div>}

    const disableNewDatePicker = this.props.disableNewDatePicker
    let buttonText = this.props.prevSlotId ? 'Update Delivery Date' : 'Continue'
    let warningMessage
    if (this.props.tempOrderId) {
      const noOfRecipesInOrder = chosenOrder.get('recipeItems', Immutable.List()).size
      if (noOfRecipesInOrder === 0) {
        buttonText = 'Choose Recipes'
      } else {
        buttonText = 'Edit Recipes'
        if (this.props.basketRecipeNo > 0) {
          const date = moment(this.props.tempDate, 'YYYY-MM-DD').format('Do MMMM')
          warningMessage = <span><span className={css.warningTriangle}></span> You have an existing order for {date}. Are you sure you want to edit this order?</span>
        }
      }
    }

    return (
      <div>
        <div className={css.row}>
          <p className={css.title}>Delivery Options</p>
        </div>
        {!displayOptions.contains('hideDeliveryCopy') && <div className={css.row}>
          <p className={css.leadingText}>Our menus change weekly. Please select a date so we can show you the latest recipes</p>
                                                         </div>}
        <div className={this.props.tempOrderId ? css.disabledRow : css.row}>
          <Button
            fill={false}
            width="full"
          >
            <Segment
              className={css.textInput}
              fill={false}
              onClick={this.props.clearPostcode}
            >
              <span className={deliveryLocationText.length > 21 ? css.limitedLengthPadding : css.limitedLength}>{deliveryLocationText}</span>
              <span className={css.clear}>
                <span className={css.clearIcon}></span>
                edit
              </span>
            </Segment>
          </Button>
        </div>
        {(() => (
          disableNewDatePicker ?
            (<div className={css.bsRow}>
              <div className={css.halfLeft}>
                <DropdownInput
                  color="secondary"
                  uppercase
                  options={deliveryDays}
                  onChange={this.handleDateChange}
                  value={this.props.tempDate}
                  className={css.dropdown}
                />
              </div>
              <div className={css.halfRight}>
                <DropdownInput
                  color="secondary"
                  uppercase
                  options={slots[this.props.tempDate] ? slots[this.props.tempDate] : []}
                  onChange={this.handleSlotChange}
                  value={this.props.tempSlotId}
                  className={css.dropdown}
                />
              </div>
             </div>) : null
        ))()}
        {(() => (
          !disableNewDatePicker ?
            (<div className={css.row}>
              <Calendar dates={deliveryDays} selected={this.props.tempDate} onClick={this.handleDateChange} />
             </div>) : null
        ))()}
        {(() => (
          !disableNewDatePicker ?
            (<div className={this.props.tempOrderId ? css.disabledRow : css.row}>
              <SlotPicker slots={slots} date={this.props.tempDate} slotId={slotId} onClick={this.handleSlotChange} />
             </div>) : null
        ))()}
        <div className={css.row}>
          <span className={css.supportingText}>
            {warningMessage ? <p className={css.errorText}>{warningMessage}</p> : <p>{deliveryCopy}</p>}
            {warningMessage ? null : <p>{deliveryCopyEmpty}</p>}
            {doesDateHaveDisabledSlots ? <div><Svg fileName="icon_Delivery-unavailable" className={css.iconDisabled} /><p className={css.disabledSlotText}> Unavailable due to high demand</p></div> : null}
          </span>
        </div>
        <div className={css.row}>
          <span className={css.highlightText}>
            <p><span className={css.tick} />Free delivery available, 7 days a week</p>
          </span>
        </div>
        <Button
          width="full"
          onClick={() => this.props.boxSummaryNext(numPortions)}
          pending={this.props.menuPending || this.props.menuFetchDataPending}
          disabled={!this.props.tempOrderId && !chosen}
          data-testing="boxSummaryContinueButton"
        >
          {buttonText}
        </Button>
        {this.props.prevDate ? (
          <div className={css.cancelRow}>
            <a onClick={this.props.basketRestorePreviousValues} className={css.cancelLink}>Cancel</a>
          </div>
        ) : null}
      </div>
    )
  }
}

export default DeliverySlot
