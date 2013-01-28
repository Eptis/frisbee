// file: router.js
$(function(){
    FED.currentPage = 0;

    FED.AppRouter = Backbone.Router.extend({
        // Define routes to pages
        routes: {
        // Define some URL routes
        '/schedule': 'showSchedule', //0
        '/games': 'showGames',       //1
        '/ranking': 'showRanking',   //2

        // Default
        '*path': 'showSchedule'
        },

        el: $("#page"),

        showSchedule: function (actions) {
            var self = this;
            $(".menuButton.schedule").addClass("active").siblings().removeClass("active")
            FED.hidePage();

            setTimeout(function(){
                var matchModel = new FED.MatchModel();
                self.matchesView = new FED.MatchesView({model: matchModel});
            }, 1000)

            FED.currentPage = 0;
        },

        showGames: function (actions) {
            var self = this;

            $(".menuButton.games").addClass("active").siblings().removeClass("active")
            FED.hidePage();

            setTimeout(function(){
                var gameModel = new FED.GameModel();
                self.gamesView = new FED.GamesView({model: gameModel});
                $("#page").addClass("loaded");
            }, 1000)
            FED.currentPage = 1;
        },


        showRanking: function (actions) {
            var self = this;
            $(".menuButton.ranking").addClass("active").siblings().removeClass("active")

            FED.hidePage();

            setTimeout(function(){
                var teamModel = new FED.TeamModel();
                self.poolView = new FED.PoolView({model: teamModel});
                $("#page").addClass("loaded");
            }, 1000)
            FED.currentPage = 2;

        }
    });

    // start app
    FED.app_router = new FED.AppRouter();


    Backbone.history.start({ pushState: false });





    $("#pulldown").on("click", function(){
        if(FED.currentPage == 0){
            FED.hidePage();
            FED.app_router.matchesView.updateCollection();
        }else if(FED.currentPage == 1){
            FED.hidePage();
            FED.app_router.gamesView.updateCollection();
        }else if(FED.currentPage == 2){
            FED.hidePage();
            FED.app_router.poolView.updateCollection();
        }
    })

});

