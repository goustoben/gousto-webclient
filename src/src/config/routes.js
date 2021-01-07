module.exports = {
  version: {
    auth: 'v1.0.0',
    brand: 'v1',
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
    ssrdeliveries: 'v1',
    ssrV2: 'v2',
    tastePreferences: 'v1',
    userBucketing: 'v1',
    clientMetrics: 'v1',
    workable: 'v1',
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
    logEvent: '/log-event',
  },
  client: {
    appsRedirect: '/apps',
    blog: '/blog',
    boxPrices: '/box-prices',
    checkout: '/checkout',
    'check-out': '/check-out',
    choosePlan: '/choose-subscription-plan',
    cookbook: '/cookbook',

    mySubscription2: '/subscription-settings',
    myDetails2: '/mydetails',
    myReferral2: '/myreferrals',
    rateRecipes2: '/rate-recipes',

    getHelp: {
      confirmation: 'confirmation',
      contact: 'contact',
      delivery: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/delivery`,
      deliveryDidntArrive: ({ orderId, userId }) => `/get-help/user/${userId}/order/${orderId}/delivery/didnt-arrive`,
      deliveryDidntArriveValidation: ({ orderId, userId }) => `/get-help/user/${userId}/order/${orderId}/delivery/didnt-arrive/validation`,
      deliveryDontKnowWhen: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/delivery/dont-know-when`,
      eligibilityCheck: 'eligibility-check',
      index: '/get-help',
      ingredientIssues: 'ingredient-issues',
      ingredientReasons: 'ingredient-reasons',
      ingredients: 'ingredients',
      orderIssue: 'order-issue',
      recipeCards: 'recipe-cards',
      refund: 'refund',
    },

    help: '/help',
    helpCentre: '/help-centre',

    home: '/',
    home2: '/home',

    jobs: '/jobs',
    join: '/join',
    join2: '/join2',

    login: '/login',
    logout: '/logout',
    menu: '/menu',
    menu2: '/menu2',

    myGousto: '/my-gousto',
    myDeliveries: '/my-deliveries',
    mySubscription: '/my-subscription',
    myDetails: '/my-details',
    myReferral: '/my-referrals',
    rateMyRecipes: '/rate-my-recipes',

    nwr: '/menu',

    ourSuppliers: '/blog/suppliers',

    payment: {
      success: '/payment/success',
      failure: '/payment/failure',
    },

    privacyPolicy: '/privacy-statement',

    modernSlavery: '/modern-slavery-statement',

    resetForm: '/resetform',

    welcome: '/welcome-to-gousto',

    orderAddOns: '/order-add-ons/:orderId',

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
    userAddress: '/user/current/address',
    userDelivery: '/user/current/subscription/delivery',
    userPromo: '/user/current/promotion-codes',
    currentUser: '/user/current',
    currentSubscription: '/user/current/subscription',
    user: '/user',
    deactivateSub: '/user/current/subscription/deactivate',
    activateSub: '/user/current/subscription/activate',
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
    reference: '/customers/reference',
    promocode: '/customers/promocode',
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
    covid: 'https://gousto.zendesk.com/hc/en-gb/articles/360006713417--How-does-the-coronavirus-situation-affect-Gousto-',
    emailForm: 'https://gousto.zendesk.com/hc/en-gb/requests/new',
    faqs: 'https://gousto.zendesk.com/hc/en-gb',
    contactUs: 'https://gousto.zendesk.com/hc/en-gb/articles/360034974753-Contact-us',
  },
  recaptcha: {
    verify: 'https://www.google.com/recaptcha/api/siteverify',
  },

  unbounce: {
    covid: 'https://cook.gousto.co.uk/coronavirus-3/',
  },

  tastePreferences: {
    profile: '/preferences/profile'
  },

  userBucketing: {
    experiments: '/user/experiments'
  }
}
