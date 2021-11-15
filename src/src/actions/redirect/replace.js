import { shouldUseReactRouter } from "actions/redirect/shouldUseReactRouter"
import { server } from "config/globals"
import { actionTypes } from "actions/actionTypes"
import * as windowUtils from "utils/window"

export const replace = (url) => {
    let action

    if (shouldUseReactRouter()) {
        action = replace(url)
    } else if (server) {
        action = {
            type: actionTypes.SERVER_REPLACE,
            url,
        }
    } else {
        windowUtils.replace(url)

        action = {
            type: actionTypes.VOID,
        }
    }

    return action
}
