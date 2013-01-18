define([
  'jquery',
  'underscore',
  'backbone',
  'models/match'
], function($, _, Backbone, matchModel){
  var scheduleCollection = Backbone.Collection.extend({
    model: matchModel,
    initialize: function(){

    }

  });

  return new scheduleCollection;
});
