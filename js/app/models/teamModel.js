 // define team model
  FED.TeamModel = Backbone.Model.extend({
    // Set model defaults *(backbone method)*
    defaults: {
      "team.name": "Teamnaam onbekend",
      "games_played":"0",
      "wins":"0",
      "losses":"0",
      "points_scored":"0",
      "points_allowed":"0",
      "plus_minus":"0"
    }
});