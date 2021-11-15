import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { promocodeRoute } from "config/routes/customers/promocodeRoute"

export const fetchPromoCodeValidity = (params) => (
    fetch(null, `${endpoint('customers')}${promocodeRoute}`, params, 'GET')
)
