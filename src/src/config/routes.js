module.exports = {
  client: {
    appsRedirect: '/apps',
    blog: '/blog',
    boxPrices: '/box-prices',
    checkout: '/checkout',
    'check-out': '/check-out',
    checkoutWelcome: '/check-out/welcome-to-gousto',
    cookbook: '/cookbook',
    cookbookRecipeById: '/cookbook/recipe-by-id',

    mySubscription: '/subscription-settings',
    myDetails2: '/mydetails',
    myReferral2: '/myreferrals',
    rateRecipes2: '/rate-recipes',

    getHelp: {
      autoAcceptCheck: 'auto-check',
      autoAcceptConfirmation: 'auto-confirmation',
      confirmation: 'confirmation',
      contact: 'contact',
      delivery: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/delivery`,
      deliveryDidntArrive: ({ orderId, userId }) => `/get-help/user/${userId}/order/${orderId}/delivery/didnt-arrive`,
      deliveryDidntArriveValidation: ({ orderId, userId }) => `/get-help/user/${userId}/order/${orderId}/delivery/didnt-arrive/validation`,
      deliveryDontKnowWhen: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/delivery/dont-know-when`,
      index: '/get-help',
      ingredientIssues: 'ingredient-issues',
      ingredientReasons: 'ingredient-reasons',
      multipleIngredientsIssues: 'multiple-ingredients-issues',
      ingredients: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/ingredients`,
      orderIssue: 'order-issue',
      recipeCards: ({ userId, orderId }) => `/get-help/user/${userId}/order/${orderId}/recipe-cards`,
      refund: 'refund',
      sameDayIngredientIssues: 'same-day-ingredient-issues'
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
  zendesk: {
    covid: 'https://gousto.zendesk.com/hc/en-gb/articles/360006713417--How-does-the-coronavirus-situation-affect-Gousto-',
    emailForm: 'https://gousto.zendesk.com/hc/en-gb/requests/new',
  },
  unbounce: {
    covid: 'https://cook.gousto.co.uk/coronavirus-3/',
  },
}
