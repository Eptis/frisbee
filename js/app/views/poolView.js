// define teams view
FED.PoolView = Backbone.View.extend({
    el: $("#pool"),

    //Voert de onderstaande code uit wanneer de View wordt aangemaakt
    initialize: function () {
    this.list = this.$el.find("tbody.pool_list");
        this.collection = new FED.Pool(FED.poolData);
    
    this.render();
    
    this.$el.find("#filter").append(this.createSelect());

    // Attach custom event handler
    this.on("change:filterWin", this.filterByWin, this);

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
      this.$el.find("tbody.pool_list").html("");
          
          _.each(this.collection.models, function (item) {
          this.renderTeam(item);
        }, this);
    },
    
    // Render team *(custom method)*
      renderTeam: function (item) {
      // Create new instance of TeamView
      var teamView = new FED.TeamView({
              model: item
          });
  
      // Append the rendered HTML to the views element
          this.list.append(teamView.render().el);
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
      if (_.indexOf(this.getWins(), newModel.Win) === -1) {
           this.collection.add(new FED.Team(newModel));
          this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
      } else {
          this.collection.add(new FED.Team(newModel));
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
  },

    // Get wins for Win select box
  getWins: function () {
      return _.uniq(this.collection.pluck("Win"), false, function (win) {
          return win;
      });
  },

  // Create Win select box
  createSelect: function () {
      var filter = this.$el.find("#filter"),
          select = $("<select/>", {
              html: "<option value='all'>all</option>"
          });
      _.each(this.getWins(), function (item) {
          var option = $("<option/>", {
              value: item,
              text: item
          }).appendTo(select);
      });
      return select;
  },
  
  // Set filter
  setFilter: function (e) {
      this.filterWin = e.currentTarget.value;
      
    // Trigger custom event handler
    this.trigger("change:filterWin");
  },
  
  // Filter the collection
  filterByWin: function () {
      if (this.filterWin === "all") {
          this.collection.reset(FED.poolData);
      } else {
          this.collection.reset(FED.poolData, { silent: true });
          var filterWin = this.filterWin,
              filtered = _.filter(this.collection.models, function (item) {
              return item.get("Win") === filterWin;
          });
          this.collection.reset(filtered);
      }
  },
  
  showForm: function (e) {
    e.preventDefault();
      this.$el.find("#addTeam").slideToggle();
  }
});

  
  
  // Hier wordt de View aangemaakt
  FED.pool_view = new FED.PoolView();