import Immutable from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { browserHistory } from 'react-router'
import DropdownInput from 'Form/Dropdown'

import {
  createNextDayDeliveryDays,
  generateNextDayDeliverySlots,
  getDateOffset,
} from 'utils/deliverySlot'
import { redirect } from 'utils/window'
import { Heading, Alert } from 'goustouicomponents'
import { unbounce as unbounceRoutes } from 'config/routes'
import { signupConfig } from 'config/signup'
import { completeWizardDeliveryDay } from 'actions/trackingKeys'
import { SubscriptionTransparencyText } from '../../Components/SubscriptionTransparencyText'
import { Button } from '../../Button'
import { Image } from '../../Image'

import signupCss from '../../Signup.css'
import css from './DeliveryStep.css'

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate) => {
  if (!tempDate) {
    return ''
  }

  return `${moment(`${tempDate} ${deliveryStartTime}`).format('ha')} - ${moment(
    `${tempDate} ${deliveryEndTime}`
  ).format('ha')} `
}

const formatDate = (date) => `${date.format('dddd')}s (starting ${date.format('Do MMM')})`

const getDeliveryDaysAndSlots = (
  boxSummaryDeliveryDays,
  tempDate,
  disabledSlots,
  userHasAvailableSlots
) => {
  const slots = {}
  const deliveryDays = boxSummaryDeliveryDays
    .map((dd) => {
      const date = dd.get('date')
      slots[date] = dd
        .get('slots')
        .map((slot) => {
          const isSlotDisabled = !!(
            disabledSlots && disabledSlots.includes(slot.get('disabledSlotId'))
          )

          return {
            label: formatTime(slot.get('deliveryStartTime'), slot.get('deliveryEndTime'), tempDate),
            subLabel:
              slot.get('deliveryPrice') === '0.00' ? 'Free' : `£${slot.get('deliveryPrice')}`,
            value: slot.get('id'),
            coreSlotId: slot.get('coreSlotId'),
            disabled: isSlotDisabled,
          }
        })
        .toArray()
      const disabled =
        userHasAvailableSlots === false ||
        (dd && dd.get('alternateDeliveryDay') !== null) ||
        slots[date].every((slot) => slot.disabled)

      return { date, value: date, disabled, label: formatDate(moment(date)) }
    })
    .toArray()
    .sort((a, b) => moment.utc(a.value).diff(moment.utc(b.value)))

  return { slots, deliveryDays }
}

