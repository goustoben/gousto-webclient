import fetch from "utils/fetch"
import { postcodeLookupRoute } from "config/routes/address/postcodeLookupRoute"

function fetchAddressByPostcode(postcode) {
    return fetch(null, postcodeLookupRoute, {
        postcode,
    }, 'GET')
}

export { fetchAddressByPostcode }
