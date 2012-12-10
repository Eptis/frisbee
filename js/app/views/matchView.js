// # Define tournament view #
MatchView = Backbone.View.extend({
    tagName: "tr",
    template: $("#matchesTemplate").html(),

    render: function () {
        var tmpl = _.template(this.template);

        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});
