import { actionTypes } from "actions/actionTypes"

export const basketCurrentMenuIdChange = ({id}) => ({
    type: actionTypes.BASKET_CURRENT_MENU_ID_CHANGE,
    menuId: id
})
