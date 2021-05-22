const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

const isProd = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer({
	compress: true,
	future: {
		webpack5: true,
	},
	webpack(config, options) {
		const { dev, isServer } = options

		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});


		return config;
	},
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
})