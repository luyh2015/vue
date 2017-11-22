'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob');

const isProductionMode = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

exports.assetsPath = function (_path) {
	const assetsSubDirectory = isProductionMode
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
	options = options || {}

	const cssLoader = {
		loader: 'css-loader',
		options: {
			minimize: isProductionMode,
			sourceMap: options.sourceMap
		}
	}

	// generate loader string to be used with extract text plugin
	function generateLoaders (loader, loaderOptions) {
		const loaders = [cssLoader]
		if (loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: 'vue-style-loader'
			})
		} else {
			return ['vue-style-loader'].concat(loaders)
		}
	}

	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		less: generateLoaders('less'),
		sass: generateLoaders('sass', { indentedSyntax: true }),
		scss: generateLoaders('sass'),
		stylus: generateLoaders('stylus'),
		styl: generateLoaders('stylus')
	}
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
	const output = []
	const loaders = exports.cssLoaders(options)
	for (const extension in loaders) {
		const loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		})
	}
	return output
}

/**
 * 根据路径获取一个入口对象
 * @params globPath: glob风格的路径字符串；
 * @return 类似	{ main: './src/module/index/main.js', test: './src/module/test/test.js' }： 
 */
exports.getEntries = function (globPath) {
	const entries = {}
	glob.sync(globPath).forEach(function (entry) {
	  const tmp = entry.split('/').splice(-2)
	  const moduleName = tmp[0] || '';
	  entries[moduleName] = entry
	});
	return entries;
}
