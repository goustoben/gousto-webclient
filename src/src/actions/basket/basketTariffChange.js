import { actionTypes } from "actions/actionTypes"

export const basketTariffChange = tariffId => ({
  type: actionTypes.BASKET_TARIFF_CHANGE,
  tariffId,
})
