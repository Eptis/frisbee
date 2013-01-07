<<<<<<< HEAD
// # Define tournament view #
MatchView = Backbone.View.extend({
    tagName: "tr",
    template: $("#matchesTemplate").html(),

=======
// # Define Match view #
FED.MatchView = Backbone.View.extend({
    tagName: "tr",
    template: $("#matchesTemplate").html(),

  // Attach event handler to view elements
  events: {
      "click a.delete": "deleteMatch"
  },

    // Delete Match model
  deleteMatch: function (e) {
    e.preventDefault();

    var removedType = this.model.get("date").toLowerCase();

    this.model.destroy();
      this.remove();

    if (_.indexOf(FED.matches.getTypes(), removedType) === -1) {
          FED.matches.$el.find("#filter select").children("[value='" + removedType + "']").remove();
      }
  },

>>>>>>> dennis
    render: function () {
        var tmpl = _.template(this.template);

        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});
