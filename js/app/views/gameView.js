// define sets view
FED.GameView = Backbone.View.extend({
  el: $("#page"),

  initialize: function () {
		this.list = this.$el;
    this.$el.html("");

    this.collection = new FED.GameCollection(FED.gameData);

		// this.render();

    var template = _.template($("#gameTemplate").html(),{games: this.collection.models});
    this.$el.html(template);
		this.$el.find("#filter").append(this.createSelect());

		// Attach custom event handler
		this.on("change:filterType", this.filterByType, this);

		// Attach eventhandlers to collection
    this.collection.on("reset", this.render, this);
		this.collection.on("add", this.rendergame, this);
		this.collection.on("remove", this.removeSet, this);
  },

	// Attach event handlers to view elements
	events: {
    "change #filter select": "setFilter",
		"click #add": "addSet",
		"click #showForm": "showForm"
	},

	// Render the view
  render: function () {
		this.$el.html("");


		// _.each(this.collection.models, function (item) {
	 //  	this.rendergame(item);
	 //  }, this);
  },

  rendergame: function (item) {
    var setView = new FED.SetView({
      model: item
    });

    this.list.append(setView.render().el);
  },

	// Add Set model
	addSet: function (e) {
    e.preventDefault();
    var newModel = {};
    $("#addSet").children("input").each(function (i, el) {
      if ($(el).val() !== "") {
        newModel[el.id] = $(el).val();
      }
    });
    FED.gameData.push(newModel);
    if (_.indexOf(this.getTypes(), newModel.team1) === -1) {
      this.collection.add(new FED.SetModel(newModel));
      this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
    } else {
      this.collection.add(new FED.SetModel(newModel));
    }
    // re-render list
    // this.render();
    this.collection.reset(FED.gameData);
	},

	// Remove Set model
	removeSet: function (removedModel) {
    var removed = removedModel.attributes;
    _.each(FED.gameData, function (item) {
      if (_.isEqual(item, removed)) {
        FED.gameData.splice(_.indexOf(FED.gameData, item), 1);
      }
    });
	},

	// Get types for set select box
	/*getTypes: function () {
      return _.uniq(this.collection.pluck("team1"), false, function (type) {
          return type.toLowerCase();
      });
  },*/

  getTypes: function () {
      // console.log(this.collection.pluck("team1"));
      types = [];
      _.each(this.collection.pluck("team1"), function (item) {
        types.push(item.toLowerCase());
      });

      return _.uniq(types);
  },

	// Create team1 select box
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
      this.collection.reset(FED.gameData);
    } else {
      this.collection.reset(FED.gameData, { silent: true });
      var filterType = this.filterType,
        filtered = _.filter(this.collection.models, function (item) {
        return item.get("team1").toLowerCase() === filterType;
      });
      this.collection.reset(filtered);
    }
	},

	showForm: function (e) {
		e.preventDefault();
    this.$el.find("#addSet").slideToggle();
	}
});


//create instance of master view
// FED.Game = new FED.gameView();