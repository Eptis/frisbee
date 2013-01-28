 // # Define schedule view #
FED.MatchesView = Backbone.View.extend({
    // Define element (this.el)
    el: $("#page"),
    table: $("table", this.el),
    template: $("#matchesTemplate").html(),

    // Initialize view *(backbone method)*
    initialize: function () {
         var self = this;
        this.$el.html("");

        FED.hidePage();

        self.$el.html(self.template);
        // haal collectie op
        this.collection = new FED.Matches();
        this.collection.fetch({
            success: function(data) {
                console.log(self.collection)
                FED.matchesData = self.collection.toJSON();

                _.each(self.collection.models, function(model){
                    model.url = model.get('resource_uri');
                });
                FED.showPage();
                self.render();
                self.$el.find("#filter").append(self.createSelect());
            },
            error: function(){
                alert("Could not retreive data, please try again later")
            }
        });

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
    },

    renderMatch: function (item) {
        var matchView = new FED.MatchView({
            model: item
        });

        this.$el.find("#matches").append(matchView.render().el).removeClass("hide");
    },

/*    showForm: function(e){
        e.preventDefault();
        $("#addFormn").slideToggle();
    },*/

    addMatch: function(e){
        e.preventDefault();
        var newModel = {};
        $("#addForm").children("input").each(function (i, el) {
            if ($(el).val() !== "") {
                newModel[el.id] = $(el).val();
            }
        });
        FED.matchesData.push(newModel);
        if (_.indexOf(this.getTypes(), newModel.date) === -1) {
            this.collection.add(new FED.MatchModel(newModel));
            this.collection.reset(FED.matchesData);
            this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
        } else {
            this.collection.add(new FED.MatchModel(newModel));
            this.collection.reset(FED.matchesData);
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
        this.collection.reset(FED.matchesData);
        this.render();
    },

    // filter functies
    // Get dates for date select box
    getTypes: function () {
        return _.uniq(this.collection.pluck("start_time"), false, function (date) {
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
                text: dateFormat(item, "ddd, mmm dS, yyyy, hh:MM")
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
            // console.log(FED.matchesData)
            this.collection.reset(FED.matchesData, { silent: true });
            var filterType = this.filterType,
                filtered = _.filter(this.collection.models, function (item) {
                    return item.get("start_time").toLowerCase() === filterType;
                });
            this.collection.reset(filtered);
        }
    },

    updateCollection: function(){
        console.log("update matches")
         // Specify collection for this view
         var self = this;
        this.$el.html("");

        FED.hidePage();

        self.$el.html(self.template);
        // haal collectie op
        this.collection = new FED.Matches();
        this.collection.fetch({
            success: function(data) {
                console.log(self.collection)
                FED.matchesData = self.collection.toJSON();

                _.each(self.collection.models, function(model){
                    model.url = model.get('resource_uri');
                });
                FED.showPage();
                self.render();
                self.$el.find("#filter").append(self.createSelect());
            },
            error: function(){
                alert("Could not retreive data, please try again later")
            }
        });
    }


});
