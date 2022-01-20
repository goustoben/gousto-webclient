import fetch from 'utils/fetch'
import routes from 'config/routes'

function fetchAddressByPostcode(postcode) {
  return fetch(null, routes.address.postcodeLookup, {
    postcode,
  }, 'GET')
}

export { fetchAddressByPostcode }
