// eslint-disable-next-line import/no-named-as-default
import fetch from 'utils/fetch'
import routes from 'config/routes'
import endpoint from 'config/endpoint'

export function buildSubscriptionCommandUrl(userId, path) {
  return `${endpoint(
    'subscriptioncommand',
    routes.version.subscriptionCommand
  )}/subscriptions/${userId}${path}`
}

export function buildSubscriptionQueryUrl(userId, path) {
  return `${endpoint(
    'subscriptionquery',
    routes.version.subscriptionQuery
  )}${path}/${userId}`
}

export function skipDates(accessToken, userId, dates) {
  return fetch(
    accessToken,
    `${buildSubscriptionCommandUrl(userId, routes.subscriptionCommand.skip)}`,
    {
      skipDates: dates,
    },
    'POST',
    'default',
    {'Content-Type': 'application/json'}
  )
}

export function unSkipDates(accessToken, userId, dates) {
  return fetch(
    accessToken,
    `${buildSubscriptionCommandUrl(userId, routes.subscriptionCommand.unSkip)}`,
    {
      unskipDates: dates,
    },
    'POST',
    'default',
    {'Content-Type': 'application/json'}
  )
}

export function deactivateSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.deactivateSub}`, reqData, 'PUT')
}

export function fetchSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.currentSubscription}`, reqData, 'GET')
}

export function fetchSubscriptionV2(accessToken, userId) {
  return fetch(
    accessToken,
    buildSubscriptionQueryUrl(userId, routes.subscriptionQuery.subscriptions),
    {},
    'GET',
  )
}

export function fetchProjectedDeliveries(accessToken, userId) {
  return fetch(
    accessToken,
    `${buildSubscriptionQueryUrl(userId, routes.subscriptionQuery.projectedDeliveries)}`,
    {},
    'GET',
  )
}

export function deactivateSubscriptionV2(accessToken, pauseDate, userId) {
  return fetch(
    accessToken,
    `${buildSubscriptionCommandUrl(userId, routes.subscriptionCommand.deactivate)}`,
    { pauseDate },
    'POST',
    'default',
    {'Content-Type': 'application/json'}
  )
}
