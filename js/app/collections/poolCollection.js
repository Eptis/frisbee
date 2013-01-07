// # Define Pool collection #
  FED.Pool = Backbone.Collection.extend({
      // Specifiy model for this collection
    model: FED.Team,
    initizialize:function() {
    
  },

    comparator : function(pool) {
      return pool.get("Win");
  }
});