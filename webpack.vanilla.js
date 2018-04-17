const path = require('path');

module.exports = {
	watch: true,

	entry: {
		vanilla: './src/vanilla.js'
	},

	output: {
		library: 'AutoSuggestVanilla',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'public-production'),
		filename: '[name].js'
	}
}