// define game, a collection of sets
FED.Game = Backbone.Collection.extend({
    model: FED.Set,
	initizialize:function() {
		
	},
	
	// comparator : function(game) {
	// 	return game.get("team1");
	// }

  comparator: function (a,b) {
    return b.get("set") - a.get("set");
  }

	
});