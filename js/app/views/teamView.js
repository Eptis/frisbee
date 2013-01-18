// # Define team view #
  FED.TeamView = Backbone.View.extend({
      // Define element (this.el)  
    tagName: "tr",
    
    // Set reference to template
      template: $("#teamTemplate").html(),

  events: {
      "click a.delete": "deleteTeam"
  },

  // Delete team model
  deleteTeam: function (e) {
    e.preventDefault();
      
    var removedWin = this.model.get("Win");
      
    this.model.destroy();
      this.remove();
      
    if (_.indexOf(FED.pool.getWins(), removedWin) === -1) {
          FED.pool.$el.find("#filter select").children("[value='" + removedWin + "']").remove();
      }
  },
    
     
  // Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});