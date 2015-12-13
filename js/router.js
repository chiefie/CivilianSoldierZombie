define([
	'jquery',
	'underscore',
	'backbone',
	'views/board-view',
	'models/board-model'
], function($, _, Backbone, BoardView, BoardModel) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'showBoard'
		}
	});

	var initialize = function() {
		var app_router = new AppRouter;

		app_router.on('route:showBoard', function(actions) {
			var boardModel = new BoardModel();
			var boardView = new BoardView({model: boardModel});
			boardView.render();
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});