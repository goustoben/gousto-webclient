import { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export const validateIngredients = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}${routes.ssr.validateIngredients}`

  return fetchRaw(
    url,
    body,
    {
      accessToken,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
}
