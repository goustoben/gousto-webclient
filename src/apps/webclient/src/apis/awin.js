import endpoint from 'config/endpoint'
import { fetch } from 'utils/fetch'

export function awinServerToServer(reqData) {
  return fetch(null, `${endpoint('customers', 1)}/customers/awin-server-to-server`, reqData, 'POST', 'default', {
    'Content-Type': 'application/json'
  })
}
