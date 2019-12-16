import PropTypes from 'prop-types'
import React from 'react'
import { Button, Heading, LayoutContentWrapper, Segment } from 'goustouicomponents'
import moment from 'moment'
import Immutable from 'immutable'
import Svg from 'Svg'
import { reminder } from 'config/freeDelivery'
import { getDeliveryDaysAndSlots } from 'utils/deliverySlotHelper'
import { CancelButton } from '../CancelButton'
import { DatePickerContainer } from './DatePicker'
import css from './DeliverySlot.css'

class DeliverySlot extends React.PureComponent {
  static propTypes = {
    address: PropTypes.object,
    prevDate: PropTypes.string,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    postcode: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map),
    menuPending: PropTypes.bool,
    clearPostcode: PropTypes.func.isRequired,
    prevSlotId: PropTypes.string,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    disableNewDatePicker: PropTypes.bool,
    disableOnDelivery: PropTypes.bool,
    menuFetchDataPending: PropTypes.bool,
    basketRecipeNo: PropTypes.number,
    tempDate: PropTypes.string,
    tempSlotId: PropTypes.string,
    tempOrderId: PropTypes.string,
    boxSummaryNext: PropTypes.func.isRequired,
    disabledSlots: PropTypes.arrayOf(PropTypes.string),
    isAuthenticated: PropTypes.bool,
    isSubscriptionActive: PropTypes.string.isRequired,
    numPortions: PropTypes.number.isRequired,
    shouldDisplayFullScreenBoxSummary: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    deliveryDays: Immutable.fromJS({}),
    userOrders: Immutable.fromJS({}),
    disableNewDatePicker: false,
    disableOnDelivery: false,
    basketRecipeNo: 0,
    disabledSlots: [],
    isAuthenticated: false,
    menuFetchDataPending: false,
    menuPending: false,
    tempDate: '',
    tempSlotId: '',
    tempOrderId: '',
    prevDate: '',
    postcode: '',
    prevSlotId: '',
  }

  getExtraProps = (slots) => {
    const {
      postcode, address, tempSlotId,
      userOrders, tempOrderId, basketRecipeNo,
      prevSlotId,
      tempDate, shouldDisplayFullScreenBoxSummary
    } = this.props
    let deliveryLocationText = address ? `Address: ${address.get('name')}` : `${postcode}`
    let slotId = tempSlotId
    let chosenOrder
    let warningMessage
    let buttonText
    buttonText = prevSlotId ? 'Update delivery date' : 'Continue'
    buttonText = shouldDisplayFullScreenBoxSummary ? 'Confirm date' : buttonText
    if (tempOrderId) {
      chosenOrder = userOrders.find(order => order.get('id') === tempOrderId, Immutable.Map())
      const orderAddressName = chosenOrder.getIn(['shippingAddress', 'name'], null)
      if (orderAddressName) {
        deliveryLocationText = `Address: ${orderAddressName}`
      }
      try {
        slotId = slots[tempDate].filter(slot => slot.coreSlotId === chosenOrder.get('deliverySlotId'))[0].value
      } catch (err) {
        // couldn't find slot id for that order on that date
      }

      const noOfRecipesInOrder = chosenOrder.get('recipeItems', Immutable.List()).size
      if (noOfRecipesInOrder === 0) {
        buttonText = 'Choose recipes'
      } else {
        buttonText = 'Edit recipes'
        if (basketRecipeNo > 0) {
          const date = moment(tempDate, 'YYYY-MM-DD').format('Do MMMM')
          warningMessage = (
            <span>
              <span className={css.warningTriangle} />
              You have an existing order for
{' '}
              {date}
              . Are you sure you want to edit this order?
            </span>
          )
        }
      }
    }

    return ({ deliveryLocationText, slotId, warningMessage, buttonText })
  }

  render = () => {
    const {
      numPortions,
      disabledSlots, isAuthenticated,
      isSubscriptionActive, shouldDisplayFullScreenBoxSummary,
      boxSummaryNext, basketRestorePreviousValues,
      prevDate, menuPending,
      menuFetchDataPending,
      tempOrderId, tempDate,
      tempSlotId, clearPostcode, disableOnDelivery,
      userOrders, disableNewDatePicker
    } = this.props

    const datesOfDisabledSlots = disabledSlots.map(date => date.slice(0, 10))
    const doesDateHaveDisabledSlots = datesOfDisabledSlots.includes(tempDate) && isAuthenticated && isSubscriptionActive === 'inactive'
    const helperProps = {
      disableOnDelivery, disabledSlots,
      isAuthenticated, isSubscriptionActive, tempDate, userOrders,
      disableNewDatePicker, tempSlotId, deliveryDays: this.props.deliveryDays
    }
    const { slots, deliveryDays, chosen, hasEmptyOrders, hasFullOrders, subLabelClassName } = getDeliveryDaysAndSlots(tempDate, helperProps)
    const { deliveryLocationText, slotId, warningMessage, buttonText } = this.getExtraProps(slots)
    let deliveryCopy
    if (hasFullOrders) {
      deliveryCopy = (
        <div>
          <Svg fileName="icon_Booked-delivery" className={css.upcomingOrder} />
          <span> Upcoming delivery – recipes chosen</span>
        </div>
      )
    } else {
      deliveryCopy = 'You choose how often you would like to receive boxes after checkout.'
    }

    let deliveryCopyEmpty
    if (hasEmptyOrders) {
      deliveryCopyEmpty = (
        <div>
          <Svg fileName="icon_Scheduled-delivery" className={css.upcomingOrder} />
          <span> Upcoming delivery – recipes not chosen</span>
        </div>
      )
    }

    return (
      <LayoutContentWrapper>
        <Heading center size="large" type="h2">Delivery Options</Heading>
        <div className={css.row}>
          <p className={css.leadingText}>Our menus change weekly. Please select a date so we can show you the latest recipes</p>
        </div>
        <div className={tempOrderId ? css.disabledRow : css.row}>
          <Button
            fill={false}
            width="full"
          >
            <Segment
              className={css.textInput}
              fill={false}
              onClick={clearPostcode}
            >
              <span className={deliveryLocationText.length > 21 ? css.limitedLengthPadding : css.limitedLength}>{deliveryLocationText}</span>
              <span className={css.clear}>
                <span className={css.clearIcon} />
                edit
              </span>
            </Segment>
          </Button>
        </div>
        <DatePickerContainer slots={slots} slotId={slotId} deliveryDays={deliveryDays} tempOrderId={tempOrderId} tempSlotId={tempSlotId} tempDate={tempDate} subLabelClassName={subLabelClassName} />
        <div className={css.row}>
          <span className={css.supportingText}>
            {warningMessage ? <p className={css.errorText}>{warningMessage}</p> : <p>{deliveryCopy}</p>}
            {warningMessage ? null : <p>{deliveryCopyEmpty}</p>}
            {doesDateHaveDisabledSlots ? (
              <div>
                <Svg fileName="icon_Delivery-unavailable" className={css.iconDisabled} />
                <p className={css.disabledSlotText}> Unavailable due to high demand</p>
              </div>
            ) : null}
          </span>
        </div>
        <div className={css.row}>
          <p className={css.highlightText}>
            <span className={css.tick} />
            {reminder}
          </p>
        </div>
        <div className={shouldDisplayFullScreenBoxSummary && css.stickyButton}>
          <Button
            width="full"
            onClick={() => boxSummaryNext(numPortions)}
            pending={menuPending || menuFetchDataPending}
            disabled={!tempOrderId && !chosen}
            data-testing="boxSummaryContinueButton"
          >
            {buttonText}
          </Button>
        </div>
        <CancelButton basketRestorePreviousValues={basketRestorePreviousValues} shouldShow={!!prevDate} />
      </LayoutContentWrapper>
    )
  }
}

export default DeliverySlot
