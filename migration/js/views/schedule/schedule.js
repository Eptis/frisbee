/* Filename: js/views/schedule/schedule.js */

(function () {
  "use strict";
  define([
    'jquery',
    'underscore',
    'backbone',
    'models/match',
    'text!templates/schedule/schedule.html'
  ], function ($, _, Backbone, MatchModel, scheduleTemplate) {
    var ScheduleView = Backbone.View.extend({
      el: $("#page"),
      initialize: function () {
        this.model.bind('change', this.render, this);
      },
      render: function () {
        var data = {
          match: this.model,
          _: _
        };
        var compiledTemplate = _.template(scheduleTemplate, data);
        this.el.html(compiledTemplate);
      }
    });
    return ScheduleView;
  });
}());