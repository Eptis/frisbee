// # Define Pool collection #
  FED.PoolCollection = Backbone.Collection.extend({
      // Specifiy model for this collection
    model: FED.TeamModel,
    url: FED.config.pool_api_url,
    parse: function(data){

      return data.objects[0].standings;
    },
    initizialize:function() {

  },

    comparator : function(pool) {
      return pool.get("Win");
  }
});