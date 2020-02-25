const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	mode: 'production',
	stats: 'verbose',
	optimization: {
		minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
	},
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: '/.js$/',
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].css' }),
		new HtmlWebpackPlugin({
			template: './src/client//views/index.html'
        }),
        new WorkboxPlugin.GenerateSW(),
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: true,
			// Write Logs to Console
			verbose: true,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false
		})
	]
};
