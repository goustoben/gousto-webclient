import { getAccessToken, getAuthUserId } from "selectors/auth"
import { getActiveMenuIdForOrderDate } from "routes/Menu/selectors/menu"

export function getProductParameters(state, props = {}) {
    const accessToken = getAccessToken(state)
    const authUserId = getAuthUserId(state)
    const menuId = getActiveMenuIdForOrderDate(state, props)

    return {
        accessToken,
        authUserId,
        menuId
    }
}
