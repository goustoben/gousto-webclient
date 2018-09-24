const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ExitCodePlugin = require('./exitCode')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const build = process.env.NODE_ENV || 'development'
const envName = process.env.npm_config_gousto_webclient_environment_name || 'local'
const domain = process.env.npm_config_gousto_webclient_domain || 'gousto.local'
const clientProtocol = process.env.npm_config_gousto_webclient_client_protocol || 'http'
const cloudfrontUrl = process.env.npm_config_gousto_webclient_cloudfront_url || ''

const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
// eslint-disable-next-line no-console
console.log(`================\nSERVER BUILD: ${build}, ENVIRONMENT: ${envName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}"\n================`)

const debug = false

const config = {
	name: 'server',
	mode: build,
	context: path.resolve(__dirname, '..'),
	target: 'node',
	entry: [
		'@babel/polyfill',
		'./server/main.js',
	],
	output: {
		path: path.resolve('./dist'),
		filename: 'server.js',
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
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../server'),
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
				include: [
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../server'),
				],
			},
			{
				test: /\.css$/,
				loader: 'css-loader/locals?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
			},

			{
				test: /\.scss$/,
				loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
			},
			{
				test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
			{
				test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff2',
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000',
			},
			{	test: /\.jpg$/,
				loader: 'file-loader',
			},
			{ 	test: /\.gif$/,
				loader: 'file-loader',
			},
			{ 	test: /\.ico$/,
				loader: 'file-loader',
			},
			{	test: /\.svg$/,
				loaders: [
					'svg-url-loader',
					'image-webpack-loader',
				],
			},
			{
				test: /\.(graphql|gql)$/,
				loader: 'graphql-tag/loader',
			},
		],
	},
	plugins: [
		ExitCodePlugin,
		new webpack.DefinePlugin({
			__DEV__: build === 'development',
			__PROD__: build === 'production',
			__HMR__: build === 'hmr',

			__SERVER__: true,
			__CLIENT__: false,
			__TEST__: false,

			__ENV__: JSON.stringify(envName),
			__DOMAIN__: JSON.stringify(domain),
			__CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
			__CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
			'process.env.NODE_ENV': JSON.stringify(build),
		}),
	],
	resolve: {
		alias: {
			spinkit: path.resolve(__dirname, '../node_modules/spinkit'),
		},
		modules: [
			path.resolve(__dirname, '../src'),
			path.resolve(__dirname, '../src/components'),
			path.resolve(__dirname, '../node_modules/spinkit'),
		],
		extensions: ['.js', '.json', '.css'],
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
	},
	externals: [nodeExternals()],
	devtool: 'sourcemap',
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
		publicPath: true,
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
		publicPath: false,
	},
}

if (build === 'development') {
	config.devtool = 'source-map'
	config.plugins.push(
		new SimpleProgressWebpackPlugin({ // Default options
			format: 'compact'
		})
)
} else {
	config.devtool = false
	config.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),

		new UglifyJsPlugin({
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				mangle: false,
				compress: true,
				output: {
					comments: false
				},
				warnings: true,
			},
		})
	)
}

module.exports = config
