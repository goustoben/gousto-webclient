import { getFirstPartPostcode } from "utils/format"
import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { daysRoute } from "config/routes/deliveries/daysRoute"

export function fetchDeliveryDays(accessToken, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId, postcode) {
    const reqData = {
        'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
        'filters[cutoff_datetime_until]': menuCutoffUntil,
        ndd: isNDDExperiment ? 'true' : 'false',
        delivery_tariff_id: deliveryTariffId,
        sort: 'date',
        direction: 'asc',
    }

    if (postcode && postcode.length >= 5) {
        reqData.postcode = getFirstPartPostcode(postcode)
    }

    return fetch(accessToken, `${endpoint('deliveries')}${daysRoute}`, reqData, 'GET')
}
