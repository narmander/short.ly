const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = {
	mode: 'development',
	entry: './src',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 3005,
		hot: true,
		historyApiFallback: true,
		watchContentBase: true,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: { loader: 'babel-loader', query: { compact: false } },
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: {
					loader: 'url-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new webpack.DefinePlugin({
			'process.env.API_URL': JSON.stringify(env.API_URL),
			'process.env.GB_ACCESS_TOKEN': JSON.stringify(
				env.GB_ACCESS_TOKEN
			),
		}),
	],
	resolve: {
		alias: {
			Assets: path.resolve(__dirname, 'src/Assets'),
			API: path.resolve(__dirname, 'src/api'),
			Components: path.resolve(__dirname, 'src/Components'),
			SharedComponents:  path.resolve(__dirname, 'src/SharedComponents'),
			Storage: path.resolve(__dirname, 'src/storage'),
			Utils: path.resolve(__dirname, 'src/utils'),
			Styles: path.resolve(__dirname, 'src/Styles'),
		},
		extensions: ['.js', '.jsx', '.jpg', '.png'],
	},
};
