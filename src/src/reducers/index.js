import { abandonBasket } from './abandonBasket'
import { appBanner } from './appBanner'
import account from './account'
import auth from './auth'
import basket from './basket'
import boxSummary from './boxSummary'
import checkout from './checkout'
import content from './content'
import { cookbookRecipes } from './cookbookRecipes'
import example from './example'
import features from './features'
import filters from './filters'
import home from './home'
import jobs from './jobs'
import login from './login'
import menu from './menu'
import newsletter from './newsletter'
import { orders } from './orders'
import persist from './persist'
import products from './products'
import promos from './promos'
import recipes from './recipes'
import redirect from './redirect'
import serverError from './serverError'
import signup from './signup'
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

const reducers = {
  ...abandonBasket,
  ...appBanner,
  ...account,
  ...auth,
  ...basket,
  ...boxSummary,
  ...checkout,
  ...collections,
  ...cookbook,
  ...cookbookRecipes,
  ...cookies,
  ...content,
  ...example,
  ...features,
  ...filters,
  ...home,
  ...jobs,
  ...login,
  logger,
  ...menu,
  menuService,
  ...newsletter,
  orders,
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
  getHelp,
}

export default reducers
