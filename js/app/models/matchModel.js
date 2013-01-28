// # Define match model #
var FED = FED || {}

FED.MatchModel = Backbone.Model.extend({
  defaults: {
    "date": "unknown",
    "team_1": "unknown",
    "team_2": "unknown",
    "team_1_Score": "unknown",
    "team_2_Score": "unknown"
  }

});
