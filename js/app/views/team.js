// # Define team view #
  FED.TeamView = Backbone.View.extend({
      // Define element (this.el)  
    tagName: "tr",
    
    // Set reference to template
      template: $("#teamTemplate").html(),
    
    // Initialize view *(backbone method)*
    initialize: function () {
      console.log("team view init");
    },
    
    // Render view *(backbone method)*
      render: function () {
      // Store template in variable
          var tmpl = _.template(this.template);
      
      // Inject the rendered template into the views element 
          $(this.el).html(tmpl(this.model.toJSON()));
  
      return this;
      }    
  });