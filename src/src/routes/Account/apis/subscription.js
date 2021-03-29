// eslint-disable-next-line import/no-named-as-default
import fetch from 'utils/fetch'
import routes from 'config/routes'
import endpoint from 'config/endpoint'

function buildSubscriptionCommandUrl(userId) {
  return `${endpoint('subscriptioncommand', routes.version.subscriptionCommand)}/subscriptions/${userId}`
}

export function skipDates(accessToken, userId, dates) {
  return fetch(
    accessToken,
    `${buildSubscriptionCommandUrl(userId)}${routes.subscriptionCommand.skip}`,
    {
      skipDates: dates,
    },
    'POST',
  )
}

export function unSkipDates(accessToken, userId, dates) {
  return fetch(
    accessToken,
    `${buildSubscriptionCommandUrl(userId)}${routes.subscriptionCommand.unSkip}`,
    {
      unskipDates: dates,
    },
    'POST',
  )
}

export function deactivateSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.deactivateSub}`, reqData, 'PUT')
}

export function fetchSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.currentSubscription}`, reqData, 'GET')
}
