
seajs.config({

	// 路径配置
	paths: {
		'modules': 	'js/modules/',
		'libs': 	'js/libs/',
		'plug': 	'js/plug/'
	},
	// 别名配置
	alias: {
		'Zepto': 		'libs/zepto-1.1.6.min',
		'touch': 'libs/touch',
		'public': 		'modules/public',
		'swiper': 	'plug/idangerous.swiper-2.1.min',
		'plugins': 		'libs/plugins',
		'loadmask': 	'plug/jquery.loadmask.min',
		'jqgrid': 		'plug/jquery.jqGrid',
		'jqgrid-zh': 	'plug/grid.locale-en'
	},

	

	// 变量配置
	vars: {
		'locale': 'zh-cn'
	},

	// 映射配置
	map: [
		// ['http://example.com/js/app/', 'http://localhost/js/app/']
	],

	// 插件
	plugins: ['style', 'shim', 'flush'],

	// 预加载项
	preload: [
		// Function.prototype.bind ? '' : 'es5-safe',
		// this.JSON ? '' : 'json'
	],

	// 调试模式
	debug: true,

	// Sea.js 的基础路径
	 base: './',

	// 文件编码
	charset: 'utf-8'

	

});

