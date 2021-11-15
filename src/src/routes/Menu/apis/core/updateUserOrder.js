import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { userOrderRoute } from "config/routes/core/userOrderRoute"

export const updateUserOrder = (accessToken, reqData) => fetch(accessToken, `${endpoint('core')}${userOrderRoute}`, reqData, 'PUT')
