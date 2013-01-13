// define individual Set view
FED.SetView = Backbone.View.extend({
  tagName: "li",
  template: $("#SetTemplate").html(),

	// Attach event handler to view elements
	events: {
    "click a.delete": "deleteSet"
	},

	// Delete Set model
	deleteSet: function (e) {
		e.preventDefault();

		var removedType = this.model.get("team1").toLowerCase();

		this.model.destroy();
    this.remove();

    /*console.log(FED.Game.getTypes());
    console.log(_.indexOf(FED.Game.getTypes()));
    console.log(removedType);*/

		if (_.indexOf(FED.Game.getTypes(), removedType) === -1) {
      FED.Game.$el.find("#filter select").children("[value='" + removedType + "']").remove();
    }
	},

	// Render view
  render: function () {
    var tmpl = _.template(this.template);;
    $(this.el).html(tmpl(this.model.toJSON()));
    // this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});