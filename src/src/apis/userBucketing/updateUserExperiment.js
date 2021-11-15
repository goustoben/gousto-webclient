import endpoint from "config/endpoint"
import { experimentsRoute } from "config/routes/userBucketing/experimentsRoute"
import fetch from "utils/fetch"

export function updateUserExperiment(experimentName, sessionId, userId) {
    const headers = {
        'x-gousto-device-id': sessionId,
        'x-gousto-user-id': userId,
    }

    const url = `${endpoint('userbucketing')}${experimentsRoute}/${experimentName}`

    return fetch(null, url, {}, 'POST', 'default', headers)
}
