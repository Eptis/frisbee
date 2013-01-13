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



        showSchedule: function (actions) {
            // console.log("schedule")
            var matchModel = new FED.MatchModel();
            this.matchesView = new FED.MatchesView({model: matchModel});
            this.matchesView.render();
        },

        showGame: function (actions) {
            // console.log("schedule")
            var setModel = new FED.SetModel();
            this.gameView = new FED.GameView({model: setModel});
            this.gameView.render();
        },

        showRanking: function (actions) {
            // console.log("schedule")
            var teamModel = new FED.TeamModel();
            this.poolView = new FED.PoolView({model: teamModel});
            this.poolView.render();
        }
    });

    // start app
    app_router = new FED.AppRouter();
    app_router.on("route:showSchedule", function(actions){
        var matchModel = new FED.MatchModel();
        this.matchesView = new FED.MatchesView({model: matchModel});
        this.matchesView.render();
    });

    Backbone.history.start({ pushState: false });

});

