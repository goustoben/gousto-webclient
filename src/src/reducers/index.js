import { checkoutUrgencyReducers } from 'routes/Checkout/checkoutUrgencyReducers'
import { abandonBasket } from './abandonBasket'
import { appBanner } from './appBanner'
import account from './account'
import auth from './auth'
import basket from './basket'
import { boxPrices } from './boxPrices'
import boxSummary from './boxSummary'
import { checkoutReducers } from './checkout'
import content from './content'
import { cookbookRecipes } from './cookbookRecipes'
import features from './features'
import filters from './filters'
import login from './login'
import menu from './menu'
import newsletter from './newsletter'
import { payment } from './payment'
import persist from './persist'
import products from './products'
import promos from './promos'
import recipes from './recipes'
import redirect from './redirect'
import serverError from './serverError'
import { signup } from './signup'
import status from './status'
import subscription from './subscription'
import subscriptionPause from './subscriptionPause'
import temp from './temp'
import tracking from './tracking'
import { tutorial } from './tutorial'
import user from './user'
import request from './request'
import collections from './collections'
import cookbook from './cookbook'
import pricing from './pricing'
import cookies from './cookies'
import onScreenRecovery from './onScreenRecovery'
import { getHelp } from './getHelp'
import { logger } from './logger'
import { menuService } from './menuService'
import { brand } from './brand'
import { experimentsReducer } from './experiments'
import { loggingManager } from './loggingmanager'
import { feedback } from './feedback'
import { ribbonReducer } from './ribbonReducer'
import { myGousto } from './myGousto'

const reducers = {
  ...abandonBasket,
  ...appBanner,
  ...account,
  ...auth,
  ...basket,
  ...boxPrices,
  ...boxSummary,
  brand,
  ...checkoutReducers,
  ...checkoutUrgencyReducers,
  ...collections,
  ...cookbook,
  ...cookbookRecipes,
  ...cookies,
  ...content,
  ...feedback,
  ...features,
  ...filters,
  ...login,
  logger,
  loggingManager,
  ...menu,
  menuService,
  myGousto,
  ...newsletter,
  ...onScreenRecovery,
  ...persist,
  ...products,
  ...promos,
  ...recipes,
  ...redirect,
  ...serverError,
  ...signup,
  ...status,
  ...subscription,
  ...subscriptionPause,
  ...temp,
  ...tracking,
  ...tutorial,
  ...user,
  ...request,
  ...pricing,
  payment,
  getHelp,
  ...experimentsReducer,
  ...ribbonReducer,
}

export default reducers
