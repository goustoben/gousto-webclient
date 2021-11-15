import fetch from "utils/fetch"
import endpoint from "config/endpoint"

const shouldShowEntryPointTooltip = (accessToken, orderDeliveryDate) => (
    fetch(
        accessToken,
        `${endpoint('ssr')}/ssr/show-tooltip`,
        {delivery_date: orderDeliveryDate},
        'GET'
    )
)
export { shouldShowEntryPointTooltip }
