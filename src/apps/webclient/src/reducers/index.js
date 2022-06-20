import { checkoutUrgencyReducers } from 'routes/Checkout/checkoutUrgencyReducers'
import { abandonBasket } from './abandonBasket'
import { appBanner } from './appBanner'
import { accountReducers } from './account'
import auth from './auth'
import basket from './basket'
import { boxSummaryReducers } from './boxSummary'
import { checkoutReducers } from './checkout'
import content from './content'
import { cookbookRecipes } from './cookbookRecipes'
import { featuresReducers } from './features'
import { filtersReducers } from './filters'
import { loginReducers } from './login'
import { menuReducers } from './menu'
import { newsletterReducers } from './newsletter'
import { payment } from './payment'
import { persistReducers } from './persist'
import { productsReducers } from './products'
import { promosReducers } from './promos'
import { recipesReducers } from './recipes'
import { redirectReducers } from './redirect'
import { serverErrorReducers } from './serverError'
import { signup } from './signup'
import status from './status'
import subscription from './subscription'
import subscriptionPause from './subscriptionPause'
import { tempReducers } from './temp'
import { trackingReducers } from './tracking'
import { tutorial } from './tutorial'
import user from './user'
import { requestReducers } from './request'
import { collectionsReducers } from './collections'
import { cookiesReducers } from './cookies'
import { onScreenRecoveryReducers } from './onScreenRecovery'
import { getHelp } from './getHelp'
import { logger } from './logger'
import { menuService } from './menuService'
import { experimentsReducer } from './experiments'
import { loggingManager } from './loggingmanager'
import { feedback } from './feedback'
import { ribbonReducer } from './ribbonReducer'
import { myGousto } from './myGousto'

export const reducers = {
  ...abandonBasket,
  ...appBanner,
  ...accountReducers,
  ...auth,
  ...basket,
  ...boxSummaryReducers,
  ...checkoutReducers,
  ...checkoutUrgencyReducers,
  ...collectionsReducers,
  ...cookbookRecipes,
  ...cookiesReducers,
  ...content,
  ...feedback,
  ...featuresReducers,
  ...filtersReducers,
  ...loginReducers,
  logger,
  loggingManager,
  ...menuReducers,
  menuService,
  myGousto,
  ...newsletterReducers,
  ...onScreenRecoveryReducers,
  ...persistReducers,
  ...productsReducers,
  ...promosReducers,
  ...recipesReducers,
  ...redirectReducers,
  ...serverErrorReducers,
  ...signup,
  ...status,
  ...subscription,
  ...subscriptionPause,
  ...tempReducers,
  ...trackingReducers,
  ...tutorial,
  ...user,
  ...requestReducers,
  payment,
  getHelp,
  ...experimentsReducer,
  ...ribbonReducer,
}
