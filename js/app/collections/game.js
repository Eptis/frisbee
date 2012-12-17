// define collection
FED.Game = Backbone.Collection.extend({
  model: FED.Set,

  comparator: function (a,b) {
    return b.get("set") - a.get("set");
  }
});
// console.log("game collection has loaded!");