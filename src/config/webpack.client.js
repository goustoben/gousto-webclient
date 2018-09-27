
const webpack = require('webpack')
const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const ExitCodePlugin = require('./exitCode')
const ManifestPlugin = require('webpack-manifest-plugin')
const childProcess = require('child_process')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// POST CSS IMPORT
const PostcssImport = require('postcss-import')
const PostcssUrl = require('postcss-url')
const PostcssNested = require('postcss-nested')
const PostcssPresetEnv = require('postcss-preset-env')
const PostcssReporter = require('postcss-reporter')
const PostcssFlexbugsFixed = require('postcss-flexbugs-fixes')

const build = process.env.NODE_ENV || 'development'
const envName = process.env.npm_config_gousto_webclient_environment_name || 'local'
const domain = process.env.npm_config_gousto_webclient_domain || 'gousto.local'
const clientProtocol = process.env.npm_config_gousto_webclient_client_protocol || 'http'
const cloudfrontUrl = process.env.npm_config_gousto_webclient_cloudfront_url || ''

const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
const devMode = process.env.NODE_ENV !== 'production'

const GIT_HASH = `${childProcess.execSync("git rev-parse --short HEAD | tr -d '\n'").toString()}`
const debug = false
// eslint-disable-next-line no-console
console.log(`================\nCLIENT BUILD: ${build}, ENVIRONMENT: ${envName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}"\n================`)

const cssLoaders = [
	{ loader: 'css-loader?modules&-minimize&-sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			parser: 'postcss-safe-parser',
			plugins: [
				PostcssImport({
					path: path.resolve('./src/styles'),
				}),
				PostcssUrl(),
				PostcssNested(),
				PostcssPresetEnv(),
				PostcssReporter(),
				PostcssFlexbugsFixed()
			]
		}
	},
]

const scssLoaders = [
	{ loader: 'css-loader?modules&-minimize&-sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
	{ loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			parser: 'postcss-safe-parser',
			plugins: [
				PostcssImport({
					path: path.resolve('./src/styles'),
				}),
				PostcssUrl(),
				PostcssNested(),
				PostcssPresetEnv(),
				PostcssReporter(),
				PostcssFlexbugsFixed(),
			],
		},
	},
	{ loader: 'sass-loader' }
]


const config = {
	name: 'client',
	mode: build,
	context: path.resolve(__dirname, '..'),
	target: 'web',
	entry: {
		main: [
			'babel-polyfill',
			'./src/client.js',
		],
		legacy: [
			'babel-polyfill',
			'./src/legacy.js'
		],
	},
	output: {
		path: path.resolve('./public'),
		filename: '[name].bundle.js',
		publicPath
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					cache: false,
					quiet: false,
					failOnWarning: false,
					fix: true
				},
				include: [
					path.resolve('./src')
				]
			},
			{
				test: /\.js$/,

		
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
				include: [
					path.resolve('./src'),
					path.resolve('./libs/goustouicomponents/src')

				]
			},
			{
				test: /\.css$/,
				use: devMode ? ['style-loader', ...cssLoaders] : ExtractPlugin.extract({
					fallback: 'style-loader',
					use: cssLoaders
				})
			},
			{
				test: /\.scss$/,
				use: devMode ? ['style-loader', ...scssLoaders] : ExtractPlugin.extract({
					fallback: 'style-loader',
					use: scssLoaders
				})
			},
			{
				test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000'
			},
			{ 	test: /\.jpg$/,
				loader: 'file-loader'
			},
			{ 	test: /\.gif$/,
				loader: 'file-loader'
			},
			{ 	test: /\.ico$/,
				loader: 'file-loader'
			},
			{ 	test: /\.svg$/,
				loaders: [
					'svg-url-loader',
					'image-webpack'
				],
			},
			{
				test: /\.(graphql|gql)$/,
				loader: 'graphql-tag/loader'
			}
		]
	},
	plugins: [
		new ManifestPlugin({ fileName: '../manifest.json', publicPath: '' }),
		ExitCodePlugin,
		new LodashModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__DEV__: build === ('development' || 'hmr'),
			__PROD__: build === 'production',
			__HMR__: build === 'hmr',

			__SERVER__: false,
			__CLIENT__: true,
			__TEST__: false,

			__ENV__: JSON.stringify(envName),
			__DOMAIN__: JSON.stringify(domain),
			__CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
			'process.env.NODE_ENV': JSON.stringify(build === 'legacy' ? 'production' : build),
			__GIT_HASH__: JSON.stringify(GIT_HASH)
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // only inlcude moment in English,
	],
	resolve: {
		alias: {
			styles: path.resolve('./src/styles'),
			jsdom: path.resolve('./fallbacks/jsdom')
		},
		modules: [
			path.resolve('./src'),
			path.resolve('./src/components'),
			path.resolve('./libs/goustouicomponents/src'),
			path.resolve('./node_modules')
		],
		extensions: ['.js', '.json', '.css', '.scss']
	},
	resolveLoader: {
		moduleExtensions: ['-loader']
	},
	node: {
		fs: 'empty'
	},
	stats: debug ? {
		hash: true,
		version: true,
		timings: true,
		assets: true,
		chunks: true,
		modules: true,
		reasons: true,
		children: true,
		source: true,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: true
	} : {
		hash: false,
		version: false,
		timings: false,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: false,
		publicPath: false
	}
}

if (build === 'development') {
	config.devtool = 'source-map'
	config.plugins.push(
		new SimpleProgressWebpackPlugin({ // Default options
			format: 'compact'
		}),
		new webpack.HotModuleReplacementPlugin()
	)
} else if (build === 'production') {
	config.devtool = false
	config.output.filename = '[name].bundle.[chunkhash].js'
	config.output.chunkFilename = '[chunkhash].js'

	config.plugins.push(
		new ExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true, ignoreOrder: true }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new UglifyJsPlugin({
			parallel: true,
			sourceMap: false,
			uglifyOptions: {
				mangle: true,
				compress: true,
				warnings: true,
				output: {
					comments: false
				}
			}
		}),
		new OptimizeCssAssetsPlugin()
	)
} else if (build === 'hmr') {
	config.output.publicPath = 'http://localhost:3001/'

	config.entry.unshift('webpack-dev-server/client?http://localhost:3001', 'webpack/hot/only-dev-server')

	config.module.rules[0].loaders.unshift('react-hot-loader')
	config.module.rules.push(
		{
			test: /\.css$/,
			loaders: [
				'style?sourceMap',
				'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
			],
		}
	)

	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	config.devtool = 'source-map'
}

module.exports = config
