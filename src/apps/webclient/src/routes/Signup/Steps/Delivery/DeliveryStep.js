import React from 'react'

import DropdownInput from 'Form/Dropdown'
import classNames from 'classnames'
import { Heading, Alert } from 'goustouicomponents'
import Immutable from 'immutable'
import moment from 'moment'
import PropTypes from 'prop-types'

import { completeWizardDeliveryDay } from 'actions/trackingKeys'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { unbounce as unbounceRoutes } from 'config/routes'
import { Calendar } from 'routes/Signup/Components/Calendar/Calendar'
import { SocialBelongingBanner } from 'routes/Signup/SocialBelongingBanner'
import { signupConfig } from 'routes/Signup/signupConfig'
import {
  createNextDayDeliveryDays,
  generateNextDayDeliverySlots,
  getDateOffset,
} from 'utils/deliverySlot'

import { Button } from '../../Button'
import { SubscriptionTransparencyText } from '../../Components/SubscriptionTransparencyText'
import { Image } from '../../Image'

import signupCss from '../../Signup.css'
import css from './DeliveryStep.css'

const formatPointInTime = (tempDate, time) => moment(`${tempDate} ${time}`).format('ha')

const formatTime = (deliveryStartTime, deliveryEndTime, tempDate, isGoustoOnDemandEnabled) => {
  if (!tempDate) {
    return ''
  }

  if (isGoustoOnDemandEnabled) {
    return `${formatPointInTime(tempDate, deliveryStartTime)} to ${formatPointInTime(
      tempDate,
      deliveryEndTime,
    )}`
  }

  return `${formatPointInTime(tempDate, deliveryStartTime)} - ${formatPointInTime(
    tempDate,
    deliveryEndTime,
  )}`
}

const formatDate = (date, isGoustoOnDemandEnabled) => {
  if (isGoustoOnDemandEnabled) {
    return date.format('dddd Do MMMM')
  }

  return `${date.format('dddd')}s (starting ${date.format('Do MMM')})`
}

