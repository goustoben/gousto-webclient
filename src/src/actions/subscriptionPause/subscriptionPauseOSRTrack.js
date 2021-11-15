export function subscriptionPauseOSRTrack(key, data = {}) {
    return {
        type: key,
        ...data,
    }
}
