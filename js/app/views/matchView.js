
// # Define Match view #
FED.MatchView = Backbone.View.extend({
    tagName: "tr",
    template: $("#matchTemplate").html(),

  // Attach event handler to view elements
  events: {
      "click .delete": "deleteMatch"
  },

    // Delete Match model
  deleteMatch: function (e) {
    e.preventDefault();

    var removedType = this.model.get("date").toLowerCase();

    this.model.destroy();
      this.remove();

    if (_.indexOf(FED.matchesView.getTypes(), removedType) === -1) {
          FED.matchesView.$el.find("#filter select").children("[value='" + removedType + "']").remove();
      }
  },

    render: function () {
        var tmpl = _.template(this.template);

        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});
