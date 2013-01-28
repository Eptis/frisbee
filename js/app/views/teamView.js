// Model View

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

    // var removedType = this.model.get("Win").toLowerCase();

    // this.model.destroy();
    //   this.remove();

    // if (_.indexOf(FED.pool.getTypes(), removedType) === -1) {
    //       FED.pool.$el.find("#filter select").children("[value='" + removedType + "']").remove();
    //   }
  },


  // Render view
    render: function () {
        var tmpl = _.template(this.template);;
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});