// # Define schedule collection #
FED.Matches = Backbone.Collection.extend({
    // Specifiy model for this collection
    model: FED.MatchModel,
    url: FED.config.schedule_api_url,
    parse: function(data) {
        return data.objects;
    },

    // hetzelfde als for each
    // comparator: function(a, b) {
    //     var a = a.get("team1");
    //     var b = b.get("team1");
    //     if(a < b) {
    //       return 1;
    //     } else if (a > b) {
    //       return -1;
    //     } else {
    //       return 0;
    //     }
    // }
    comparator : function(matches) {
      return matches.get("date");
    }

});

