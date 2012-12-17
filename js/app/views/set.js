// define indvidual set view
FED.SetView = Backbone.View.extend({
  tagName: "tr",
  template: $("#setTemplate").html(),

  initialize: function (){
    // console.log("init Set view");
  },

  render: function () {
    var tmpl = _.template(this.template);
    $(this.el).html(tmpl(this.model.toJSON()));    
    return this;
  }
});
