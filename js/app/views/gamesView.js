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
        FED.gameData = self.collection.toJSON();

        _.each(self.collection.models, function(model){
            model.url = model.get('resource_uri');
        });
        self.render();
        FED.showPage();
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
    "keyup .list input": "okToSend",
    "change .list input": "okToSend",
    "click .formSubmit": "updateGame"
  },

  renderGame: function (item) {
    var gameView = new FED.GameView({
        model: item
    });

    this.$el.find("#games").append(gameView.render().el);
  },


  updateGame: function(e){
        e.preventDefault();
        $("#spinner").addClass("loading")
        

        var game = $(e.currentTarget).parent(".game");

        var form = $(e.currentTarget).parent("form");
        var gameId = $(e.currentTarget).parent().parent().parent().data("element");

        form.find(".formSubmit").attr("disabled", true)

        var data = {};

        $(e.currentTarget).parent("form").find("input").each(function (i, el) {
             data[el.name] = $(el).val();
        });


        data['game_id'] = gameId;
        data['is_final'] = "False";
        data['what_happened'] = "...";
        data['set_number'] = 5;


        
        // Instantiate a new model and stored it in the variable "newModel"
        // Pass the data to the new model as a parameter
        var newModel = new FED.GameModel(data);

        // Set the API url
        newModel.url = 'https://api.leaguevine.com/v1/game_scores/';
        
        // Save a new model to the API, this is a "POST" request
        // the save function takes two parameters,
        
        newModel.save(
            // The first parameter is the data object
            newModel.toJSON(), {
                // The second parameter takes request options
                success: function(data) {
                    // On succes set the new url for the model
                    console.log("succes")
                    newModel.url = newModel.get('resource_uri');
                    $("#spinner").removeClass("loading")

                    $(e.currentTarget).parent().parent().parent().addClass("succes")
                    setTimeout(
                        function(){
                            $(e.currentTarget).parent().parent().parent().removeClass("succes")
                        },1000)
                    

                },
                error: function(data) {
                    // On error log the error in the console
                    console.log('error');
                    $("#spinner").removeClass("loading")
                    $(e.currentTarget).parent().parent().parent().addClass("error")
                    alert("We could not process your scores, please try again later")
                },
                // Define an authorization header to allow for posting to the API
                headers: {
                    Authorization: 'bearer bff958eccb'
                }
            }
        );











        
        /*var model = this.collection.get(gameId);

        var data = {
            id: gameId,
            start_time: model.get("start_time"),
            team_1_score: 5,
            team_2_score: 5,
            season_id: FED.config.season_id
        }

        model.set(data)

        // Update a model to the API, this is a "PUT" request
        // the save function takes two parameters,
        // console.log(model)
        model.url = model.get('resource_uri');

        var self = this;




        model.save(
            // The first parameter is the data object
            data, {
                // The second parameter takes request options
                success: function(data) {
                    // On succes set the new url for the model

                    $(e).find(".errorField").removeClass("errorField")
                    self.collection.reset(FED.gameData)
                    console.log('succes');
                },
                error: function(data) {
                    // On error log the error in the console
                    console.log('error');
                    $(e.currentTarget).parent().parent().parent().addClass("error")
                    alert("We could not process your scores, please try again later")
                },
                // Define an authorization header to allow for posting to the API
                headers: {
                    Authorization: FED.config.header_access
                }
            }
        );*/
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

    updateCollection: function(){
         var self = this;
    this.$el.html("");

    FED.hidePage();

    self.$el.html(self.template);
    // haal collectie op
    this.collection = new FED.Games();
    this.collection.fetch({
      success: function(data) {
        // console.log(data);
        FED.gameData = self.collection.toJSON();

        _.each(self.collection.models, function(model){
            model.url = model.get('resource_uri');
        });
        self.render();
        FED.showPage();
        self.$el.find("#filter").append(self.createSelect());
      },
            error: function(){
                    alert("Could not retreive data, please try again later")
            }
    });
    },

    okToSend: function(e){
        var count = 0;

        $(e.currentTarget).parent("form").find("input").each(function (i, el) {
                var val = $(el).val();
              if(val !== "" && val <= 5 && val >= 0 && val.length == 1){
                count ++;
              }
        });

        var length = $(e.currentTarget).parent("form").find("input").length;

        if(count == length){
            $(e.currentTarget).siblings(".formSubmit").attr("disabled", false)
        }else{
            $(e.currentTarget).siblings(".formSubmit").attr("disabled", true)
        }
    }

});