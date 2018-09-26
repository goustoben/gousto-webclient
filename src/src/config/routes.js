module.exports = {
	version: {
		customers: 'v1',
		products: 'v2.0',
		auth: 'v1.0.0',
		collections: 'v1',
		content: 'v1',
		deliveries: 'v1.0',
		orders: 'v1',
		recipes: 'v2',
		ssr: 'v1',
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
		blog: '/blog',
		boxPrices: '/box-prices',
		checkout: '/checkout',
		'check-out': '/check-out',
		cookbook: '/cookbook',

		myGousto2: '/mygousto',
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

		ourSuppliers: '/our-suppliers',

		privacyPolicy: '/privacy-statement',

		resetForm: '/resetform',

		welcome: '/welcome-to-gousto',

		orderSummary: '/order/:orderId/summary',

		termsAndConditions: '/terms-and-conditions',
		termsOfUse: '/terms-of-use',
		twr: '/menu',

		weCare: '/we-care',

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
	},
	jobs: {
		openings: '/jobs#openings',
	},
	products: {
		getProducts: '/products',
		categories: '/categories',
	},

	orders: {
		recipesStock: '/stock/recipes',
	},
	recipes: {
		availableDates: '/dates/available',
	},
	workable: {
		link: 'https://gousto.workable.com/',
	},
	zendesk: {
		link: 'https://gousto.zendesk.com/hc/en-gb/requests/new',
	},
}
