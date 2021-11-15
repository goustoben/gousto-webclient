import { documentLocation, redirect } from "utils/window"
import { getGoToMyDeliveries, getGoToMyGousto } from "selectors/features"
import configRoutes from "config/routes"

export const authRedirectLoggedInUser = () => (
  async (dispatch, getState) => {
    const {auth} = getState()
    const isAuthenticated = auth.get('isAuthenticated')

    const {pathname} = documentLocation()

    if (pathname === '/' && isAuthenticated) {
      if (getGoToMyGousto(getState())) return redirect(configRoutes.client.myGousto)
      if (getGoToMyDeliveries(getState())) return redirect(configRoutes.client.myDeliveries)
    }
  }
)
