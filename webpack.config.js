const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
	context: __dirname,

	entry: [
		'babel-polyfill',
		'./src/index.js',
	],

	output: {
		path: __dirname + '/public',
		filename: 'client.min.js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [ path.resolve(__dirname, 'src') ],
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				],

			},
			/*
			{
				test: /\.jsx?$/,
				loaders: [ 'react-hot-loader', 'babel-loader' ],
				include: [ path.resolve(__dirname, 'src') ]
			},
			*/
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			{
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]__[hash:base64:5]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: { limit: 10000 }
			},
		]
	},

	resolve: {
		alias: {
			Config: path.resolve(__dirname, 'src/config'),
			Redux: path.resolve(__dirname, 'src/redux'),
			Services: path.resolve(__dirname, 'src/services'),
			CSS: path.resolve(__dirname, 'src/assets/css'),
			Images: path.resolve(__dirname, 'src/assets/img'),
			Meta: path.resolve(__dirname, 'src/meta'),
			Components: path.resolve(__dirname, 'src/components'),
			moment$: 'moment/moment.js'
		}
	},
	devtool: 'inline-sourcemap',
	plugins: [
		new HardSourceWebpackPlugin,
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
				//'NODE_ENV': '"testing"'
			}
		}),
		new HtmlWebpackPlugin({
			title: 'Dashboard',
			template: './src/assets/index.html',
			inject: 'body'
		}),
		new DashboardPlugin()
	]
}
