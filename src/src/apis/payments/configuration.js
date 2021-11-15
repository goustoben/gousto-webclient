import endpoint from "config/endpoint"

export const PAYMENTS_API = `${endpoint('payments')}/payments`
export const HEADERS = {
    'Content-Type': 'application/json',
}
