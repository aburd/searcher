const webpack = require('webpack')

var config = {
	entry: './src/app.js',
	output: {
		path: './public',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: "node_modules",
			loader: 'babel-loader'
		}]
	}
}

module.exports = config