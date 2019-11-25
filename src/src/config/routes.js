module.exports = {
  version: {
    auth: 'v1.0.0',
    collections: 'v1',
    complaints: 'v1',
    content: 'v1',
    customers: 'v1',
    customersV2: 'v2',
    deliveries: 'v1.0',
    menu: 'v1',
    orders: 'v1',
    products: 'v2.0',
    recipes: 'v2',
    ssr: 'v1',
    ssrV2: 'v2',
  },
  address: {
    postcodeLookup: '/address/postcode-lookup',
  },
  auth: {
    userToken: '/oauth/access-token',
    refreshToken: '/oauth/refresh-token',
    identifyUser: '/oauth/identify',
    validateUserPassword: '/passwords/validate',
    resetUserPassword: '/passwords',
    login: '/login',
    logout: '/logout',
    refresh: '/refresh',
    identify: '/identify',
    forget: '/forget',
    validate: '/validate',
  },
  client: {
    orderAddOns: '/order-add-ons',
    appsRedirect: '/apps',
    blog: '/blog',
    boxPrices: '/box-prices',
    checkout: '/checkout',
    'check-out': '/check-out',
    choosePlan: '/choose-subscription-plan',
    cookbook: '/cookbook',

    myDeliveries2: '/mydeliveries',
    mySubscription2: '/mysubscription',
    myDetails2: '/mydetails',
    myReferral2: '/myreferrals',
    rateRecipes2: '/rate-recipes',

    getHelp: {
      index: '/get-help',
      refund: 'refund',
      contact: 'contact',
      orderIssue: 'order-issue',
      confirmation: 'confirmation',
      ingredients: 'ingredients',
      ingredientIssues: 'ingredient-issues',
      ingredientReasons: 'ingredient-reasons',
    },

    help: '/help',

    home: '/',
    home2: '/home',

    jobs: '/jobs',
    join: '/join',
    join2: '/join2',

    login: '/login',
    logout: '/logout',
    menu: '/menu',

    myGousto: '/my-gousto',
    myDeliveries: '/my-deliveries',
    mySubscription: '/my-subscription',
    myDetails: '/my-details',
    myReferral: '/my-referrals',
    rateMyRecipes: '/rate-my-recipes',

    nwr: '/menu',

    ourSuppliers: '/blog/suppliers',

    privacyPolicy: '/privacy-statement',

    resetForm: '/resetform',

    welcome: '/welcome-to-gousto',

    orderAddOns: '/order-add-ons',

    orderConfirmation: '/order-confirmation/:orderId',

    termsAndConditions: '/terms-and-conditions',
    termsOfUse: '/terms-of-use',
    twr: '/menu',

    weCare: '/blog/sustainability',

    referFriend: '/my-referrals',
    signup: '/signup',

    resetPassword: '/newpasswordform',

    unsubscribe: '/unsubscribe',
  },
  collections: {
    recipes: '/items',
  },
  core: {
    boxPrices: '/boxPrices',
    holdReason: '/info/holdreason',
    newsletter: '/newsletterSubscriber',
    prices: '/prices',
    orderPreview: '/order/preview',
    order: '/order',
    productStock: '/products/stock',
    recipesStock: '/stock/recipe',
    userOrders: '/user/current/orders',
    userOrder: '/user/current/order',
    userProjectedDeliveries: '/user/current/projected-deliveries',
    rateCount: '/user/current/ratings/count',
    userAddress: '/user/current/address',
    userDelivery: '/user/current/subscription/delivery',
    userPromo: '/user/current/promotion-codes',
    currentUser: '/user/current',
    currentSubscription: '/user/current/subscription',
    user: '/user',
    deactivateSub: '/user/current/subscription/deactivate',
    cancelPending: '/user/current/cancel-pending-orders',
    applyPromo: '/user/current/applyPromotionCode',
  },
  content: {
    page: '/pages/slug',
  },
  craftyclicks: {
    endpoint: 'http://pcls1.craftyclicks.co.uk/json/rapidaddress',
  },
  customers: {
    pauseReasons: '/subscription/pause-reasons',
    signup: '/signup',
    addresses: '/addresses',
    intervals: '/intervals',
    newsletterSubscribers: '/newsletter-subscribers',
  },
  deliveries: {
    days: '/days',
    consignments: '/consignments',
  },
  jobs: {
    openings: '/jobs#openings',
  },
  menu: {
    menus: '/menus',
  },
  orders: {
    recipesStock: '/stock/recipes',
  },
  products: {
    getProducts: '/products',
    categories: '/categories',
  },
  recipes: {
    availableDates: '/dates/available',
    recipes: '/recipes',
    recommendations: '/recommendations',
    steps: '/steps',
  },
  workable: {
    link: 'https://gousto.workable.com/',
  },
  zendesk: {
    link: 'https://gousto.zendesk.com/hc/en-gb/requests/new',
    faqs: 'https://gousto.zendesk.com/hc/en-gb',
  },
}
