export const getSubscriptionState = ({ subscription }) => (
  subscription.get('subscription').get('state')
)
