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
  shortlist: require('./shortlist'),
  signup: require('./signup'),
  template: require('./template'),
}
