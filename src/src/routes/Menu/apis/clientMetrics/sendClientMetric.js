import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import logger from "utils/logger"

export const sendClientMetric = async (name, value, unit = 'None') => {
    const reqData = {
        client: 'web',
        name,
        value,
        unit
    }

    const headers = {
        'Content-Type': 'application/json',
    }

    try {
        await fetch(null, `${endpoint('clientmetrics')}/metric`, reqData, 'POST', 'default', headers)
    } catch (e) {
        logger.warning({
            message: 'Failed to send client metric',
            extra: {
                name, value, unit
            },
            error: new Error('mock error')
        })
    }
}
