import { actionTypes } from "actions/actionTypes"

export const getAbandonBasketSessionState = () => dispatch => {
    const isFirstLoad = window.sessionStorage.getItem('isNotFirstLoadOfSession') !== 'false'

    dispatch({
        type: actionTypes.SET_FIRST_LOAD_OF_SESSION,
        value: isFirstLoad
    })
}
