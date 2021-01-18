import React, { useState, useContext } from 'react'
import { CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'

import endpoint from 'config/endpoint'
import routes from 'config/routes'

import { Section } from '../../../components/Section'
import { resubscribeSection } from '../../../subscriptionsSectionsContent'
import { useFetch } from '../../../../../../hooks/useFetch'
import { isCoreRequestSuccessful } from '../../../utils/response'
import { SubscriptionContext } from '../../../context'
import { actionTypes } from '../../../context/reducers'
import { SubscriberPricingInfoPanel } from '../../../../AccountComponents/SubscriberPricingInfoPanel'
import { trackSubscriptionSettingsChange } from '../../../tracking'
import css from './Resubscribe.css'

export const Resubscribe = ({ accessToken }) => {
  const { dispatch, state: { isSubscriberPricingEnabled } = {}} = useContext(SubscriptionContext)

  const [shouldResubscribe, setShouldResubscribe] = useState(false)
  const reactivateSubscription = () => {
    if (isSubscriberPricingEnabled) {
      trackSubscriptionSettingsChange({ settingName: 'click', action: 'reactivate_subscription'})()
    }

    setShouldResubscribe(true)
  }

  const reactivateSubscriptionUrl = `${endpoint('core')}${routes.core.activateSub}`

  const [, resubscribeResponse] = useFetch({
    url: reactivateSubscriptionUrl,
    needsAuthorization: true,
    accessToken,
    trigger: {
      shouldRequest: shouldResubscribe,
      setShouldRequest: setShouldResubscribe,
    },
    options: {
      method: 'PUT',
    },
  })

  const isSuccess = isCoreRequestSuccessful(resubscribeResponse)

  if (isSuccess) {
    setTimeout(() => {
      dispatch({
        type: actionTypes.SUBSCRIPTION_STATUS_UPDATE_RECEIVED,
        data: resubscribeResponse.result.data
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