const getDeliveryDaysAndSlots = (
  boxSummaryDeliveryDays,
  tempDate,
  disabledSlots,
  userHasAvailableSlots,
  options = {},
) => {
  const slots = {}
  const deliveryDays = boxSummaryDeliveryDays
    .map((dd) => {
      const date = dd.get('date')
      slots[date] = dd
        .get('slots')
        .sort((a, b) => a.get('deliveryStartTime').localeCompare(b.get('deliveryStartTime')))
        .map((slot) => {
          const isSlotDisabled = !!(
            disabledSlots && disabledSlots.includes(slot.get('disabledSlotId'))
          )

          let sublabel
          if (!options.isGoustoOnDemandEnabled) {
            sublabel = ''
          }

          return {
            label: formatTime(
              slot.get('deliveryStartTime'),
              slot.get('deliveryEndTime'),
              tempDate,
              options.isGoustoOnDemandEnabled,
            ),
            subLabel: sublabel,
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

      return {
        date,
        value: date,
        disabled,
        label: formatDate(moment(date), options.isGoustoOnDemandEnabled),
      }
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
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  disabledSlots,
  userHasAvailableSlots,
  trackSignupWizardAction,
  district,
  amountOfCustomers,
  trackSocialBelongingBannerAppearance,
  isGoustoOnDemandEnabled,
  isWizardWithoutImagesEnabled,
}) => {
  let { slots, deliveryDays } = getDeliveryDaysAndSlots(
    boxSummaryDeliveryDays,
    tempDate,
    disabledSlots,
    userHasAvailableSlots,
    { isGoustoOnDemandEnabled },
  )
  const showSocialBelongingBanner = district && amountOfCustomers > 50

  if (nextDayDeliveryPaintedDoorFeature) {
    const nextDayDeliveryDays = createNextDayDeliveryDays()
    deliveryDays = [...nextDayDeliveryDays, ...deliveryDays]
    slots = { ...generateNextDayDeliverySlots(nextDayDeliveryDays), ...slots }
  }

  const dateLabel = deliveryDays.find((day) => day.date === tempDate)?.label

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
    trackSignupWizardAction(completeWizardDeliveryDay)
    boxSummaryDeliverySlotChosen({
      date: tempDate,
      slotId: tempSlotId,
      displayMenuForFirstWeekOnly: false,
    }).then(next)
  }

  const onTempSlotChange = (slotId) => {
    // If the slot id has changed
    if (slotId !== tempSlotId) {
      // Track the edit
      trackDeliverySlotEdited(tempDate, getDateOffset(tempDate), slotId)
    }
    setTempSlotId(slotId)
  }

  const onSlotDropdownOpen = () => {
    trackDeliverySlotDropDownOpened(tempDate, getDateOffset(tempDate), tempSlotId)
  }

  if (userHasAvailableSlots === false) {
    return (
      <span className={signupCss.stepContainer} data-testing="signupDeliveryStep">
        <div className={signupCss.fullWidth}>
          <div
            className={classNames(signupCss.header, {
              [signupCss.wizardWithoutImagesHeader]: isWizardWithoutImagesEnabled,
            })}
          >
            <Heading type="h1">
              {isGoustoOnDemandEnabled
                ? signupConfig.deliveryOptionsStep.goustoOnDemandTitle
                : signupConfig.deliveryOptionsStep.title}
            </Heading>
            {!isWizardWithoutImagesEnabled && <Image name="delivery-day" />}
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

  const { title, goustoOnDemandTitle } = signupConfig.deliveryOptionsStep
  let headingTitle = title
  if (isGoustoOnDemandEnabled) {
    headingTitle = goustoOnDemandTitle
  }

  return (
    <div className={signupCss.stepContainer} data-testing="signupDeliveryStep">
      <div className={signupCss.fullWidth}>
        <div
          className={classNames(signupCss.header, {
            [signupCss.wizardWithoutImagesHeader]: isWizardWithoutImagesEnabled,
          })}
        >
          <Heading type="h1">{headingTitle}</Heading>
        </div>
        {showSocialBelongingBanner && (
          <SocialBelongingBanner
            amountOfCustomers={amountOfCustomers}
            district={district}
            trackBannerAppearance={trackSocialBelongingBannerAppearance}
            isWizardWithoutImagesEnabled={isWizardWithoutImagesEnabled}
          />
        )}
        <div className={css.calendarContainer}>
          <div data-testing="signupDeliveryDay">
            <Calendar
              deliveryDays={deliveryDays}
              selectedDay={tempDate}
              onDayChange={onTempDateChange}
            />
          </div>
          <div
            className={classNames(css.dropdown, css.marginBottom, {
              [css.disableClick]: slots[tempDate] && slots[tempDate].length === 1,
            })}
            data-testing="signupDeliveryTime"
          >
            <DropdownInput
              color="secondary"
              options={slots[tempDate] ? slots[tempDate] : []}
              onChange={onTempSlotChange}
              value={tempSlotId}
              onOpen={onSlotDropdownOpen}
              isInCheckout
            />
          </div>
          {!isGoustoOnDemandEnabled && (
            <div className={css.negativeMargin}>
              <SubscriptionTransparencyText />
            </div>
          )}
        </div>
      </div>
      <div className={signupCss.footer}>
        <div className={classNames(signupCss.inputContainer, css.confirmButton)}>
          <Button data-testing="signupDeliveryCTA" width="full" onClick={onShowRecipe}>
            {`Select ${dateLabel}`}
          </Button>
        </div>
      </div>
      <RibbonTriggerContainer name="wizard-delivery-options" />
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
  trackDeliverySlotDropDownOpened: PropTypes.func,
  trackDeliveryDayEdited: PropTypes.func,
  trackDeliverySlotEdited: PropTypes.func,
  nextDayDeliveryPaintedDoorFeature: PropTypes.bool,
  next: PropTypes.func,
  disabledSlots: PropTypes.instanceOf(Immutable.List),
  userHasAvailableSlots: PropTypes.bool,
  trackSignupWizardAction: PropTypes.func.isRequired,
  district: PropTypes.string,
  amountOfCustomers: PropTypes.number,
  trackSocialBelongingBannerAppearance: PropTypes.func,
  isGoustoOnDemandEnabled: PropTypes.bool,
  isWizardWithoutImagesEnabled: PropTypes.bool,
}

DeliveryStep.defaultProps = {
  boxSummaryDeliveryDays: Immutable.Map(),
  tempDate: '',
  tempSlotId: '',
  setTempDate: () => {},
  setTempSlotId: () => {},
  boxSummaryDeliverySlotChosen: () => {},
  trackDeliverySlotDropDownOpened: () => {},
  trackDeliveryDayEdited: () => {},
  trackDeliverySlotEdited: () => {},
  nextDayDeliveryPaintedDoorFeature: false,
  next: () => {},
  disabledSlots: [],
  userHasAvailableSlots: true,
  district: null,
  amountOfCustomers: null,
  trackSocialBelongingBannerAppearance: () => {},
  isGoustoOnDemandEnabled: false,
  isWizardWithoutImagesEnabled: false,
}

export { DeliveryStep }
