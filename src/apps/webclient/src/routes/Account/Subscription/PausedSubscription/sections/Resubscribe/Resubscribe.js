import React, { useState, useContext } from 'react'
import { CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'

import endpoint from 'config/endpoint'
import routes from 'config/routes'

import { getCurrentUserId } from 'routes/Account/Subscription/context/selectors/currentUser'
import { Section } from '../../../components/Section'
import { resubscribeSection } from '../../../subscriptionsSectionsContent'
import { useFetch } from '../../../../../../hooks/useFetch'
import { SubscriptionContext } from '../../../context'
import { actionTypes } from '../../../context/reducers'
import { SubscriberPricingInfoPanel } from '../../../../AccountComponents/SubscriberPricingInfoPanel'
import { trackSubscriptionSettingsChange } from '../../../tracking'
import css from './Resubscribe.css'

const getResult = (loading, response, error) => {
  if (!error && !loading && response && response.status && response.status.toLowerCase() === 'ok') {
    return response.data
  } else {
    return null
  }
}

export const Resubscribe = ({ accessToken }) => {
  const { dispatch, state = {}} = useContext(SubscriptionContext)
  const { isSubscriberPricingEnabled } = state

  const [shouldResubscribe, setShouldResubscribe] = useState(false)
  const reactivateSubscription = () => {
    if (isSubscriberPricingEnabled) {
      trackSubscriptionSettingsChange({ settingName: 'click', action: 'reactivate_subscription'})()
    }

    setShouldResubscribe(true)
  }

  const userId = getCurrentUserId(state)

  const reactivateSubscriptionUrl = `${endpoint('subscriptioncommand')}/subscriptions/${userId}${routes.subscriptionCommand.activate}`
  const method = 'POST'

  const [loading, response, error] = useFetch({
    url: reactivateSubscriptionUrl,
    needsAuthorization: true,
    accessToken,
    trigger: {
      shouldRequest: shouldResubscribe,
      setShouldRequest: setShouldResubscribe,
    },
    options: {
      method,
    },
  })

  const data = getResult(loading, response, error)

  if (data) {
    setTimeout(() => {
      dispatch({
        type: actionTypes.SUBSCRIPTION_STATUS_UPDATE_RECEIVED,
        data
      })
    }, 0)
  }

  return (
    <Section
      title={isSubscriberPricingEnabled ? resubscribeSection.pricingTitle : resubscribeSection.title}
      subTitle={isSubscriberPricingEnabled ? resubscribeSection.pricingSubTitle : resubscribeSection.subTitle}
      testingSelector={resubscribeSection.testingSelector}
    >
      {
        isSubscriberPricingEnabled && (
          <div>
            <SubscriberPricingInfoPanel variant="resubscribe" />
            <div className={css.bottomContent}>{resubscribeSection.pricingParagraph}</div>
          </div>
        )
      }
      <CTA
        testingSelector="resubscribe-cta"
        isFullWidth
        onClick={reactivateSubscription}
      >
        { isSubscriberPricingEnabled ? 'Restart my subscription' : 'Reactivate subscription' }
      </CTA>
    </Section>
  )
}

Resubscribe.propTypes = {
  accessToken: PropTypes.string.isRequired
}
