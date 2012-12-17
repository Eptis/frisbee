  // # Define Pool view #
  PoolView = Backbone.View.extend({
    // Define element (this.el)     
    el: $("#pool"),
    
    // Initialize view *(backbone method)*
      initialize: function () {
        console.log("Pool view init");
          
        // Specify collection for this view
        this.collection = new Pool(poolData);      
        // Render view
        this.render(this.collection.models);
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
      var teamView = new TeamView({
              model: team
          });
  
      // Append the rendered HTML to the views element
          this.$el.append(teamView.render().el);
      },
  
  });

  var pool_view = new PoolView();