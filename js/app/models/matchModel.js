// # Define match model #
var FED = FED || {}

FED.MatchModel = Backbone.Model.extend({
  defaults: {
    "date": "unknown",
    "team1": "unknown",
    "team2": "unknown",
    "team1Score": "unknown",
    "team2Score": "unknown"
  }

});
