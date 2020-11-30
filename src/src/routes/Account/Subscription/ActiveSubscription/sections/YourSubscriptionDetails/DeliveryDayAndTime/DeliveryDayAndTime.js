import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'goustouicomponents'
import {
  SubscriptionContext,
} from '../../../../context'

import {
  getIsSubscriptionLoaded
} from '../../../../context/selectors/subscription'

import {
  getAreDeliveriesLoaded,
  getCurrentDeliverySlot,
  getDeliverySlots
} from '../../../../context/selectors/deliveries'

import { SettingSection } from '../../../../components/SettingSection'
import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'

import { trackSubscriptionSettingsChange } from '../../../../tracking'

import css from './DeliveryDayAndTime.css'

const renderCurrentValue = ({ day, timeRange }) => (
  <Fragment>
    <p
      className={css.currentSetting}
      data-testing="current-delivery-day"
    >
      {day}
    </p>
    <p
      className={css.currentSetting}
      data-testing="current-delivery-time"
    >
      {timeRange}
    </p>
  </Fragment>
)

renderCurrentValue.propTypes = {
  day: PropTypes.string.isRequired,
  timeRange: PropTypes.string.isRequired
}

export const DeliveryDayAndTime = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state } = context

  const isLoaded = getAreDeliveriesLoaded(state) && getIsSubscriptionLoaded(state)

  const currentDeliverySlot = getCurrentDeliverySlot(state)
  const slots = getDeliverySlots(state)

  const [selectedCoreId, setSelectedCoreId] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'delivery_date'

  const [, isUpdateSuccess, isUpdateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      delivery_slot_id: selectedCoreId
    }
  })

  if (isUpdateSuccess) {
    trackSubscriptionSettingsChange({ settingName, action: 'update_success'})()
  }

  if (isUpdateError) {
    trackSubscriptionSettingsChange({ settingName, action: 'update_error'})()
  }

  const trackSubscriptionDeliveryDayEdit = () => trackSubscriptionSettingsChange({ settingName, action: 'edit'})()

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update'})()
    setShouldSubmit(true)
  }

  const { day, timeRange, coreSlotId } = selectedCoreId
    ? slots.find(({ coreSlotId: slotCoreSlotId }) => slotCoreSlotId === selectedCoreId)
    : currentDeliverySlot

  const options = slots.map(({
    coreSlotId: optionCoreSlotId,
    day: optionDay,
    timeRange: optionTimeRange
  }) => ({
    value: optionCoreSlotId,
    text: `${optionDay} ${optionTimeRange}`
  }))

  const isCtaDisabled = coreSlotId === currentDeliverySlot.coreSlotId

  return (
    <SettingSection
      icon="calendar"
      title="Delivery day and time"
      instruction="Choose day and time"
      ctaText="Save day and time"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={renderCurrentValue({ day, timeRange })}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionDeliveryDayEdit}
      isMobile={isMobile}
      testingSelector="delivery-day-and-time"
    >
      <p data-testing="expanded-text">
        Please select what day you would like to recieve your box on and when.
      </p>

      { isLoaded && (
        <Dropdown
          options={options}
          value={{ text: `${day} ${timeRange}`, value: coreSlotId }}
          onChange={({ value }) => setSelectedCoreId(value)}
          name="Delivery day dropdown"
          isMobile={isMobile}
          placeholder="Choose day"
          testingSelector="delivery-day-and-time"
        />
      )}
    </SettingSection>
  )
}

DeliveryDayAndTime.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
