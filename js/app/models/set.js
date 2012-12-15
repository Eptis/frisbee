// define set model
FED2.Set = Backbone.Model.extend({
  defaults: {
    set: "undefined",
    team1: "team 1",
    team1Score: "undefined",
    team2: "team 2",
    team2Score: "undefined"
  },

  initialize: function () {
    // console.log("set model has init");
  }
});
// console.log("set model has loaded!");