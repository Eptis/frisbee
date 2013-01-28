// # Define schedule collection #
FED.Matches = Backbone.Collection.extend({
    // Specifiy model for this collection
    model: FED.MatchModel,
    url: FED.config.schedule_api_url,
    parse: function(data) {
        return data.objects;
    },

    comparator : function(matches) {
      return matches.get("start_time");
    }

});

