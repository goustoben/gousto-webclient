import { applyPromoCodeAndShowModal } from "actions/home/applyPromoCodeAndShowModal"
import { redirect } from "actions/redirect/redirect"
import { trackGetStarted } from "actions/tracking/trackGetStarted"

export const homeGetStarted = (ctaUri, sectionForTracking) => async (dispatch) => {
  if (sectionForTracking) {
    dispatch(trackGetStarted(sectionForTracking))
  }

  await dispatch(applyPromoCodeAndShowModal())

  dispatch(redirect(ctaUri))
}
