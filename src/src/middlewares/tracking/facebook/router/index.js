import routeConfig from 'config/routes'
import * as checkoutTracking from './../checkout'

export function getUserData(action, state, prevState, pathname) {
	const gettersByPathname = {
		[`${routeConfig.client['check-out']}/aboutyou`]: checkoutTracking.getAvailableUserData,
		[`${routeConfig.client['check-out']}/yourdetails`]: checkoutTracking.getAvailableUserData,
		[`${routeConfig.client['check-out']}/delivery`]: checkoutTracking.getAvailableUserData,
		[`${routeConfig.client['check-out']}/payment`]: checkoutTracking.getAvailableUserData,
	}

	return gettersByPathname[pathname] ?
		gettersByPathname[pathname](action, state, prevState, pathname) :
		undefined
}
