import React from 'react'

import { Alert, Button, Heading, LayoutContentWrapper, Segment } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { getDeliveryDaysAndSlots } from 'utils/deliverySlotHelper'

import { DatePickerContainer } from './DatePicker'
import { DeliverySupportingText } from './DeliverySupportingText'

import css from './DeliverySlot.css'

class DeliverySlot extends React.PureComponent {
  render = () => {
    const {
      disabledSlots,
      isAuthenticated,
      isSubscriptionActive,
      shouldDisplayFullScreenBoxSummary,
      boxSummaryNext,
      menuPending,
      menuFetchDataPending,
      tempOrderId,
      tempDate,
      tempSlotId,
      clearPostcode,
      disableOnDelivery,
      userOrders,
      getBoxSummaryTextProps,
      deliveryDays: deliveryDaysProps,
      userHasAvailableSlots,
      userOrderLoadingState,
      removeRecipeFromBasket,
    } = this.props

    const datesOfDisabledSlots = disabledSlots.map((date) => date.slice(0, 10))
    const doesDateHaveDisabledSlots =
      datesOfDisabledSlots.includes(tempDate) &&
      isAuthenticated &&
      isSubscriptionActive === 'inactive'
    const helperProps = {
      disableOnDelivery,
      disabledSlots,
      isAuthenticated,
      isSubscriptionActive,
      tempDate,
      userOrders,
      tempSlotId,
      deliveryDaysProps,
    }
    const {
      slots,
      deliveryDays,
      chosen,
      hasEmptyOrders,
      hasFullOrders,
      subLabelClassName,
      hasActiveSlotsForSelectedDate,
    } = getDeliveryDaysAndSlots(tempDate, helperProps)
    const { deliveryLocationText, slotId, buttonText, showWarning } = getBoxSummaryTextProps(slots)

    return (
      <LayoutContentWrapper>
        <Heading isCenter size="_legacy_large" type="h2">
          Delivery Options
        </Heading>
        <div className={css.row}>
          <p className={css.leadingText}>
            Our menus change weekly. Please select a date so we can show you the latest recipes
          </p>
        </div>
        <div className={tempOrderId ? css.disabledRow : css.row}>
          <Button fill={false} width="full">
            <Segment className={css.textInput} fill={false} onClick={clearPostcode}>
              <span
                className={
                  deliveryLocationText.length > 21 ? css.limitedLengthPadding : css.limitedLength
                }
              >
                {deliveryLocationText}
              </span>
              <span className={css.clear}>
                <span className={css.clearIcon} />
                edit
              </span>
            </Segment>
          </Button>
        </div>
        <DatePickerContainer
          slots={slots}
          slotId={slotId}
          deliveryDays={deliveryDays}
          tempOrderId={tempOrderId}
          tempSlotId={tempSlotId}
          tempDate={tempDate}
          subLabelClassName={subLabelClassName}
        />
        <div className={css.row}>
          <DeliverySupportingText
            hasEmptyOrders={hasEmptyOrders}
            hasFullOrders={hasFullOrders}
            doesDateHaveDisabledSlots={doesDateHaveDisabledSlots}
            showWarning={showWarning}
            tempDate={tempDate}
          />
        </div>
        {userHasAvailableSlots === false && userOrderLoadingState === false && (
          <div className={css.row}>
            <Alert type="danger">
              <p className={css.alertContent}>
                Due to extremely high demand, all of our one-off box delivery slots are full. If you
                skipped a box you will not be able to replace it.
              </p>
            </Alert>
          </div>
        )}
        <div className={shouldDisplayFullScreenBoxSummary && css.stickyButton}>
          <Button
            className="boxSummaryContinueButton"
            width="full"
            onClick={() => boxSummaryNext(removeRecipeFromBasket)}
            pending={menuPending || menuFetchDataPending}
            disabled={(!tempOrderId && !chosen) || !hasActiveSlotsForSelectedDate}
            data-testing="boxSummaryContinueButton"
          >
            {buttonText}
          </Button>
        </div>
      </LayoutContentWrapper>
    )
  }
}

DeliverySlot.propTypes = {
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
  shouldDisplayFullScreenBoxSummary: PropTypes.bool.isRequired,
  tempDate: PropTypes.string,
  tempOrderId: PropTypes.string,
  tempSlotId: PropTypes.string,
  userOrders: PropTypes.instanceOf(Immutable.Map),
  userHasAvailableSlots: PropTypes.bool.isRequired,
  userOrderLoadingState: PropTypes.bool.isRequired,
  removeRecipeFromBasket: PropTypes.func.isRequired,
}

DeliverySlot.defaultProps = {
  deliveryDays: Immutable.fromJS({}),
  disabledSlots: [],
  disableOnDelivery: false,
  isAuthenticated: false,
  menuFetchDataPending: false,
  menuPending: false,
  tempDate: '',
  tempOrderId: '',
  tempSlotId: '',
  userOrders: Immutable.fromJS({}),
  isSubscriptionActive: '',
}
export { DeliverySlot }
