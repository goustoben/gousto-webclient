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
import order from './order'
import page from './page'
import persist from './persist'
import products from './products'
import promos from './promos'
import pricing from './pricing'
import recipes from './recipes'
import redirect from './redirect'
import signup from './signup'
import status from './status'
import subscription from './subscription'
import subscriptionPause from './subscriptionPause'
import temp from './temp'
import tracking from './tracking'
import user from './user'
import collections from './collections'
import cookbook from './cookbook'


const actions = {
	...auth,
	...basket,
	...boxSummary,
	...checkout,
	...collections,
	...cookbook,
	...content,
	...example,
	...features,
	...filters,
	...home,
	...jobs,
	...login,
	...menu,
	...newsletter,
	...order,
	...page,
	...persist,
	...products,
	...promos,
	...pricing,
	...recipes,
	...redirect,
	...signup,
	...status,
	...subscription,
	...subscriptionPause,
	...temp,
	...tracking,
	...user,
}

export default actions
