import snowplowTracker from '../../../../middlewares/tracking/snowplow'

const seCategory = 'SubscriptionSettingsPage'

export const trackSubscriptionSettingsChange = ({ settingName, action }) => (data = {}) => {
  const state = {
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'server-side'
  }

  snowplowTracker({
    actionType: `${settingName}_${action}`,
    seCategory,
    ...data
  }, state)
}

export const trackWeeklyFrequencyVariant = ({ variation }) => {
  const state = {
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'server-side'
  }

  snowplowTracker({
    actionType: 'allocate_user_frequency_experiment',
    seCategory,
    variation,
  }, state)
}

