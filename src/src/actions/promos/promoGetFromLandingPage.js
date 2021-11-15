import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { promoChange } from "./promoChange"
import { fetchPromocodeFromCampaignUrl } from "apis/promos/fetchPromocodeFromCampaignUrl"

export const promoGetFromLandingPage = landingUrl => (
  async (dispatch, getState) => {
    let promocode
    let errored

    try {
      const {data: code} = await fetchPromocodeFromCampaignUrl(null, landingUrl)
      promocode = code.promocode
    } catch (e) {
      errored = true
      dispatch(error(actionTypes.PROMO_GET, e.message))
    }

    if (!errored && promocode) {
      await promoChange(promocode.toUpperCase())(dispatch, getState)
    }
  }
)
