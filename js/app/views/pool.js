// define tournaments view
FED.PoolView = Backbone.View.extend({
    el: $("#pool"),

    initialize: function () {
        this.collection = new FED.Pool(FED.poolData);
    
    //this.render(this.collection.models);
    
    
    // //filter models from collection
    // var filtered = _.filter(this.collection.models, function(data) {
    //     return data.get("Win") == "3";
    // });
    
    this.render(this.collection.models);
    
    
    /*
    //reject models from collection
    var rejected = _.reject(this.collection.models, function(data) {
        return data.get("schedulingFormat") == "swiss";
    });
    
    this.render(rejected);
    */  
    },


    // Render view *(backbone method)*
      render: function (data) {
          var that = this;
          
          _.each(data, function (team) {
              that.renderTeam(team);
          }, this);
      },
    
    // Render tournament *(custom method)*
      renderTeam: function (team) {
      // Create new instance of TournamentView
      var teamView = new FED.TeamView({
              model: team
          });
  
      // Append the rendered HTML to the views element
          this.$el.append(teamView.render().el);
      },
  
  });

  var pool_view = new FED.PoolView();