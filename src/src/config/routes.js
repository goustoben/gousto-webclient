module.exports = {
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
    appsRedirect: '/apps',
    blog: '/blog',
    boxPrices: '/box-prices',
    checkout: '/checkout',
    'check-out': '/check-out',
    checkoutWelcome: '/check-out/welcome-to-gousto',
    choosePlan: '/choose-subscription-plan',
    cookbook: '/cookbook',
    cookbookRecipeById: '/cookbook/recipe-by-id',

    mySubscription: '/subscription-settings',
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
      ingredients: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/ingredients`,
      orderIssue: 'order-issue',
      recipeCards: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/recipe-cards`,
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
    newsletterSubscribers: '/newsletter-subscribers',
    reference: '/customers/reference',
    promocode: '/customers/promocode',
  },
  deliveries: {
    days: '/days',
    consignments: '/consignments',
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
  subscriptionCommand: {
    skip: '/skip',
    unSkip: '/unskip',
    deactivate: '/deactivate',
    activate: '/activate',
  },
  subscriptionQuery: {
    subscriptions: '/subscriptions',
    projectedDeliveries: '/projected-deliveries',
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

  user: {
    referAFriend: '/user/refer-a-friend'
  },

  userBucketing: {
    experiments: '/user/experiments'
  },

  user: {
    referAFriend: '/user/refer-a-friend'
  },

  userFeedback: {
    feedback: '/feedback'
  },
}
