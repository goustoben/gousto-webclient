import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'
import { Link } from 'react-router'
import { frequencyMapping } from '../../../../enum/frequency'
import {
  SubscriptionContext,
} from '../../../../context'

import {
  getIsSubscriptionLoaded
} from '../../../../context/selectors/subscription'
import { getOpenOrders } from '../../../../context/selectors/orders'

import { getDeliveryFrequency } from '../../../../context/selectors/deliveries'
import { SettingSection } from '../../../../components/SettingSection'

import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { trackSubscriptionSettingsChange } from '../../../../tracking'
import { toastActions, ToastContext } from '../../../../components/Toast'

import css from './Frequency.css'

export const Frequency = ({ accessToken, isMobile }) => {
  const subscriptionContext = useContext(SubscriptionContext)
  const { state: subscriptionState } = subscriptionContext

  const toastContext = useContext(ToastContext)
  const { dispatch: toastDispatch } = toastContext

  const [selectedInterval, setSelectedInterval] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const isSubscriptionLoaded = getIsSubscriptionLoaded(subscriptionState)
  const settingName = 'box_frequency'

  const currentDeliveryFrequency = getDeliveryFrequency(subscriptionState)
  const openOrders = getOpenOrders(subscriptionState)
  const showDeliveriesReminder = openOrders.length > 0

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      interval: selectedInterval
    },
    settingName
  })

  useSubscriptionToast(updateResponse, updateError)

  const onChange = ({ target: { value } }) => setSelectedInterval(value)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)

    if (showDeliveriesReminder) {
      toastDispatch({
        type: toastActions.ADD_TOAST,
        payload: {
          title: `You still have ${openOrders.length > 1 ? 'upcoming boxes' : 'an upcoming box'}`,
          body: `Your next delivery is due on ${openOrders[0].deliveryDate}`,
          variant: 'warning',
          // eslint-disable-next-line
          renderAnchor: () => <Link className={css.link} to="/my-deliveries">View my deliveries</Link>,
          canDismiss: false,
          displayTime: 'long'
        }
      })
    }
  }

  const isCtaDisabled = selectedInterval === currentDeliveryFrequency || !selectedInterval

  return (
    <SettingSection
      icon="frequency"
      title="Frequency"
      instruction="Choose frequency"
      ctaText="Save frequency"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={(
        <p
          data-testing="current-frequency"
        >
          {frequencyMapping[selectedInterval] || frequencyMapping[currentDeliveryFrequency]}
        </p>
      )}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="box-frequency"
    >
      {isMobile ? (
        <p data-testing="box-frequency-instruction-text">
          Please select the how often you’d like to recieve your box.
        </p>
      ) : null}

      { isSubscriptionLoaded ? (
        <RadioGroup
          onChange={onChange}
          testingSelector="box-frequency-radio-group"
          name={settingName}
        >
          {
            Object.keys(frequencyMapping).map(value => {
              const frequencyValue = frequencyMapping[value]

              return (
                <InputRadio
                  id={`box-frequency-${value}`}
                  variant="tile"
                  key={frequencyValue}
                  value={value}
                  name={settingName}
                  isChecked={value === currentDeliveryFrequency}
                >
                  {
                    frequencyValue
                  }
                </InputRadio>
              )
            })
          }
        </RadioGroup>
      ) : null}
    </SettingSection>
  )
}

Frequency.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
