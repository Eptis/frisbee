// # Define Pool collection #
  FED.PoolCollection = Backbone.Collection.extend({
      // Specifiy model for this collection
    model: FED.TeamModel,
    url: FED.config.pool_api_url,
    initizialize:function() {

  },
  parse : function(data){
    return data.objects[0].standings
  },

    comparator : function(pool) {
      return -pool.get("wins");
  }
});