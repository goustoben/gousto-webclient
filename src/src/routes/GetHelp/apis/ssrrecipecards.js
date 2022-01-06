import { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function validateRecipeCards(accessToken, customerId, orderId, coreRecipeIds) {
  const url = `${endpoint('ssrrecipecards')}${routes.ssrrecipecards.validate}`

  return fetchRaw(
    url,
    {
      customer_id: customerId,
      order_id: orderId,
      core_recipe_ids: JSON.stringify(coreRecipeIds),
    },
    {
      accessToken,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
}
