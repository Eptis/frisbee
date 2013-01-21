// define teams view
FED.PoolView = Backbone.View.extend({
    el: $("#page"),
    collectionWrapper: $("#pool_list"),

    initialize: function () {
      this.list = this.$collectionWrapper;
      this.$el.html("");

      this.collection = new FED.PoolCollection(FED.poolData);

      //this.render(this.collection.models);
      // this.render();
        var template = _.template($("#poolTemplate").html(),{teams: this.collection.models});
        this.$el.html(template);
      //   this.render();
      this.$el.find("#filter").append(this.createSelect());
      this.render();

      // // Attach custom event handler
      this.on("change:filterType", this.filterByType, this);

      // Attach eventhandlers to collection
      this.collection.on("reset", this.render, this);
      this.collection.on("add", this.renderTeam, this);
      this.collection.on("remove", this.removeTeam, this);
    },

    // Attach event handlers to view elements
  events: {
      "change #filter select": "setFilter",
    "click #add": "addTeam",
    "click #showForm": "showForm"
  },



  // Render the view
    render: function () {
      this.$el.find("#pool_list").html("");


        _.each(this.collection.models, function (item) {
            this.renderTeam(item);
        }, this);
    },

    // Render team *(custom method)*
      renderTeam: function (item) {
      // Create new instance of TournamentView
      var teamView = new FED.TeamView({
              model: item
          });

      // Append the rendered HTML to the views element
        this.$el.find("#pool_list").append(teamView.render().el);
      },

      // Add team model
      addTeam: function (e) {
      e.preventDefault();
      var newModel = {};
      $("#addTeam").children("input").each(function (i, el) {
          if ($(el).val() !== "") {
              newModel[el.id] = $(el).val();
        }
      });
      FED.poolData.push(newModel);
      if (_.indexOf(this.getTypes(), newModel.Win) === -1) {
           this.collection.add(new FED.Team(newModel));
           this.collection.reset(FED.poolData);
          this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
      } else {
          this.collection.add(new FED.Team(newModel));
          this.collection.reset(FED.poolData);
      }
  },

    // Remove team model
  removeTeam: function (removedModel) {
      var removed = removedModel.attributes;
      _.each(FED.poolData, function (item) {
          if (_.isEqual(item, removed)) {
              FED.poolData.splice(_.indexOf(FED.poolData, item), 1);
          }
      });
      this.collection.reset(FED.poolData);
  },

    // Get types for Win select box
  getTypes: function () {
      return _.uniq(this.collection.pluck("Win"), false, function (type) {
          return type.toLowerCase();
      });
  },

  // Create Win select box
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
  filterByType: function () {
      if (this.filterType === "all") {
          this.collection.reset(FED.poolData);
      } else {
          this.collection.reset(FED.poolData, { silent: true });
          var filterType = this.filterType,
              filtered = _.filter(this.collection.models, function (item) {
              return item.get("Win").toLowerCase() === filterType;
          });
          this.collection.reset(filtered);
      }
  },

  showForm: function (e) {
    e.preventDefault();
      this.$el.find("#addTeam").slideToggle();
  }
});




  // FED.pool_view = new FED.PoolView();