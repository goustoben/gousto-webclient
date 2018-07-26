const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

module.exports = {
	context: path.resolve(__dirname, '../../nodeserver/src'),
	mode: 'none',
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory&compact',
				exclude: /(node_modules)/,
			},
			{
				test: /\.css$/,
				loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader',
			},
			{
				test: /\.scss$/,
				loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!sass-loader',
			},
			{
				test: /\.json$/,
				loader: 'null-loader',
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'null-loader',
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'null-loader',
			},
			{	test: /\.jpg$/,
				loader: 'null-loader',
			},
			{ 	test: /\.gif$/,
				loader: 'null-loader',
			},
			{ 	test: /\.ico$/,
				loader: 'null-loader',
			},
			{
				test: /\.png$/,
				loader: 'null-loader',
			},
			{
				test: /\.(graphql|gql)$/,
				loader: 'graphql-tag/loader',
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			__DEV__: false,
			__PROD__: true,
			__HMR__: false,
			__SERVER__: false,
			__CLIENT__: true,
			__CLOUDFRONT_URL__: JSON.stringify('test.com'),
			__CLIENT_PROTOCOL__: JSON.stringify('https'),
			__ENV__: JSON.stringify('production'),
			__DOMAIN__: JSON.stringify('gousto.local'),
			__TEST__: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
			__GIT_HASH__: JSON.stringify('production'),
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // only inlcude moment in English
	],

	devtool: 'cheap-module-source-map',

	resolve: {
		alias: {
			spinkit: path.resolve(__dirname, '../../nodeserver/node_modules/spinkit'),
			bootstrap: path.resolve(__dirname, '../../nodeserver/node_modules/bootstrap'),
		},
		modules: [
			path.resolve(__dirname, '../src'),
			path.resolve(__dirname, '../src/components'),
		],
		extensions: ['.js', '.json'],
	},
}
