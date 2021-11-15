import { actionTypes } from "actions/actionTypes"

export const browserTypeChange = browserType => ({
    type: actionTypes.BROWSER_TYPE_CHANGE,
    browserType,
})
