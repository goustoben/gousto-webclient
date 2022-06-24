import auth from './auth'
import basket from './basket'
import { checkoutActions } from './checkout'
import { collectionsLoadCollectionBySlug } from './collections'
import { deliveriesActions } from './deliveries'
import { homeActions } from './home'
import * as log from './log'
import login from './login'
import menu from './menu'
import * as onScreenRecovery from './onScreenRecovery'
import order from './order'
import products from './products'
import recipes from './recipes'
import redirectActions from './redirect'
import * as signup from './signup'
import status from './status'
import subscription from './subscription'
import subscriptionPause from './subscriptionPause'
import temp from './temp'
import * as tracking from './tracking'
import user from './user'
import * as welcome from './welcome'

const actions = {
  ...auth,
  ...basket,
  ...checkoutActions,
  ...collectionsLoadCollectionBySlug,
  ...log,
  ...login,
  ...menu,
  ...order,
  ...onScreenRecovery,
  ...products,
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
}

export default actions
