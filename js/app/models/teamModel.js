 // define team model
  FED.Team = Backbone.Model.extend({
    // Set model defaults *(backbone method)*
    defaults: {
      "team": "Teamnaam onbekend",
      "Win":"0",
      "Lost":"0",
      "Sw":"0",
      "Sl":"0",
      "Pw":"0",
      "Pl":"0"
    },
    initialize: function () {
      // console.log("team model init")
    }
});