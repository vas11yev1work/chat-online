module.exports = {
	mode: 'universal',
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
			{hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
		]
	},
	loading: {color: '#fff'},
	css: [
		'~/assets/reset.css'
	],
	plugins: [
		{
			src: '@/plugins/socket',
			ssr: false
		}
	],
	buildModules: [],
	modules: [],
	build: {
		extend(config, ctx) {
		}
	}
}