const DeliveryStep = ({
  boxSummaryDeliveryDays,
  tempDate,
  setTempDate,
  tempSlotId,
  setTempSlotId,
  boxSummaryDeliverySlotChosen,
  nextDayDeliveryPaintedDoorFeature,
  next,
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  disabledSlots,
  userHasAvailableSlots,
  isTastePreferencesEnabled,
  isPaymentBeforeChoosingEnabled,
  trackSignupWizardAction,
  showcaseMenuSeen,
}) => {
  let { slots, deliveryDays } = getDeliveryDaysAndSlots(
    boxSummaryDeliveryDays,
    tempDate,
    disabledSlots,
    userHasAvailableSlots
  )

  if (nextDayDeliveryPaintedDoorFeature) {
    const nextDayDeliveryDays = createNextDayDeliveryDays()
    deliveryDays = [...nextDayDeliveryDays, ...deliveryDays]
    slots = { ...generateNextDayDeliverySlots(nextDayDeliveryDays), ...slots }
  }

  const onTempDateChange = (date) => {
    // If the date value has changed
    if (date !== tempDate) {
      // Track the edit
      const slotId = slots[date] ? slots[date][0].value : null
      trackDeliveryDayEdited(date, getDateOffset(date), slotId)
    }

    setTempDate(date)
    if (slots[date]) {
      const slotId = slots[date][0].value
      setTempSlotId(slotId)
    }
  }

  const onShowRecipe = () => {
    let nextStep
    if (isPaymentBeforeChoosingEnabled && showcaseMenuSeen) {
      nextStep = () => browserHistory.push('/check-out')
    } else if (isTastePreferencesEnabled) {
      nextStep = () => redirect('/taste-preferences')
    } else {
      nextStep = next
    }
    trackSignupWizardAction(completeWizardDeliveryDay)
    boxSummaryDeliverySlotChosen({
      date: tempDate,
      slotId: tempSlotId,
      displayMenuForFirstWeekOnly: isPaymentBeforeChoosingEnabled,
    }).then(nextStep)
  }

  const onTempSlotChange = (slotId) => {
    // If the slot id has changed
    if (slotId !== tempSlotId) {
      // Track the edit
      trackDeliverySlotEdited(tempDate, getDateOffset(tempDate), slotId)
    }
    setTempSlotId(slotId)
  }

  const onDayDropdownOpen = () => {
    trackDeliveryDayDropDownOpened(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  const onDayDropdownClose = () => {
    trackDeliveryDayDropDownClosed(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  const onSlotDropdownOpen = () => {
    trackDeliverySlotDropDownOpened(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  if (userHasAvailableSlots === false) {
    return (
      <span className={signupCss.stepContainer} data-testing="signupDeliveryStep">
        <div className={signupCss.fullWidth}>
          <div className={signupCss.header}>
            <Heading type="h1">{signupConfig.deliveryOptionsStep.title}</Heading>
            <Image name="delivery-day" />
          </div>
          <div className={signupCss.body}>
            <div className={css.container}>
              <div className={css.centralize}>
                <Alert type="info">
                  <Heading type="h3" size="_legacy_medium">
                    Due to extremely high demand, we don’t have any available slots right now.
                  </Heading>
                  <p>
                    <a href={unbounceRoutes.covid} target="_blank" rel="noopener noreferrer">
                      Register your interest
                    </a>
                    &nbsp;to be notified when more slots open up or check back soon!
                  </p>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </span>
    )
  }

  return (
    <div className={signupCss.stepContainer} data-testing="signupDeliveryStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1">{signupConfig.deliveryOptionsStep.title}</Heading>
          <Image name="delivery-day" />
        </div>
        <div className={signupCss.body}>
          <div className={css.container}>
            <div className={classNames(css.left, css.dropdown)} data-testing="signupDeliveryDay">
              <DropdownInput
                color="secondary"
                uppercase
                options={deliveryDays}
                onChange={onTempDateChange}
                value={tempDate}
                onOpen={onDayDropdownOpen}
                onClose={onDayDropdownClose}
                isInCheckout
              />
            </div>
            <div className={classNames(css.right, css.dropdown)} data-testing="signupDeliveryTime">
              <DropdownInput
                color="secondary"
                uppercase
                options={slots[tempDate] ? slots[tempDate] : []}
                onChange={onTempSlotChange}
                value={tempSlotId}
                onOpen={onSlotDropdownOpen}
                isInCheckout
              />
            </div>
          </div>
          <div className={css.negativeMargin}>
            <SubscriptionTransparencyText />
          </div>
        </div>
      </div>
      <div className={signupCss.footer}>
        <div className={signupCss.inputContainer}>
          <Button data-testing="signupDeliveryCTA" width="full" onClick={onShowRecipe} />
        </div>
      </div>
    </div>
  )
}

DeliveryStep.propTypes = {
  boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
  tempDate: PropTypes.string,
  tempSlotId: PropTypes.string,
  setTempDate: PropTypes.func,
  setTempSlotId: PropTypes.func,
  boxSummaryDeliverySlotChosen: PropTypes.func,
  trackDeliveryDayDropDownOpened: PropTypes.func,
  trackDeliveryDayDropDownClosed: PropTypes.func,
  trackDeliverySlotDropDownOpened: PropTypes.func,
  trackDeliveryDayEdited: PropTypes.func,
  trackDeliverySlotEdited: PropTypes.func,
  nextDayDeliveryPaintedDoorFeature: PropTypes.bool,
  next: PropTypes.func,
  disabledSlots: PropTypes.arrayOf(PropTypes.string),
  userHasAvailableSlots: PropTypes.bool,
  isTastePreferencesEnabled: PropTypes.bool,
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
  trackSignupWizardAction: PropTypes.func.isRequired,
  showcaseMenuSeen: PropTypes.bool,
}

DeliveryStep.defaultProps = {
  boxSummaryDeliveryDays: Immutable.Map(),
  tempDate: '',
  tempSlotId: '',
  setTempDate: () => {},
  setTempSlotId: () => {},
  boxSummaryDeliverySlotChosen: () => {},
  trackDeliveryDayDropDownOpened: () => {},
  trackDeliveryDayDropDownClosed: () => {},
  trackDeliverySlotDropDownOpened: () => {},
  trackDeliveryDayEdited: () => {},
  trackDeliverySlotEdited: () => {},
  nextDayDeliveryPaintedDoorFeature: false,
  next: () => {},
  disabledSlots: [],
  userHasAvailableSlots: true,
  isTastePreferencesEnabled: false,
  isPaymentBeforeChoosingEnabled: false,
  showcaseMenuSeen: false,
}

export { DeliveryStep }
