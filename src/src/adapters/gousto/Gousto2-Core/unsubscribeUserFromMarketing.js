import { fetchRaw } from 'utils/fetch'

export function createAdapter(coreBaseUrl) {
  return (authUserId, marketingType, marketingUnsubscribeToken) => fetchRaw(
    `${coreBaseUrl}/user/${authUserId}/marketing/${marketingType}`,
    {marketing_unsubscribe_token: marketingUnsubscribeToken},
    {method: 'PUT', useOverwriteRequestMethod: false}
  )
}
