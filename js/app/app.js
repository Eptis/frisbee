//Tournaments Web App *(Backbone example application)*
/**
 *	Tournaments Web App (Backbone example application)
 *	
 *
 */

// Anonymous self-invoked function with jQuery mapped to $
(function ($) {

    // # Pool data #
    poolData = [
    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
    ];


	// # Define team model #
	Team = Backbone.Model.extend({
		// Set model defaults *(backbone method)*
		defaults: {
			"team": "Teamnaam onbekend",
			"Win":"onbekend",
			"Lost":"onbekend",
			"Sw":"onbekend",
			"Sl":"onbekend",
			"Pw":"onbekend",
			"Pl":"onbekend"

		},
		
		// Initialize model *(backbone method)*
		initialize: function () {
			this.logMessage("Team model initialized");
		},
		
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
	});

	// # Define Pool collection #
	Pool = Backbone.Collection.extend({
	    // Specifiy model for this collection
		model: Team,
		
		// Initialize collection *(backbone method)*
		initialize: function () {
			this.logMessage("Pool collection initialized");
		},
		
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
	});
	
	// # Define team view #
	TeamView = Backbone.View.extend({
	    // Define element (this.el)  
		tagName: "tr",
		
		// Set reference to template
	    template: $("#teamTemplate").html(),
		
		// Initialize view *(backbone method)*
		initialize: function () {
			this.logMessage("Team view initialized");
		},
		
		// Render view *(backbone method)*
	    render: function () {
			// Store template in variable
	        var tmpl = _.template(this.template);
			
			// Inject the rendered template into the views element 
	        $(this.el).html(tmpl(this.model.toJSON()));
	
			return this;
	    },
	
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
	});
	
	// # Define Pool view #
	PoolView = Backbone.View.extend({
		// Define element (this.el)     
		el: $("#pool"),
		
		// Initialize view *(backbone method)*
	    initialize: function () {
			this.logMessage("Pool view initialized");
	        
			// Specify collection for this view
			this.collection = new Pool(poolData);
			
			// Render view
	        this.render();
			
	    },
		
		// Render view *(backbone method)*
	    render: function () {
	        var self = this;

	        _.each(this.collection.models, function (item) {
	            self.renderTeam(item);
	        }, this);
	    },
		
		// Render tournament *(custom method)*
	    renderTeam: function (item) {
			// Create new instance of TournamentView
			var teamView = new TeamView({
	            model: item
	        });
	
			// Append the rendered HTML to the views element
	        this.$el.append(teamView.render().el);
	    },
	
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
		
	});
	
    // Kickstart the application by creating an instance of LeagueView
    var ranking = new PoolView();

} (jQuery));