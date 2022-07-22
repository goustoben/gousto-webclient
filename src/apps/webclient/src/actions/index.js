import * as signup from 'routes/Signup/signupActions'
import { checkoutActions } from 'routes/Checkout/checkoutActions'
import auth from './auth'
import basket from './basket'
import { collectionsLoadCollectionBySlug } from './collections'
import { deliveriesActions } from './deliveries'
import * as log from './log'
import login from './login'
import menu from './menu'
import * as onScreenRecovery from './onScreenRecovery'
import order from './order'
import products from './products'
import recipes from './recipes'
import redirectActions from './redirect'
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
}

export default actions
