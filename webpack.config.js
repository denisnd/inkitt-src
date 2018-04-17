const path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	mode: 'development',

	entry: './src/index.jsx',

	watch: !!process.env.WATCH,

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	module: {
		rules: [
	      {
        test: /\.jsx?$/,
	        loaders: [
	          'babel-loader',
	        ],
	        exclude: /node_modules/,
	      }
		]
	}
};