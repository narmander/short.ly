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
		port: 8080,
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
			Components: path.resolve(__dirname, 'src/Components'),
			DB: path.resolve(__dirname, 'src/database'),
			Utils: path.resolve(__dirname, 'src/utils'),
			Components: path.resolve(__dirname, 'src/Components'),
			Styles: path.resolve(__dirname, 'src/Styles'),
		},
		extensions: ['.js', '.jsx', '.jpg', '.png'],
	},
};
