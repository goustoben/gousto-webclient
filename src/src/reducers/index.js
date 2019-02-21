import account from './account'
import auth from './auth'
import basket from './basket'
import boxSummary from './boxSummary'
import checkout from './checkout'
import content from './content'
import example from './example'
import features from './features'
import filters from './filters'
import home from './home'
import jobs from './jobs'
import login from './login'
import menu from './menu'
import newsletter from './newsletter'
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
import tutorial from './tutorial'
import user from './user'
import request from './request'
import collections from './collections'
import cookbook from './cookbook'
import pricing from './pricing'
import cookies from './cookies'
import orderSkipRecovery from './orderSkipRecovery'
import { getHelp } from './getHelp'
import { logger } from './logger'

const reducers = {
  ...account,
  ...auth,
  ...basket,
  ...boxSummary,
  ...checkout,
  ...collections,
  ...cookbook,
  ...cookies,
  ...content,
  ...example,
  ...features,
  ...filters,
  ...jobs,
  ...login,
  logger,
  ...home,
  ...menu,
  ...newsletter,
  ...orderSkipRecovery,
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
