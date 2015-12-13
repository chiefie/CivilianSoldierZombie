define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/board-template.hbs'
], function($, _, Backbone, Handlebars, BoardTemplate){

	var BoardView = Backbone.View.extend({
		el: $('main'),
		template: Handlebars.compile(BoardTemplate),

		events: {
			'click .character': 'onCharacterClick',
			'click #boat': 'onBoatClick',
			'click #reset': 'onGameReset'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:countdownTime', this.updateTimer);
		},

		onCharacterClick: function(e) {
			var $character = $(e.currentTarget);
			var $boatContainer = $('#boatContainer');
			var boatHasPassenger = this.model.hasPassenger($boatContainer);

			if (!this.model.getGameStatus()) {
				this.model.startsGame();
			}

			if (boatHasPassenger) {
				this.model.unloadPassenger($boatContainer);

				if (this.model.allArrived()) {
					$('#status').text('All arrived!');
				}
			} else {
				this.model.loadPassenger($boatContainer, $character);
			}
		},

		onBoatClick: function(e) {
			var $boat = $(e.currentTarget);
			var $boatContainer = $boat.closest('#boatContainer');
			var boatStatus = this.model.changeBoatPosition($boatContainer);

			if (!this.model.getGameStatus()) {
				this.model.startsGame();
			}

			if (boatStatus) {
				$('#status').text(boatStatus);
			} else {
				$('#status').empty();
			}
		},

		onGameReset: function() {
			$('#timer').show();
			this.render();
		},

		updateTimer: function(model) {
			if (model.get('countdownTime') === 0) {
				$('#reset').show();
				$('#timer').hide();
			}
			$('#timer').text('Time Remaining: ' + model.get('countdownTime') + ' seconds.');
		},

		render: function() {
			this.$el.html(this.template({}));
		}

	});

	return BoardView;
});