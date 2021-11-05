import { client as clientRoutes } from 'config/routes'
import * as trackingKeys from 'actions/trackingKeys'
import { deepCloneObject } from 'utils/deepClone'

export const defaultMenuItems = {
  home: { name: 'Home', url: clientRoutes.home, clientRouted: true },
  boxPrices: { name: 'Prices', url: clientRoutes.boxPrices, clientRouted: true, tracking: 'BoxPricingNavigation Clicked' },
  menu: { name: 'Take Quiz', url: clientRoutes.menu, tracking: trackingKeys.clickRecipeNavigation },
  help: {
    name: 'Help',
    url: clientRoutes.helpCentre,
    clientRouted: false,
    tracking: trackingKeys.clickHelpNavigation,
  },
  myGousto: { name: 'My Nourished', url: clientRoutes.myGousto, clientRouted: true, tracking: 'MyGoustoNavigation Clicked' },
  referFriend: { name: 'Nourished Kids', url: clientRoutes.referFriend, clientRouted: true, tracking: 'ReferAFriendNavigation Clicked' },
  rateMyRecipes: { name: 'Rate My Vitamins', url: clientRoutes.rateMyRecipes, clientRouted: false, tracking: 'RateMyRecipes Clicked' },
  deliveries: { name: 'Upcoming Deliveries', url: clientRoutes.myDeliveries, clientRouted: false, tracking: 'DeliveriesNavigation Clicked' },
  subscription: { name: 'Subscription Settings', url: clientRoutes.mySubscription, clientRouted: true, tracking: 'SubscriptionSettingsNavigation Clicked' },
  details: { name: 'Account Details', url: clientRoutes.myDetails, clientRouted: false, tracking: 'DetailsNavigation Clicked' },
  sustainability: { name: 'About', url: clientRoutes.weCare, clientRouted: false, tracking: 'SustainabilityNavigation Clicked' },
}

export const showcaseMenuItem = {
  name: 'This week’s menu',
  url: clientRoutes.menu,
  tracking: trackingKeys.clickRecipeNavigation
}

export const newSubscription = {
  name: 'Subscription Settings',
  url: clientRoutes.mySubscription,
  clientRouted: true,
  tracking: 'SubscriptionSettingsNavigation Clicked'
}

export const getDeepClonedMenuItems = () => {
  const menuItems = deepCloneObject(defaultMenuItems)

  return menuItems
}
