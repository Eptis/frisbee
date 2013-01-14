// define sets view
FED.gameView = Backbone.View.extend({
  el: $("#game"),

  initialize: function () {
		this.list = this.$el.find("ul.sets");
    this.collection = new FED.Game(FED.gameData);

		this.render();	
		
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
		this.$el.find("ul.sets").html("");

		_.each(this.collection.models, function (item) {
	  	this.rendergame(item);
	  }, this);
    // this.renderFilter(FED.gameData);

  },

  rendergame: function (item) {
    var SetView = new FED.setView({
      model: item
    });

    this.list.append(SetView.render().el);
  },

/*renderResult: function (data) {
    // var ResultView = new FED.resultView();
    // console.log("ul.game .html renderResult");
    // $("ul.game").html(ResultView.render(data));

    
  },
  renderFilter: function (data) {
    console.log(this.collection);
  },*/
	
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
      
      this.collection.add(new FED.Set(newModel));
      // !!! reset moet tussen de add en de createSelect anders werkt het niet
      this.collection.reset(FED.gameData);
      this.$el.find("#filter").find("select").remove().end().append(this.createSelect());

    } else {
      this.collection.add(new FED.Set(newModel));
      // !!! hier voor de zekerheid ook maar neergezet
      this.collection.reset(FED.gameData);
    }
	},
	
	// Remove Set model
	removeSet: function (removedModel) {
    // FED.gameData = this.collection.toJSON();
    var removed = removedModel.attributes;
    console.log(removed);
    _.each(FED.gameData, function (item) {
      if (_.isEqual(item, removed)) {
        FED.gameData.splice(_.indexOf(FED.gameData, item), 1);
      }
    });
    // !!! na het verwijderen de collectie resetten en weer opnieuw renderen
    this.collection.reset(FED.gameData);
    this.render();
	},

  // get types
	getTypes: function () {
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
FED.Game = new FED.gameView();