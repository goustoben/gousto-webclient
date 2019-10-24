import config from 'config'

const clientRoutes = config.routes.client

export const defaultMenuItems = {
  home: { name: 'Home', url: clientRoutes.home, clientRouted: true },
  boxPrices: { name: 'Box Prices', url: clientRoutes.boxPrices, clientRouted: true, tracking: 'BoxPricingNavigation Clicked' },
  menu: { name: 'Choose Recipes', url: clientRoutes.menu, tracking: 'RecipeNavigation Clicked' },
  faq: {
    name: 'Help',
    url: config.routes.zendesk.faqs,
    clientRouted: false,
    tracking: 'FAQNavigation Clicked'
  },
  myGousto: { name: 'My Gousto', url: clientRoutes.myGousto, clientRouted: false, tracking: 'MyGoustoNavigation Clicked' },
  referFriend: { name: 'Free Food', url: clientRoutes.referFriend, clientRouted: false, tracking: 'ReferAFriendNavigation Clicked' },
  rateMyRecipes: { name: 'Rate My Recipes', url: clientRoutes.rateMyRecipes, clientRouted: false, tracking: 'RateMyRecipesNavigation Clicked' },
  deliveries: { name: 'Deliveries', url: clientRoutes.myDeliveries, clientRouted: false, tracking: 'DeliveriesNavigation Clicked' },
  subscription: { name: 'Subscription', url: clientRoutes.mySubscription, clientRouted: false, tracking: 'SubscriptionNavigation Clicked' },
  details: { name: 'Details', url: clientRoutes.myDetails, clientRouted: false, tracking: 'DetailsNavigation Clicked' },
  sustainability: { name: 'Sustainability', url: clientRoutes.weCare, clientRouted: false, tracking: 'SustainabilityNavigation Clicked' },
}
