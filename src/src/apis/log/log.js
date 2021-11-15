import endpoint from "config/endpoint"
import { eventRoute } from "config/routes/logs/eventRoute"
import { fetch } from "utils/fetch"

export function log(logLevel, message, extra = {}) {
    const url = `${endpoint('felogging')}${eventRoute}`
    const request = {
        client: 'webclient',
        detail: {
            message,
            extra,
        },
        name: 'gousto-webclient',
        time: new Date().toISOString(),
        logLevel
    }
    const headers = {
        'Content-Type': 'application/json',
    }

    return fetch(null, url, request, 'POST', 'default', headers)
}
