import { fetch } from 'utils/fetch'

export function createAdapter(coreBaseUrl) {
  return (authUserId, marketingType, marketingUnsubscribeToken) => fetch(
    null,
    `${coreBaseUrl}/user/${authUserId}/marketing/${marketingType}`,
    {marketing_unsubscribe_token: marketingUnsubscribeToken},
    'DELETE'
  )
}
