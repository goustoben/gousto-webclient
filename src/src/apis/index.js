import * as addressLookup from './addressLookup'
import * as auth from './auth'
import * as boxPrices from './boxPrices'
import * as checkout from './checkout'
import * as collections from './collections'
import * as content from './content'
import * as deliveries from './deliveries'
import * as newsletter from './newsletter'
import * as orders from './orders'
import * as products from './products'
import * as recipes from './recipes'
import * as user from './user'
import workable from './workable'

export default {
  ...addressLookup,
  ...auth,
  ...boxPrices,
  ...checkout,
  ...collections,
  ...content,
  ...deliveries,
  ...newsletter,
  ...orders,
  ...products,
  ...recipes,
  ...user,
  ...workable,
}
