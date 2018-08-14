'use strict';

const path = require('path')
var npmPackageName = process.env.npm_package_name;
<<<<<<< HEAD
=======
var api_domain = process.env.npm_config_gousto2frontend_api_domain;
var environment_name = process.env.npm_config_gousto2frontend_environment_name;
var products_domain = process.env.npm_config_gousto2frontend_products_domain;
var customer_domain = process.env.npm_config_gousto2frontend_customer_domain;
var api_token = process.env.npm_config_gousto2frontend_api_token || '';
var products_domain_path = process.env.npm_config_gousto2frontend_products_domain_path || '';
var deliveries_domain = process.env.npm_config_gousto2frontend_deliveries_domain;
var deliveries_domain_path = process.env.npm_config_gousto2frontend_deliveries_domain_path || '';
var frameApiKey = 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14';

console.log('Environment Variables:');
console.log('package name: ' + npmPackageName);
console.log('api_domain: ' + api_domain);
console.log('environment_name: ' + environment_name);
console.log('products_domain: ' + products_domain);
console.log('customer_domain: ' + customer_domain);
console.log('api_token: ' + api_token);
console.log('products_domain_path: ' + products_domain_path);
console.log('deliveries_domain: ' + deliveries_domain);
console.log('deliveries_domain_path: ' + deliveries_domain_path);
>>>>>>> old-frontend-only-for-merge

module.exports = {
	root: {
		src: '../src',
		dest: './public'
<<<<<<< HEAD
=======
	},

	tasks: {
		browserSync: {
			logLevel: 'debug',
			logPrefix: ('gousto2frontend'),
			proxy: {
				target: 'frontend.gousto.local',
				proxyRes: [
					function(res, req) {
						req.headers['Access-Control-Allow-Origin'] = '*';
						res.headers['Access-Control-Allow-Origin'] = '*';
					}
				]
			}
		},
		rev: {
			manifest: 'rev-manifest.json'
		},
		static: {
			src: 'static',
			dest: './'
		},
		js: {
			src: 'app/assets/js',
			dest: 'javascripts',
			extractSharedJs: true,
			entries: {
				boxprices: [path.resolve(__dirname, './app/assets/js/box-prices/index.js')],
				mygousto: [path.resolve(__dirname, './app/assets/js/my-gousto/index.js')],
				mysubscription: [path.resolve(__dirname, './app/assets/js/my-subscription/index.js')],
				products: [path.resolve(__dirname, './app/assets/js/products/index.js')],
				mydeliveries: [path.resolve(__dirname, './app/assets/js/my-deliveries/index.js')],
				twr: [path.resolve(__dirname, './app/assets/js/this-weeks-recipes/index.js')],
			},
			excludeFolders: ['./legacy'],
			extensions: ['js'],
			plugins: [

			],
			babel: {
				loader: 'babel-loader',
				presets: ['react', 'es2015', 'stage-0']
			},
			findAndReplace: [
				[(/\[products_domain\]/g), products_domain],
				[(/\[products_domain_path\]/g), products_domain_path],
				[(/\[api_domain\]/g), api_domain ],
				[(/\[environment_name\]/g), environment_name ],
				[(/\[api_token\]/g), api_token ],
				[(/\[deliveries_domain\]/g), deliveries_domain ],
				[(/\[deliveries_domain_path\]/g), deliveries_domain_path ],
				[(/\[frameApiKey\]/g), frameApiKey ],
			],
		},
		legacy: {
			src: 'app/assets/javascripts',
			extensions: ['js', 'json'],
			dest: 'javascripts',
			OUT: 'legacy.js',
			files: [
				'./mobile-menu.js',
				'./vendor/modernizr-2.6.2-respond-1.1.0.js',
				'./local-session.js',
				'./vendor/bootstrap.js',
				'./vendor/bootstrap-maxlength.js',
				'./vendor/lazysizes.js',
				'./vendor/ls.respimg.js',
				'./plugins.js',
				'./vendor/jquery.easing.js',
				'./vendor/jquery.placeholder.js',
				'./vendor/knockout.js',
				'./vendor/validator.js',
				'./vendor/additional-methods.js',
				'./vendor/spin.js',
				'./vendor/isotope.js',
				'./vendor/packery.js',
				'./vendor/ladda.js',
				'./vendor/ladda.jquery.js',
				'./vendor/jquery.history.js',
				'./main.js',
				'./vendor/alertify.js',
				'./vendor/crafty_postcode.class.js',
				'./vendor/svg4everybody.js',
				'./postcode.js',
				'./account.js',
				'./account/deliveries.js',
				'./account/details.js',
				'./account/ratings.js',
				'./account/subscription.js',
				'./payment/payment-form.style.js',
				'./payment/payment-form.js',
				'./homepage/home-d.js',
				'./includes/modals/promo-apply.js',
				'./includes/modals/billing-modal.js',
				'../../../node_modules/clipboard/dist/clipboard.js',
				'./refer.js',
				'./confirmpage.js',
				'./week-recipes.js',
				'./stockitem.js',
				'./basket.js',
				'./basketViewModel.js',
				'./twr/recipe-show.js',
				'./cancel.js',
				'./order.js',
				'./checkout.js',
				'./promo-loader.js',
				'./recipe.js',
				'./faq.js',
				'./enquiry.js',
				'./billing.js',
				'./vendor/retina.js',
				'./retry-payment.js',
				'./zendesk.js',
				'./cookies-to-js.js',
				'./users.js',
				'./recipe/show.js',
				'./wishlist.js',
				'./contact-map.js',
				'./checkout/order-summary.js',
				'./analytics-utils.js',
				'./postcode-lookup.js',
				'../../../node_modules/raven-js/dist/raven.min.js'
			]
		},
		css: {
			src: 'app/assets/stylesheets',
			dest: 'stylesheets',
			autoprefixer: {
				browsers: [
					'last 5 version',
					'> 1%'
				]
			},
			prependImageUrl: '/build/latest/',
			sass: {
				indentedSyntax: false
			},
			extensions: ['sass', 'scss', 'css']
		},

		html: {
			src: 'app/assets/html',
			dest: './',
			dataFile: 'data/global.json',
			htmlmin: {
				collapseWhitespace: true
			},
			extensions: ['html', 'json'],
			excludeFolders: ['layouts', 'shared', 'macros', 'data']
		},

		images: {
			src: 'app/assets/images',
			dest: 'images',
			extensions: ['jpg', 'png', 'svg', 'gif']
		},

		fonts: {
			src: 'app/assets/fonts',
			dest: 'fonts',
			extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
		},

		iconFont: {
			src: 'app/assets/icons',
			dest: 'fonts',
			sassDest: 'generated',
			extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
		},

		svgSprite: {
			src: 'app/assets/images/sprite',
			dest: 'images',
			extensions: ['svg']
		}
>>>>>>> old-frontend-only-for-merge
	}
};
