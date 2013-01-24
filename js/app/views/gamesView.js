FED.GamesView = Backbone.View.extend({
  // Define element (this.el)
  el: $("#page"),
  table: $("table", this.el),
  template: $("#gamesTemplate").html(),
  // Initialize view *(backbone method)*
  initialize: function () {
    // Specify collection for this view
     var self = this;
    this.$el.html("");

    FED.hidePage();

    self.$el.html(self.template);
    // haal collectie op
    this.collection = new FED.Games();
    this.collection.fetch({
      success: function(data) {
        // console.log(data);
        console.log(self.collection);
        FED.gameData = self.collection.toJSON();

        _.each(self.collection.models, function(model){
            model.url = model.get('resource_uri');
        });
        FED.showPage();
        self.render();
        self.$el.find("#filter").append(self.createSelect());
      }
    });



    // Attach custom event handler
    this.on("change:filterType", this.filterByDate, this);

    // Attach eventhandlers to collection
    this.collection.on("reset", this.render, this);
    this.collection.on("add", this.renderGame, this);
    // this.collection.on("remove", this.removeGame, this);
  },

  // Render view *(backbone method)*
  render: function () {
    this.$el.find("#games").html("");
    var self = this;
    _.each(this.collection.models, function (item) {
        self.renderGame(item);
    }, this);


  },

  //Attach event handlers to view elements
  events: {
    "change #filter select": "setFilter",
    "click .model": "getClickedModel"
  },

  renderGame: function (item) {
    var gameView = new FED.GameView({
        model: item
    });

    this.$el.find("#games").append(gameView.render().el);
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
            this.collection.reset(FED.gameData);
        } else {
            // console.log(FED.matchesData)
            this.collection.reset(FED.gameData, { silent: true });
            var filterType = this.filterType,
                filtered = _.filter(this.collection.models, function (item) {
                    return item.get("start_time").toLowerCase() === filterType;
                });
            this.collection.reset(filtered);
        }
    },

    getClickedModel: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        var item = this.collection.get(id);

         item.save( item.toJSON(), {
              // The second parameter takes request options
              success: function(data) {
                  // On succes set the new url for the model
                  item.url = item.get('resource_uri');
              },
              error: function(data) {
                  // On error log the error in the console
                  console.log('error');
              },
              // Define an authorization header to allow for posting to the API
              headers: {
                  Authorization: FED.config.header_access
              }
        });
   }

});