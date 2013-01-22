// define game, a collection of sets
FED.Games = Backbone.Collection.extend({
  model: FED.MatchModel,
  url: FED.config.games_api_url,
  parse: function(data) {
      return data.objects;
  },
	initizialize:function() {

	},

	// comparator : function(game) {
	// 	return game.get("team1");
	// }

  comparator: function (a,b) {
    return b.get("set") - a.get("set");
  }


});