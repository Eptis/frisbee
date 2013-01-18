// file: router.js
$(function(){
    FED.AppRouter = Backbone.Router.extend({
        // Define routes to pages
        routes: {
        // Define some URL routes
        '/schedule': 'showSchedule',
        '/game': 'showGame',
        '/ranking': 'showRanking',

        // Default
        '*path': 'defaultAction'
        },

        el: $("#page"),

        showSchedule: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var matchModel = new FED.MatchModel();
                self.matchesView = new FED.MatchesView({model: matchModel});
                $("#page").addClass("loaded");
            }, 1000)
        },

        showGame: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var setModel = new FED.SetModel();
                this.gameView = new FED.GameView({model: setModel});
                $("#page").addClass("loaded");
            }, 1000)
        },

        showRanking: function (actions) {
            var self = this;

            $("#page").removeClass("loaded");

            setTimeout(function(){
                var teamModel = new FED.TeamModel();
                this.poolView = new FED.PoolView({model: teamModel});
                $("#page").addClass("loaded");
            }, 1000)
        }
    });

    // start app
    FED.app_router = new FED.AppRouter();


    Backbone.history.start({ pushState: false });

});

