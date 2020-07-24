const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: './',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 8080,
		hotOnly: true,
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
		new HtmlWebpackPlugin({ template: './src/index.html'}),
	],
	resolve: {
		alias: {
			Assets: path.resolve(__dirname, 'src/Assets'),
			Components: path.resolve(__dirname, 'src/Components'),
            Styles: path.resolve(__dirname, 'src/Styles'),
            Components: path.resolve(__dirname, 'src/Components'),
			Utils: path.resolve(__dirname, 'src/utils'),
		},
		extensions: ['.js', '.jsx', '.jpg', '.png'],
	},
};

