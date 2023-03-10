const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
	publicPath: process.env.NODE_ENV === 'production' ? '/animethemes-shuffler/' : '/',
	transpileDependencies: true,
	configureWebpack: {
		watchOptions: {
			poll: true,
		},
	},
});
