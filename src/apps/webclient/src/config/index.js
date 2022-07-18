/* eslint-disable global-require */
export default {
  // keep alphabetic order
  apps: require('./apps'),
  auth: require('./auth'),
  basket: require('./basket'),
  company: require('./company'),
  freeDelivery: require('./freeDelivery'),
  media: require('./media'),
  menu: require('./menu'),
  recipes: require('./recipes').default,
  referral: require('./referral'),
  routes: require('./routes'),
  signup: require('routes/Signup/signupConfig'),
  template: require('./template'),
  deliveryPriceConfig: require('./deliveryPrice').deliveryPriceConfig
}
