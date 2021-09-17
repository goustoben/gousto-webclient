import auth from './auth'
import basket from './basket'
import { checkoutActions } from './checkout'
import content from './content'
import filters from './filters'
import * as log from './log'
import login from './login'
import menu from './menu'
import newsletter from './newsletter'
import order from './order'
import * as onScreenRecovery from './onScreenRecovery'
import page from './page'
import persist from './persist'
import products from './products'
import { promoActions } from './promos'
import pricing from './pricing'
import recipes from './recipes'
import redirectActions from './redirect'
import * as signup from './signup'
import status from './status'
import subscription from './subscription'
import subscriptionPause from './subscriptionPause'
import temp from './temp'
import * as tracking from './tracking'
import user from './user'
import { collectionsLoadCollectionBySlug } from './collections'
import deliveries from './deliveries'
import * as welcome from './welcome'
import { homeActions } from './home'
import { boxPricesActions } from './boxPrices'

const actions = {
  ...auth,
  ...basket,
  ...checkoutActions,
  ...collectionsLoadCollectionBySlug,
  ...content,
  ...filters,
  ...log,
  ...login,
  ...menu,
  ...newsletter,
  ...order,
  ...onScreenRecovery,
  ...page,
  ...persist,
  ...products,
  ...promoActions,
  ...pricing,
  ...recipes,
  ...redirectActions,
  ...signup,
  ...status,
  ...subscription,
  ...subscriptionPause,
  ...temp,
  ...tracking,
  ...user,
  ...deliveries,
  ...welcome,
  ...homeActions,
  ...boxPricesActions
}

export default actions
