import { actionTypes } from "actions/actionTypes"

export function menuReceiveMenu(recipes) {
    return ({
        type: actionTypes.RECIPES_RECEIVE,
        recipes,
    })
}
