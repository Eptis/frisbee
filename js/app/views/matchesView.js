 // # Define schedule view #
MatchesView = Backbone.View.extend({
    // Define element (this.el)
    el: $("#matches"),

    // Initialize view *(backbone method)*
    initialize: function () {
        // Specify collection for this view
        this.collection = new Matches(matchesData);
        // Render view
        this.render();
    },

    // Render view *(backbone method)*
    render: function () {
        var self = this;

        _.each(this.collection.models, function (item) {
            self.renderMatch(item);
        }, this);
    },

    // Render tournament *(custom method)*
    renderMatch: function (item) {
        // Create new instance of MatchView
        var tournamentView = new MatchView({
            model: item
        });

        // Append the rendered HTML to the views element
        this.$el.append(tournamentView.render().el);
    }
});
