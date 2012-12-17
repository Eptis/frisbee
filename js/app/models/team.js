 // define team model
  Team = Backbone.Model.extend({
    // Set model defaults *(backbone method)*
    defaults: {
      "team": "Teamnaam onbekend",
      "Win":"onbekend",
      "Lost":"onbekend",
      "Sw":"onbekend",
      "Sl":"onbekend",
      "Pw":"onbekend",
      "Pl":"onbekend"
    },
    initialize: function () {
      // console.log("team model init")
    }
});