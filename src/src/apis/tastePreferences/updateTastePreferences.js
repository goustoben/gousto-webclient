import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { profileRoute } from "config/routes/tastePreferences/profileRoute"

export function updateTastePreferences(accessToken, sessionId) {
    const headers = {
        'x-gousto-device-id': sessionId,
        'Content-Type': 'application/json',
    }

    return fetch(accessToken, `${endpoint('tastepreferences')}${profileRoute}`, {}, 'POST', 'default', headers)
}
