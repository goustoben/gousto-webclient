import auth from './auth'
import basket from './basket'
import { checkoutActions } from './checkout'
import filters from './filters'
import * as log from './log'
import login from './login'
import menu from './menu'
import order from './order'
import * as onScreenRecovery from './onScreenRecovery'
import products from './products'
import { promoActions } from './promos'
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
import { deliveriesActions } from './deliveries'
import * as welcome from './welcome'
import { homeActions } from './home'
import { boxPricesActions } from './boxPrices'

const actions = {
  ...auth,
  ...basket,
  ...checkoutActions,
  ...collectionsLoadCollectionBySlug,
  ...filters,
  ...log,
  ...login,
  ...menu,
  ...order,
  ...onScreenRecovery,
  ...products,
  ...promoActions,
  ...recipes,
  ...redirectActions,
  ...signup,
  ...status,
  ...subscription,
  ...subscriptionPause,
  ...temp,
  ...tracking,
  ...user,
  ...deliveriesActions,
  ...welcome,
  ...homeActions,
  ...boxPricesActions
}

export default actions
