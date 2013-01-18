// # Define Pool collection #
  FED.PoolCollection = Backbone.Collection.extend({
      // Specifiy model for this collection
    model: FED.TeamModel,
    initizialize:function() {

  },

    comparator : function(pool) {
      return pool.get("Win");
  }
});