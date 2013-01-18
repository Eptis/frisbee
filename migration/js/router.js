/* filename: js/router.js */

(function () {
	"use strict";
	define([
		'jquery',
		'underscore',
		'backbone',
		'config',
		'models/tournament',
		// 'models/match',
		'views/home/home',
		// 'views/schedule/schedule',
		'views/tournament/tournament'

	], function ($, _, Backbone, config, TournamentModel, MatchModel, ScheduleView, homeView, TournamentView) {
		var AppRouter = Backbone.Router.extend({
			tournamentView:"",
			routes: {
				// Define some URL routes
				'tournament': 'showTournament',
				'schedule': 'showSchedule',
				// Default
				'*path': 'defaultAction'
			},

			showTournament: function (actions) {
				// Call render on the module we loaded in via the dependency array

				var tournamentModel = new TournamentModel({id:config.tournamentID});
				this.tournamentView = new TournamentView({model: tournamentModel});
				this.tournamentView.render();
			},

			showSchedule: function (actions) {
				// Call render on the module we loaded in via the dependency array
				var matchModel = new MatchModel({id:config.tournamentID});
				this.scheduleView = new ScheduleView({model: matchModel});
				this.scheduleView.render();
			},

			defaultAction: function (actions) {
				// We have no matching route, lets display the home page
				homeView.render();
			}
		});
		var initialize = function () {
			var app_router = new AppRouter();
			Backbone.history.start();
		};
		return {
			initialize: initialize
		};
	});
}());