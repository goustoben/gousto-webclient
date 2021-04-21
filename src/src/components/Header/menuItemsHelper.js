import { client as clientRoutes } from 'config/routes'
import * as trackingKeys from 'actions/trackingKeys'
import { deepCloneObject } from 'utils/deepClone'

export const defaultMenuItems = {
  home: { name: 'Home', url: clientRoutes.home, clientRouted: true },
  boxPrices: { name: 'Box Prices', url: clientRoutes.boxPrices, clientRouted: true, tracking: 'BoxPricingNavigation Clicked' },
  menu: { name: 'Choose Recipes', url: clientRoutes.menu, tracking: trackingKeys.clickRecipeNavigation },
  faq: {
    name: 'Help',
    url: `${clientRoutes.getHelp.index}/${clientRoutes.getHelp.eligibilityCheck}`,
    clientRouted: true,
    tracking: 'FAQNavigation Clicked'
  },
  myGousto: { name: 'My Gousto', url: clientRoutes.myGousto, clientRouted: true, tracking: 'MyGoustoNavigation Clicked' },
  referFriend: { name: 'Free Food', url: clientRoutes.referFriend, clientRouted: true, tracking: 'ReferAFriendNavigation Clicked' },
  rateMyRecipes: { name: 'Rate My Recipes', url: clientRoutes.rateMyRecipes, clientRouted: false, tracking: 'RateMyRecipes Clicked' },
  deliveries: { name: 'Upcoming Deliveries', url: clientRoutes.myDeliveries, clientRouted: false, tracking: 'DeliveriesNavigation Clicked' },
  subscription: { name: 'Subscription Settings', url: clientRoutes.mySubscription, clientRouted: true, tracking: 'SubscriptionSettingsNavigation Clicked' },
  details: { name: 'Account Details', url: clientRoutes.myDetails, clientRouted: false, tracking: 'DetailsNavigation Clicked' },
  sustainability: { name: 'Sustainability', url: clientRoutes.weCare, clientRouted: false, tracking: 'SustainabilityNavigation Clicked' },
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
