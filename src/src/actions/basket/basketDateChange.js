import { actionTypes } from "actions/actionTypes"

export const basketDateChange = (date) => ({
  type: actionTypes.BASKET_DATE_CHANGE,
  date,
})
