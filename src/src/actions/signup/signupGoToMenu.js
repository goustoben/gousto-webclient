import { clickSeeThisWeeksMenu } from "actions/trackingKeys"
import { redirect } from "actions/redirect/redirect"
import routes from "config/routes"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

export function signupGoToMenu() {
  return (dispatch) => {
    dispatch(trackUTMAndPromoCode(clickSeeThisWeeksMenu))
    dispatch(redirect(routes.client.menu))
  }
}
