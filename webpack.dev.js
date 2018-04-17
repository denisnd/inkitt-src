const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
	devtool: 'inline-source-map',

	watch: !!process.env.WATCH,

	output: {
		path: path.resolve(__dirname, 'public-development'),
		filename: '[name].js'
	},
});