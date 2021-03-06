//Collection View

// define teams view
FED.PoolView = Backbone.View.extend({
    el: $("#page"),
    template: $("#poolTemplate").html(),

    // Initialize view *(backbone method)*
    initialize: function () {
      var self = this;
      this.$el.html("");

      FED.hidePage();

      // Element #page 
      self.$el.html(self.template);

      // haal collectie op
      this.collection = new FED.PoolCollection();
      this.collection.fetch({
            success: function(data) {
                // console.log(self.collection)
                FED.poolData = self.collection.toJSON();
                _.each(self.collection.models, function(model){
                    model.url = model.get('resource_uri');
                });
                FED.showPage();
                self.render();
                // self.$el.find("#filter").append(self.createSelect());
            }
        });

      // // Attach custom event handler
      // this.on("change:filterType", this.filterByType, this);

      // Attach eventhandlers to collection
      this.collection.on("reset", this.render, this);
      
  },



  // Render the view
    render: function () {
      this.$el.find("#pool_list").html("");
      var self = this;

        _.each(this.collection.models, function (item) {
            self.renderTeam(item);
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

  /*    
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
  },   */

  updateCollection: function () {
    var self = this;
      this.$el.html("");

      FED.hidePage();

      self.$el.html(self.template);

      // haal collectie op
      this.collection = new FED.PoolCollection();
      this.collection.fetch({
            success: function(data) {
                // console.log(self.collection)
                FED.poolData = self.collection;
                _.each(self.collection.models, function(model){
                    model.url = model.get('resource_uri');
                });
                FED.showPage();
                self.render();
                // self.$el.find("#filter").append(self.createSelect());
            },
            error: function(){
                    alert("Could not retreive data, please try again later")
            }
        });
  }
});




  // FED.pool_view = new FED.PoolView();