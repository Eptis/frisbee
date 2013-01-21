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
            console.log(self.collection)
            _.each(self.collection.models, function(model){
                model.url = model.get('resource_uri');
            });
            FED.showPage();
            self.render();
            // self.$el.find("#filter").append(self.createSelect());
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

  // Attach event handlers to view elements
  // events: {
  //     "change #filter select": "setFilter",
  //     "click #add": "addMatch"
  // },

  renderGame: function (item) {
    var gameView = new FED.GameView({
        model: item
    });

    this.$el.find("#games").append(gameView.render().el);
  },

});