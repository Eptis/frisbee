// file: router.js
$(function(){
    FED.AppRouter = Backbone.Router.extend({
        // Define routes to pages
        routes: {
        // Define some URL routes
        '/schedule': 'showSchedule',
        '/games': 'showGames',
        '/ranking': 'showRanking',
        '/games/:id': 'showGame',

        // Default
        '*path': 'showSchedule'
        },

        el: $("#page"),

        showSchedule: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var matchModel = new FED.MatchModel();
                self.matchesView = new FED.MatchesView({model: matchModel});
            }, 1000)
        },

        showGames: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var gameModel = new FED.GameModel();
                self.gamesView = new FED.GamesView({model: gameModel});
                $("#page").addClass("loaded");
            }, 1000)
        },

        showGame: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var gameModel = new FED.GameModel();
                self.gamesView = new FED.GamesView({model: gameModel});
                $("#page").addClass("loaded");
            }, 1000)
        },

        showRanking: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var teamModel = new FED.TeamModel();
                self.poolView = new FED.PoolView({model: teamModel});
                $("#page").addClass("loaded");
            }, 1000)
        }
    });

    // start app
    FED.app_router = new FED.AppRouter();


    Backbone.history.start({ pushState: false });

});

