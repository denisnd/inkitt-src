const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: ['babel-polyfill', './src/index.jsx'],

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	plugins: [
		new ExtractTextPlugin('bundle.css')
	],

	module: {
		rules: [
			/*
			{
				enforce: "pre",
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "eslint-loader"
			},
			*/
			{
				test: /\.jsx?$/,
				loaders: [
				  'babel-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
				})
			},
			{
				test: /\.(png|svg|gif|jpeg|jpg)([\?]?.*)$/,
				loader: 'file-loader'
			}
		]
	}
};