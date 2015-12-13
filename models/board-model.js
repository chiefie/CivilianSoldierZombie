define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){

	var BoardModel = Backbone.Model.extend({
		defaults: {
			hasStarted: false,
			countdownTime: 10
		},

		resetGame: function() {
			this.set('hasStarted', false);
			this.set('countdownTime', 10);
		},

		getGameStatus: function() {
			return this.get('hasStarted');
		},

		startsGame: function() {
			this.set('hasStarted', true);
			this.startTimer();
		},

		startTimer: function() {
			var self = this;
			var timer = this.get('countdownTime');

			var timerId = setInterval(function() {
				if (timer > 0) {
					--timer;
					self.set('countdownTime', timer);
				} else {
					clearInterval(timerId);
				}
			}, 1000);
		},

		hasPassenger: function(boatContainer) {
			var $boatPassenger = boatContainer.find('#boatSeat').children();

			return $boatPassenger.length;
		},

		loadPassenger: function(boatContainer, boatPassenger) {
			var $boatSeat = boatContainer.find('#boatSeat');

			$boatSeat.append(boatPassenger);
		},

		unloadPassenger: function(boatContainer) {
			var boatPosition = this.checkBoatPosition(boatContainer);
			var $boatPassenger = boatContainer.find('.character');
			var $shore = $('.shore').filter('.' + boatPosition).first();

			$shore.append($boatPassenger);
		},

		checkShores: function(boatContainer) {
			var boatPosition = this.checkBoatPosition(boatContainer);
			var $shore = $('.shore').filter('.' + boatPosition).first();
			var shorePopulationCount = $shore.children().length;
			var boatSafeToTravel = {};

			switch(shorePopulationCount) {
				case 2:
					var remainingPopulace = [];
					$shore.children().each(function(index, element) {
						remainingPopulace.push($(element).text());
					});

					var hasZombie = $.inArray('Zombie', remainingPopulace) > -1 ? true : false;
					var hasSoldier = $.inArray('Soldier', remainingPopulace) > -1 ? true : false;
					var hasCivilian = $.inArray('Civilian', remainingPopulace) > -1 ? true : false;

					if (hasZombie && hasSoldier) {
						boatSafeToTravel.status = false;
						boatSafeToTravel.message = 'Danger!! Soldier is going to shoot the Zombie!';
					}

					if (hasZombie && hasCivilian) {
						boatSafeToTravel.status = false;
						boatSafeToTravel.message = 'Danger!! Zombie is going to eat the Civilian!';
					}

					if (hasCivilian && hasSoldier) {
						boatSafeToTravel.status = true;
					}

					console.log(boatSafeToTravel);

					break;
				case 1, 3:
				default:
					boatSafeToTravel.status = true;
					break;
			}

			return boatSafeToTravel;
		},

		checkBoatPosition: function(boatContainer) {
			var boatPosition = null;

			if (boatContainer.hasClass('source')) {
				boatPosition = 'source';
			}

			if (boatContainer.hasClass('destination')) {
				boatPosition = 'destination';
			}

			return boatPosition;
		},

		changeBoatPosition: function(boatContainer) {
			var boatSafeToTravel = this.checkShores(boatContainer);

			if (boatSafeToTravel.status) {
				boatContainer.toggleClass('source').toggleClass('destination');
			} else {
				return boatSafeToTravel.message;
			}
		},

		allArrived: function() {
			var $destination = $('.shore.destination');
			return $destination.children().length === 3 ? true : false;
		}

	});

	return BoardModel;
});