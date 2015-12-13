requirejs.config({
	'baseUrl': '/js',
	'paths': {
		'jquery': '/node_modules/jquery/dist/jquery',
		'underscore': '/node_modules/underscore/underscore',
		'backbone': '/node_modules/backbone/backbone',
		'handlebars': '/node_modules/handlebars/dist/handlebars',
		'text': '/node_modules/text/text',
		'views': '/views',
		'models': '/models',
		'templates': '/templates'
	}
});

require([
	'app'
], function (App) {
	App.initialize();
});