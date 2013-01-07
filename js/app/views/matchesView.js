 // # Define schedule view #
FED.MatchesView = Backbone.View.extend({
    // Define element (this.el)
    el: $("#schedule"),
    table: $("table", this.el),

    // Initialize view *(backbone method)*
    initialize: function () {
        // Specify collection for this view
        this.collection = new FED.Matches(FED.matchesData);
        // Render view
        this.render();

        this.$el.find("#filter").append(this.createSelect());

        // Attach custom event handler
        this.on("change:filterType", this.filterByDate, this);

        // Attach eventhandlers to collection
        this.collection.on("reset", this.render, this);
        this.collection.on("add", this.renderMatch, this);
        this.collection.on("remove", this.removeMatch, this);
    },

    // Render view *(backbone method)*
    render: function () {
        this.$el.find("#matches").html("");
        var self = this;

        _.each(this.collection.models, function (item) {
            self.renderMatch(item);
        }, this);
    },

    // Attach event handlers to view elements
    events: {
        "change #filter select": "setFilter",
        "click #add": "addMatch"
        // "click #showForm": "showForm"
    },

    // Render tournament *(custom method)*
    renderMatch: function (item) {
        // Create new instance of MatchView
        var matchesView = new FED.MatchView({
            model: item
        });

        // Append the rendered HTML to the views element
        this.table.append(matchesView.render().el);
    },

    showForm: function(e){
        e.preventDefault();
        $("#addFormn").slideToggle();
    },

    setFilter: function(e){
        e.preventDefault();
        $("#filter").slideToggle();
    },

    addMatch: function(e){
        e.preventDefault();
        var newModel = {};
        $("#addForm").children("input").each(function (i, el) {
            if ($(el).val() !== "") {
                newModel[el.id] = $(el).val();
            }
        });
        console.log(newModel)
        FED.matchesData.push(newModel);
        if (_.indexOf(this.getTypes(), newModel.date) === -1) {
            this.collection.add(new FED.Match(newModel));
            this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
        } else {
            this.collection.add(new FED.Match(newModel));
        }
    },

    // Remove tournament model
    removeMatch: function (removedModel) {
        var removed = removedModel.attributes;
        _.each(FED.matchesData, function (item) {
            if (_.isEqual(item, removed)) {
                FED.matchesData.splice(_.indexOf(FED.matchesData, item), 1);
            }
        });
    },

    // filter functies
    // Get dates for date select box
    getTypes: function () {
        return _.uniq(this.collection.pluck("date"), false, function (date) {
            return date.toLowerCase();
        });

    },

    // Create date select box
    createSelect: function () {
        var filter = this.$el.find("#filter"),
            select = $("<select/>", {
                html: "<option value='all'>all</option>"
            });
        _.each(this.getTypes(), function (item) {
            var option = $("<option/>", {
                value: item.toLowerCase(),
                text: item.toLowerCase()
            }).appendTo(select);
        });
        return select;
    },

    // Set filter
    setFilter: function (e) {
        this.filterType = e.currentTarget.value;

        // Trigger custom event handler
        this.trigger("change:filterType");
    },

    // Filter the collection
    filterByDate: function () {
        if (this.filterType === "all") {
            this.collection.reset(FED.matchesData);
        } else {
            this.collection.reset(FED.matchesData, { silent: true });
            var filterType = this.filterType,
                filtered = _.filter(this.collection.models, function (item) {
                return item.get("date").toLowerCase() === filterType;
            });

            this.collection.reset(filtered);
        }
    }


});
