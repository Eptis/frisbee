// # Define Match view #
FED.GameView = Backbone.View.extend({
  tagName: "tr",
  template: $("#gameTemplate").html(),

  // Attach event handler to view elements
  events: {
    "click .delete": "deleteGame"
  },

    // Delete Match model
  deleteGame: function (e) {
  e.preventDefault();

  // var removedType = this.model.get("start_time").toLowerCase();

  this.model.destroy();
  this.remove();


  // if (_.indexOf(FED.app_router.gamesView.getTypes(), removedType) === -1) {
  //   FED.app_router.gamesView.$el.find("#filter select").children("[value='" + removedType + "']").remove();
  // }
  },

  render: function () {
    var tmpl = _.template(this.template);

    $(this.el).html(tmpl(this.model.toJSON()));
    return this;
  }
});
