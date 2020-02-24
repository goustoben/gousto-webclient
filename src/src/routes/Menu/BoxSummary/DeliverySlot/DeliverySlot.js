import PropTypes from 'prop-types'
import React from 'react'
import { Button, Heading, LayoutContentWrapper, Segment } from 'goustouicomponents'
import Immutable from 'immutable'
import { reminder } from 'config/freeDelivery'
import { getDeliveryDaysAndSlots } from 'utils/deliverySlotHelper'
import { CancelButton } from '../CancelButton'
import { DatePickerContainer } from './DatePicker'
import { DeliverySupportingText } from './DeliverySupportingText'
import css from './DeliverySlot.css'

class DeliverySlot extends React.PureComponent {
  static propTypes = {
    basketRestorePreviousValues: PropTypes.func.isRequired,
    boxSummaryNext: PropTypes.func.isRequired,
    clearPostcode: PropTypes.func.isRequired,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    disabledSlots: PropTypes.arrayOf(PropTypes.string),
    disableOnDelivery: PropTypes.bool,
    getBoxSummaryTextProps: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isSubscriptionActive: PropTypes.string,
    menuFetchDataPending: PropTypes.bool,
    menuPending: PropTypes.bool,
    numPortions: PropTypes.number.isRequired,
    prevDate: PropTypes.string,
    shouldDisplayFullScreenBoxSummary: PropTypes.bool.isRequired,
    tempDate: PropTypes.string,
    tempOrderId: PropTypes.string,
    tempSlotId: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map),
  }

  static defaultProps = {
    deliveryDays: Immutable.fromJS({}),
    disabledSlots: [],
    disableOnDelivery: false,
    isAuthenticated: false,
    menuFetchDataPending: false,
    menuPending: false,
    prevDate: '',
    tempDate: '',
    tempOrderId: '',
    tempSlotId: '',
    userOrders: Immutable.fromJS({}),
    isSubscriptionActive: ''
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
      userOrders, getBoxSummaryTextProps,
      deliveryDays: deliveryDaysProps
    } = this.props

    const datesOfDisabledSlots = disabledSlots.map(date => date.slice(0, 10))
    const doesDateHaveDisabledSlots = datesOfDisabledSlots.includes(tempDate) && isAuthenticated && isSubscriptionActive === 'inactive'
    const helperProps = {
      disableOnDelivery,
      disabledSlots,
      isAuthenticated,
      isSubscriptionActive,
      tempDate,
      userOrders,
      tempSlotId,
      deliveryDaysProps
    }
    const { slots, deliveryDays, chosen, hasEmptyOrders, hasFullOrders, subLabelClassName } = getDeliveryDaysAndSlots(tempDate, helperProps)
    const { deliveryLocationText, slotId, buttonText, showWarning } = getBoxSummaryTextProps(slots)

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
          <DeliverySupportingText
            hasEmptyOrders={hasEmptyOrders}
            hasFullOrders={hasFullOrders}
            doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
            showWarning={showWarning}
            tempDate={tempDate}
          />
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
