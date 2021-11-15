import { locationBeforeTransitions, locationQuery } from "selectors/routing"
import { push } from "react-router-redux"

export const checkQueryParams = () => (dispatch, getState) => {
    const prevLoc = locationBeforeTransitions(getState())
    const queryParams = locationQuery(getState())
    const recipeId = queryParams.recipeDetailId

    if (recipeId) {
        delete queryParams.recipeDetailId
        const newLoc = {...prevLoc, query: queryParams}
        dispatch(push(newLoc))
        dispatch(exports.showDetailRecipe(recipeId))
    }
}
