//const CrudeTimingPlugin = require('./crude-time-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
	context: __dirname,

	entry: [
		'babel-polyfill',
		'./src/index.js'
	],

	output: {
		filename: 'client.min.js',
		path: path.resolve(__dirname, 'public')
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				//loader: 'babel-loader',
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				},
				include: [ path.resolve(__dirname, 'src') ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]___[local]--[hash:base64:5]'
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: {
					loader: 'url-loader'
				}
			}
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

	plugins: [
		//new CrudeTimingPlugin,
		new HardSourceWebpackPlugin,
		new CleanWebpackPlugin(['public']),
		new HtmlWebpackPlugin({
			template: './src/assets/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		//new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				parallel: true,
				cache: true,
				compress: {
					arrows: false,
					booleans: false,
					collapse_vars: false,
					comparisons: false,
					computed_props: false,
					hoist_funs: false,
					hoist_props: false,
					hoist_vars: false,
					if_return: false,
					inline: false,
					join_vars: false,
					keep_infinity: true,
					loops: false,
					negate_iife: false,
					properties: false,
					reduce_funcs: false,
					reduce_vars: false,
					sequences: false,
					side_effects: false,
					switches: false,
					top_retain: false,
					toplevel: false,
					typeofs: false,
					unused: false,

					// Switch off all types of compression except those needed to convince
					// react-devtools that we're using a production build
					conditionals: true,
					dead_code: true,
					evaluate: true
				},
				mangle: true
			}
		})
	]
}
